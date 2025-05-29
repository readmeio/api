import type { InstallerOptions } from '../../factory.js';
import type { ExecaReturnValue } from 'execa';
import type Oas from 'oas';
import type { Operation } from 'oas/operation';
import type { HttpMethods, SchemaObject } from 'oas/types';
import type { OpenAPIV3_1 } from 'openapi-types';
import type { SemVer } from 'semver';
import type {
  ClassDeclaration,
  Directory,
  JSDocStructure,
  JSDocTagStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  SourceFile,
} from 'ts-morph';
import type { Options } from 'tsup';
import type { JsonObject, PackageJson, TsConfigJson } from 'type-fest';

import path from 'node:path';

import corePkg from '@readme/api-core/package.json' with { type: 'json' };
import { execa } from 'execa';
import { getLicense } from 'license';
import { setWith } from 'lodash-es';
import preferredPM from 'preferred-pm';
import semver from 'semver';
import { IndentationText, Project, QuoteKind, ScriptTarget, VariableDeclarationKind } from 'ts-morph';

import { buildCodeSnippetForOperation, getSuggestedOperation } from '../../../lib/suggestedOperations.js';
import logger from '@readme/api-core/logger';
import { PACKAGE_VERSION } from '../../../packageInfo.js';
import Storage from '../../../storage.js';
import CodeGenerator from '../../codegenerator.js';

import { docblockEscape, generateTypeName, wordWrap } from './util.js';

interface OperationTypeHousing {
  operation: Operation;
  types: {
    params?: Record<'body' | 'formData' | 'metadata', string> | false;
    responses?: Record<
      number | string,
      {
        description?: string;
        type: string;
      }
    >;
  };
}

/**
 * This is the conversion prefix that we add to all `$ref` pointers we find in generated JSON
 * Schema.
 *
 * Because the pointer name is a string we want to have it reference the schema constant we're
 * adding into the codegen'd schema file. As there's no way, not even using `eval()` in this case,
 * to convert a string to a constant we're prefixing them with this so we can later remove it and
 * rewrite the value to a literal. eg. `'Pet'` becomes `Pet`.
 *
 * And because our TypeScript type name generator properly ignores `:`, this is safe to prepend to
 * all generated type names.
 */
const REF_PLACEHOLDER = '::convert::';
const REF_PLACEHOLDER_REGEX = /"::convert::([a-zA-Z_$\\d]*)"/g;

function handleExecSuccess(res: ExecaReturnValue<string>, opts: InstallerOptions = {}) {
  if (opts.dryRun) {
    (opts.logger ? opts.logger : logger)(res.command);
    (opts.logger ? opts.logger : logger)(res.stdout);
  }
}

function handleExecFailure(err: Error, opts: InstallerOptions = {}) {
  if (opts.dryRun) {
    (opts.logger ? opts.logger : logger)(err.message);
    return;
  }

  throw err;
}

async function detectPackageManager(installDir: string) {
  const pm = await preferredPM(installDir);
  if (pm) {
    return pm.name;
  }
  // Default to npm if no preferred package manager is detected
  return 'npm';
}

export default class TSGenerator extends CodeGenerator {
  project: Project;

  types: Map<string, string>;

  sdk!: ClassDeclaration;

  schemas: Record<
    string,
    // Operation-level type
    // eslint-disable-next-line @typescript-eslint/sort-type-constituents
    | {
        body?: unknown;
        metadata?: unknown;
        response?: Record<string, unknown>;
      }
    // Wholesale collection of `$ref` pointer types
    | Record<string, unknown>
  >;

  usesHTTPMethodRangeInterface = false;

  constructor(spec: Oas, specPath: string, identifier: string) {
    super(spec, specPath, identifier);

    this.requiredPackages = {
      '@readme/api-core': {
        dependencyType: 'production',
        reason: "The core magic of your codegen'd SDK and is what is used for making requests.",
        url: 'https://npm.im/api',
        version:
          // When running unit tests we're installing `@readme/api-core` but because that package
          // source lives in this repository NPM will throw a gnarly "Cannot set properties of null
          // (setting 'dev')" workspace error message because we're creating a funky circular
          // dependency.
          process.env.NODE_ENV === 'test'
            ? // eslint-disable-next-line unicorn/prefer-module
              `file:${path.relative(__dirname, path.dirname(require.resolve('@readme/api-core/package.json')))}`
            : `^${corePkg.version}`,
      },
      tsup: {
        dependencyType: 'development',
        reason: "Used for compiling your codegen'd SDK into code that can be used in JS environments.",
        url: 'https://tsup.egoist.dev/',
        version: '^8.4.0',
      },
      typescript: {
        dependencyType: 'development',
        reason: 'Required for `tsup`.',
        version: '^5.8.2',
      },
    };

    this.project = new Project({
      compilerOptions: {
        outDir: 'dist',
        resolveJsonModule: true,
        target: ScriptTarget.ES2022,
      },
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
        quoteKind: QuoteKind.Single,
      },
      useInMemoryFileSystem: true,
    });

    this.types = new Map();
    this.schemas = {};
  }

  // eslint-disable-next-line class-methods-use-this
  async install(storage: Storage, opts: InstallerOptions = {}): Promise<void> {
    const installDir = storage.getIdentifierStorageDir();
    const packageManager = await detectPackageManager(installDir);

    const installCommand = ['install', '--save', opts.dryRun ? '--dry-run' : ''].filter(Boolean);

    // This will install the installed SDK as a dependency within the current working directory,
    // adding `@api/<sdk identifier>` as a dependency there so you can load it with
    // `require('@api/<sdk identifier>)`.
    return execa(packageManager, [...installCommand, installDir].filter(Boolean))
      .then(res => handleExecSuccess(res, opts))
      .catch(err => {
        // If `npm install` throws this error it always happens **after** our dependencies have been
        // installed and is an annoying quirk that sometimes occurs when installing a package within
        // our workspace as we're creating a circular dependency on `@readme/api-core`.
        if (
          process.env.NODE_ENV === 'test' &&
          err.message.includes("npm ERR! Cannot set properties of null (setting 'dev')")
        ) {
          (opts.logger ? opts.logger : logger)("npm threw an error but we're ignoring it");
          return;
        }

        handleExecFailure(err, opts);
      });
  }

  static async uninstall(storage: Storage, opts: InstallerOptions = {}): Promise<void> {
    const pkgName = storage.getPackageName() as string;
    const installDir = storage.getIdentifierStorageDir();
    const packageManager = await detectPackageManager(installDir);

    const args = ['uninstall', pkgName, opts.dryRun ? '--dry-run' : ''].filter(Boolean);
    return execa(packageManager, args)
      .then(res => handleExecSuccess(res, opts))
      .catch(err => handleExecFailure(err, opts));
  }

  /**
   * Compile the TS code we generated into JS for use in CJS and ESM environments.
   *
   */
  // eslint-disable-next-line class-methods-use-this
  async compile(storage: Storage, opts: InstallerOptions = {}): Promise<void> {
    const installDir = storage.getIdentifierStorageDir();

    await execa('npm', ['pkg', 'set', 'scripts.prepare=tsup'], { cwd: installDir })
      .then(res => handleExecSuccess(res, opts))
      .catch(err => handleExecFailure(err, opts));

    await execa('npm', ['run', 'prepare'], {
      cwd: installDir,
    })
      .then(res => handleExecSuccess(res, opts))
      .catch(err => handleExecFailure(err, opts));
  }

  /**
   * Generate the current OpenAPI definition into a TypeScript library.
   *
   */
  async generate() {
    const srcDirectory = this.project.createDirectory('src');
    const sdkSource = this.createSDKSource(srcDirectory);
    this.createIndexSource(srcDirectory);

    this.createGitIgnore();
    this.createPackageJSON();
    this.createTSConfig();
    await this.createREADME();

    if (Object.keys(this.schemas).length) {
      this.createSchemasFile(srcDirectory);
      this.createTypesFile(srcDirectory);
    } else {
      // If we don't have any schemas then we shouldn't import a `types` file that doesn't exist.
      sdkSource
        .getImportDeclarations()
        .find(id => id.getText() === "import type * as types from './types.js';")
        ?.remove();
    }

    // If this SDK doesn't use the `HTTPMethodRange` interface for handling `2XX` response status
    // codes then we should remove it from being imported.
    if (!this.usesHTTPMethodRangeInterface) {
      sdkSource
        .getImportDeclarations()
        .find(id => id.getText().includes('HTTPMethodRange'))
        ?.replaceWithText("import type { ConfigOptions, FetchResponse } from '@readme/api-core/types';");
    }

    return [
      ...this.project.getSourceFiles().map(sourceFile => {
        // `getFilePath` will always return a string that contains a preceeding directory separator
        // however when we're creating these codegen'd files that may cause us to create that file
        // in the root directory (because it's preceeded by a `/`). We don't want that to happen so
        // we're slicing off that first character.
        let filePath = sourceFile.getFilePath().toString();
        filePath = filePath.substring(1);

        /**
         * It's not Prettier-level of nice but `ts-morph` offers a method of using the TS
         * formatter for formatting code which we can use to make our generated SDK not look like
         * total garbage.
         *
         * @see {@link https://ts-morph.com/manipulation/formatting}
         */
        if (filePath.endsWith('.ts')) sourceFile.formatText();

        return {
          [filePath]: sourceFile.getFullText(),
        };
      }),
    ].reduce((prev, next) => Object.assign(prev, next));
  }

  async getExampleCodeSnippet() {
    // if we've already built the code snippet, return it instead of re-building it!
    if (typeof this.exampleCodeSnippet !== 'undefined') {
      return this.exampleCodeSnippet;
    }

    const operation = getSuggestedOperation(this.spec);
    if (!operation) {
      this.exampleCodeSnippet = false;
      return false;
    }

    const snippet = await buildCodeSnippetForOperation(this.spec, operation, { identifier: this.identifier });
    this.exampleCodeSnippet = snippet;
    return snippet;
  }

  /**
   * Create our main `index.ts` file that will be the entrypoint for our SDK.
   * This file will be used to export the SDK and any types that are generated.
   *
   */
  private createIndexSource(sourceDirectory: Directory) {
    const sourceFile = sourceDirectory.createSourceFile('index.ts', '');

    sourceFile.addImportDeclaration({
      defaultImport: 'SDK',
      moduleSpecifier: './sdk.js',
    });

    this.createSDKExport(sourceFile);

    return sourceFile;
  }

  /**
   * Create our main SDK source file.
   *
   */
  private createSDKSource(sourceDirectory: Directory) {
    const { operations } = this.loadOperationsAndMethods();

    const sourceFile = sourceDirectory.createSourceFile('sdk.ts', '');

    sourceFile.addImportDeclarations([
      // This import will be automatically removed later if the SDK ends up not having any types.
      { defaultImport: 'type * as types', moduleSpecifier: './types.js' },
      {
        // `HTTPMethodRange` will be conditionally removed later if it ends up not being used.
        defaultImport: 'type { ConfigOptions, FetchResponse, HTTPMethodRange }',
        moduleSpecifier: '@readme/api-core/types',
      },
      { defaultImport: 'APICore', moduleSpecifier: '@readme/api-core' },
      { defaultImport: 'definition', moduleSpecifier: this.specPath, attributes: [{ name: 'type', value: 'json' }] },
    ]);

    this.sdk = sourceFile.addClass({
      name: 'SDK',
      properties: [{ name: 'core', type: 'APICore' }],
      isDefaultExport: true,
      isExported: true,
    });

    this.sdk.addConstructor({
      statements: writer => {
        writer.write('this.core = new APICore(definition, ').quote(this.userAgent).write(');');
        return writer;
      },
    });

    // Add our core API methods for controlling auth, servers, and various configurable abilities.
    this.sdk.addMethods([
      {
        name: 'config',
        parameters: [{ name: 'config', type: 'ConfigOptions' }],
        statements: writer => writer.writeLine('this.core.setConfig(config);'),
        docs: [
          {
            description: writer =>
              writer.writeLine(wordWrap('Optionally configure various options that the SDK allows.')),
            tags: [
              { tagName: 'param', text: 'config Object of supported SDK options and toggles.' },
              {
                tagName: 'param',
                text: wordWrap(
                  'config.timeout Override the default `fetch` request timeout of 30 seconds. This number should be represented in milliseconds.',
                ),
              },
            ],
          },
        ],
      },
      {
        name: 'auth',
        parameters: [{ name: '...values', type: 'string[] | number[]' }],
        statements: writer => {
          writer.writeLine('this.core.setAuth(...values);');
          writer.writeLine('return this;');
          return writer;
        },
        docs: [
          {
            description: writer =>
              writer.writeLine(
                wordWrap(`If the API you're using requires authentication you can supply the required credentials through this method and the library will magically determine how they should be used within your API request.

With the exception of OpenID and MutualTLS, it supports all forms of authentication supported by the OpenAPI specification.

@example <caption>HTTP Basic auth</caption>
sdk.auth('username', 'password');

@example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
sdk.auth('myBearerToken');

@example <caption>API Keys</caption>
sdk.auth('myApiKey');`),
              ),
            tags: [
              { tagName: 'see', text: '{@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}' },
              { tagName: 'see', text: '{@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}' },
              {
                tagName: 'param',
                text: 'values Your auth credentials for the API; can specify up to two strings or numbers.',
              },
            ],
          },
        ],
      },
      {
        name: 'server',
        parameters: [
          { name: 'url', type: 'string' },
          { name: 'variables', initializer: '{}' },
        ],
        statements: writer => writer.writeLine('this.core.setServer(url, variables);'),
        docs: [
          {
            description: writer =>
              writer.writeLine(
                wordWrap(`If the API you're using offers alternate server URLs, and server variables, you can tell the SDK which one to use with this method. To use it you can supply either one of the server URLs that are contained within the OpenAPI definition (along with any server variables), or you can pass it a fully qualified URL to use (that may or may not exist within the OpenAPI definition).

@example <caption>Server URL with server variables</caption>
sdk.server('https://{region}.api.example.com/{basePath}', {
  name: 'eu',
  basePath: 'v14',
});

@example <caption>Fully qualified server URL</caption>
sdk.server('https://eu.api.example.com/v14');`),
              ),
            tags: [
              { tagName: 'param', text: 'url Server URL' },
              { tagName: 'param', text: 'variables An object of variables to replace into the server URL.' },
            ],
          },
        ],
      },
      {
        name: 'debug',
        parameters: [],
        returnType: 'SDK',
        statements: writer => {
          writer.writeLine('this.core.setDebugMode(true);');
          writer.writeLine('const self = this;');
          writer.writeLine('return new Proxy(this, {');
          writer.writeLine('get(target: SDK, prop: keyof SDK) {');
          writer.writeLine('if (typeof target[prop] === "function" && prop !== \'debug\') {');
          writer.writeLine('return async(...args: unknown[]) => {');
          writer.writeLine('try {');
          writer.writeLine('return await (target[prop] as Function).apply(target, args);');
          writer.writeLine('} catch (err) {');
          writer.writeLine('throw err;');
          writer.writeLine('} finally {');
          writer.writeLine('self.core.setDebugMode(false);');
          writer.writeLine('}');
          writer.writeLine('}');
          writer.writeLine('}');
          writer.writeLine('return Reflect.get(target, prop);');
          writer.writeLine('},');
          writer.writeLine('});');
          return writer;
        },
        docs: [
          {
            description: writer =>
                writer.writeLine(wordWrap(`Enables debug mode for SDK operations. Debug mode captures additional internal information such as request/response payloads and timing, which may assist in troubleshooting issues during development.

This method can be used in two modes:

- **Global mode**: Calls \`sdk.debug();\` and enables debug logging for all subsequent operations.
- **Chained mode**: Calls \`sdk.debug().operation();\` and enables debug logging only for the single operation invoked. Debug mode is automatically turned off afterward.

@example <caption>Global debug mode</caption>
sdk.debug();
sdk.getPets();

@example <caption>Chained debug mode (single operation)</caption>
sdk.debug().getPets();`)),
          },
        ],
      }
    ]);

    // Add all available operation ID accessors into the SDK.
    Object.entries(operations).forEach(([operationId, data]: [string, OperationTypeHousing]) => {
      this.createOperationAccessor(data.operation, operationId, data.types.params, data.types.responses);
    });

    return sourceFile;
  }

  /**
   * Create an IIFE export of our SDK in the SDK source file so users can do
   * `import sdk from '<package>'` and have a ready-to-go instance of their SDK -- eliminating them
   * having to create an instance with `new SDK()`.
   *
   * This will also fill our a JSDoc heading on the IIFE we're creating based on various pieces of
   * data that may be present in the OpenAPI definition `info` object.
   *
   * Additionally if a license in `info.license` is recognized by the SPDX we'll also create a
   * `LICENSE` file in for their generated SDK. We're only supporting SPDX-recognized licenses for
   * this because we otherwise have no idea what the license represents and we should be extremely
   * cautious around assuming intent with software licensing.
   *
   * @see {@link https://spdx.org/licenses/}
   */
  createSDKExport(sourceFile: SourceFile) {
    let docblock: OptionalKind<JSDocStructure> = {};

    // The OpenAPI 3.1 `info` object added some properties that aren't available in 3.0 but 3.1
    // still contains everything that was available in 3.0 so to allow us to not have to do gross
    // `as OpenAPIV3_1.InfoObject` typing everywhere we're just assuming that we have 3.1 object
    // here.
    const infoObject = this.spec.api.info as OpenAPIV3_1.InfoObject;
    if (infoObject?.title || infoObject?.description) {
      docblock.description = writer => {
        if (infoObject.title) {
          writer.writeLine(docblockEscape(wordWrap(infoObject.title)));
        }

        if (infoObject.description) {
          writer.conditionalNewLine(!!infoObject.title);
          writer.writeLine(docblockEscape(wordWrap(infoObject.description)));
        }

        writer.newLineIfLastNot();
        return writer;
      };
    }

    if (this.apiContact.name) {
      docblock = TSGenerator.#addTagToDocblock(docblock, {
        tagName: 'author',
        text: this.apiContact.name,
      });
    }

    if (this.apiContact.url) {
      docblock = TSGenerator.#addTagToDocblock(docblock, {
        tagName: 'see',
        text: `{@link ${this.apiContact.url}}`,
      });
    }

    if (infoObject?.termsOfService) {
      docblock = TSGenerator.#addTagToDocblock(docblock, {
        tagName: 'see',
        text: `{@link ${infoObject.termsOfService} Terms of Service}`,
      });
    }

    if (this.spdxLicense) {
      docblock = TSGenerator.#addTagToDocblock(docblock, {
        tagName: 'license',
        text: this.spdxLicense,
      });

      // Some licenses like `Apache-2.0` have the year as `[yyyy]` but the `license` package only
      // supports templating on `<templatekey>` so we need to fix this ourselves.
      // https://github.com/Ovyerus/license/issues/12
      const year = new Date().getFullYear().toString();
      const license = getLicense(this.spdxLicense, {
        year,
        // `license` doesn't support empty strings so we need to fake it here
        author: this.apiContact.name ?? ' ',
      })
        .replace(/<yyyy>/g, year)
        .replace(/\[yyyy\]/g, year);

      this.project.createSourceFile('LICENSE', license);
    } else if (infoObject?.license) {
      // If they have a license but it's not recognized by the SPDX we should still surface it.
      if (infoObject?.license?.name) {
        docblock = TSGenerator.#addTagToDocblock(docblock, {
          tagName: 'license',
          text: infoObject.license.name,
        });
      }

      if (infoObject.license?.url) {
        docblock = TSGenerator.#addTagToDocblock(docblock, {
          tagName: 'see',
          text: `{@link ${infoObject.license.url}}`,
        });
      }
    }

    sourceFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      docs: Object.keys(docblock).length ? [docblock] : [],
      declarations: [
        {
          name: 'createSDK',
          initializer: writer => {
            // `ts-morph` doesn't have any way to cleanly create an IIFE.
            writer.write('(() => { return new SDK(); })()');
            return writer;
          },
        },
      ],
    });

    sourceFile.addExportAssignment({
      // Because we're exporting `createSDK` as an IIFE constant we need to have it exported as
      // `export default createSDK`. `addExportAssignment` by default wants it exported as
      // `export = createSDK`, which will throw TS errors because we may also be exporting types in
      // the `./types.ts` file.
      isExportEquals: false,
      expression: 'createSDK',
    });

    return sourceFile;
  }

  /**
   * Creates a `.gitignore` file to prevent the `dist/` directory from being tracked.
   *
   */
  createGitIgnore() {
    const file = `# This file prevents the \`dist/\` directory from being tracked via git.
# This is recommended since the \`prepare\` npm script automatically
# regenerates the contents of the \`dist/\` directory as needed.
dist/
`;

    const sourceFile = this.project.createSourceFile('.gitignore', file);

    return sourceFile;
  }

  /**
   * Create the `tsconfig.json` file that will allow this SDK to be compiled for use.
   *
   */
  createTSConfig() {
    const sourceFile = this.project.createSourceFile('tsconfig.json', '');

    const config: TsConfigJson = {
      compilerOptions: {
        esModuleInterop: true,
        module: 'ESNext',
        moduleResolution: 'Bundler',
        resolveJsonModule: true,
        strict: true,
      },
      include: ['./src/**/*'],
    };

    sourceFile.addStatements(JSON.stringify(config, null, 2));

    return sourceFile;
  }

  /**
   * Create the `package.json` file that will ultimately make this SDK available to use.
   *
   */
  createPackageJSON() {
    const sourceFile = this.project.createSourceFile('package.json', '');

    const hasTypes = !!Object.keys(this.schemas).length;

    const info = this.spec.getDefinition().info;
    let pkgVersion = semver.coerce(info.version);
    if (!pkgVersion) {
      // If the version that's in `info.version` isn't compatible with semver NPM won't be able to
      // handle it properly so we need to fallback to something it can.
      pkgVersion = semver.coerce('0.0.0') as SemVer;
    }

    const tsupOptions: Options = {
      cjsInterop: true,
      clean: true,
      dts: true,
      entry: [
        './src/index.ts',
        './src/sdk.ts',
        // If this SDK has schemas and generated types then we should also export those too so
        // they're available to use.
        hasTypes ? './src/types.ts' : '',
      ].filter(Boolean),
      format: ['esm', 'cjs'],
      minify: false,
      shims: true,
      sourcemap: true,
      splitting: true,
    };

    const dependencies = Object.entries(this.requiredPackages)
      .map(([dep, { dependencyType, version }]) => (dependencyType === 'production' ? { [dep]: version } : {}))
      .reduce((prev, next) => Object.assign(prev, next));

    const devDependencies = Object.entries(this.requiredPackages)
      .map(([dep, { dependencyType, version }]) => (dependencyType === 'development' ? { [dep]: version } : {}))
      .reduce((prev, next) => Object.assign(prev, next));

    const pkg: PackageJson = {
      name: `@api/${this.identifier}`,
      version: pkgVersion.version,
      type: 'module',
      main: 'dist/index.cjs',
      types: 'dist/index.d.cts',
      module: 'dist/index.ts',
      exports: {
        '.': {
          import: './dist/index.js',
          require: './dist/index.cjs',
        },
        './sdk': {
          import: './dist/sdk.js',
          require: './dist/sdk.cjs',
        },
        ...(hasTypes
          ? {
              './types': {
                import: './dist/types.js',
                require: './dist/types.cjs',
              },
            }
          : {}),
        './package.json': './package.json',
      },
      license: this.spdxLicense ?? '',
      files: ['dist', 'openapi.json'],
      scripts: {
        lint: 'tsc --noEmit',
      },
      dependencies,
      devDependencies,
      tsup: tsupOptions as JsonObject,
    };

    if (!this.spdxLicense) {
      delete pkg.license;
    }

    sourceFile.addStatements(JSON.stringify(pkg, null, 2));

    return sourceFile;
  }

  /**
   * Create a placeholder `README.md` file in the repository, with information on how to use/administer the SDK.
   *
   */
  async createREADME() {
    let createdAt = new Date().toISOString();
    const currentAPI = Storage.getLockfile().apis.find(api => api.identifier === this.identifier);
    if (currentAPI) createdAt = currentAPI.createdAt;

    let exampleUsage = 'Add SDK setup information and usage examples here so your users get started in a jiffy! 🚀';
    const exampleSnippet = await this.getExampleCodeSnippet();
    if (exampleSnippet) {
      exampleUsage = `
## Example Usage 🚀

\`\`\`js
${exampleSnippet}
\`\`\`
`.trim();
    }

    const file = `# \`@api/${this.identifier}\`

This SDK was autogenerated by the [\`api\` SDK generator](https://api.readme.dev), powered by [ReadMe](https://readme.com) 🦉

${exampleUsage}

<!---

Here's some additional info about the generated SDK:

\`api\` version: ${PACKAGE_VERSION}
Generated at ${createdAt}

--->
`;

    const sourceFile = this.project.createSourceFile('README.md', file);

    return sourceFile;
  }

  /**
   * Create our main schemas file. This is where all of the JSON Schema that our TypeScript typing
   * infrastructure sources its data from. Without this there are no types.
   *
   */
  private createSchemasFile(sourceDirectory: Directory) {
    const sourceFile = sourceDirectory.createSourceFile('schemas.ts', '');
    const schemasDir = sourceDirectory.createDirectory('schemas');

    const sortedSchemas = new Map(Array.from(Object.entries(this.schemas)).sort());

    Array.from(sortedSchemas).forEach(([schemaName, schema]) => {
      const schemaFile = schemasDir.createSourceFile(`${schemaName}.ts`);

      // Because we're chunking our schemas into a `schemas/` directory we need to add imports
      // for these schemas into our main `schemas.ts` file.`
      sourceFile.addImportDeclaration({
        defaultImport: schemaName,
        moduleSpecifier: `./schemas/${schemaName}.js`,
      });

      // Though we aren't using Prettier to make these generated SDKs look amazing we should at
      // least make the schema files we generate not look like completely unreadable garbage.
      let str = JSON.stringify(schema, null, 2);
      let referencedSchemas = str.match(REF_PLACEHOLDER_REGEX)?.map(s => s.replace(REF_PLACEHOLDER_REGEX, '$1'));
      if (referencedSchemas) {
        referencedSchemas.sort();

        // Remove any duplicates so we don't add the same import multiple times into this schema
        // file.
        referencedSchemas = Array.from(new Set(referencedSchemas));

        referencedSchemas.forEach(ref => {
          // Because this schema is referenced from another file we need to create an `import`
          // declaration for it.
          schemaFile.addImportDeclaration({
            defaultImport: ref,
            moduleSpecifier: `./${ref}.js`,
          });
        });
      }

      // Load the schema into the schema file within the `schemas/` directory.
      schemaFile.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: schemaName,
            initializer: writer => {
              // We can't have `::convert::<schemaName>` variables within these schema files so we
              // need to clean them up.
              str = str.replace(REF_PLACEHOLDER_REGEX, '$1');

              writer.write(`${str} as const`);
              return writer;
            },
          },
        ],
      });

      schemaFile.addStatements(`export default ${schemaName}`);
    });

    // Export all of our schemas from inside the main `schemas.ts` file.
    sourceFile.addStatements(`export { ${Array.from(sortedSchemas.keys()).join(', ')} }`);

    return sourceFile;
  }

  /**
   * Create our main types file. This sources its data from the JSON Schema `schemas.ts` file and
   * will re-export types to be used in TypeScript implementations and IDE intellisense. This
   * typing work is functional with the `json-schema-to-ts` library.
   *
   * @see {@link https://npm.im/json-schema-to-ts}
   */
  private createTypesFile(sourceDirectory: Directory) {
    const sourceFile = sourceDirectory.createSourceFile('types.ts', '');

    sourceFile.addImportDeclarations([
      { defaultImport: 'type { FromSchema }', moduleSpecifier: '@readme/api-core/types' },
      { defaultImport: 'type * as schemas', moduleSpecifier: './schemas.js' },
    ]);

    Array.from(new Map(Array.from(this.types.entries()).sort())).forEach(([typeName, typeExpression]) => {
      sourceFile.addTypeAlias({ isExported: true, name: typeName, type: typeExpression });
    });

    return sourceFile;
  }

  /**
   * Create operation accessors on the SDK.
   *
   */
  private createOperationAccessor(
    operation: Operation,
    operationId: string,
    paramTypes?: OperationTypeHousing['types']['params'],
    responseTypes?: OperationTypeHousing['types']['responses'],
  ) {
    let docblock: OptionalKind<JSDocStructure> = {};
    const summary = operation.getSummary();
    const description = operation.getDescription();
    if (summary || description) {
      // To keep our generated docblocks clean we should only add the `@summary` tag if we've
      // got both a summary and a description present on the operation, otherwise we can alternate
      // what we surface the main docblock description.
      docblock.description = writer => {
        if (description) {
          writer.writeLine(docblockEscape(wordWrap(description)));
        } else if (summary) {
          writer.writeLine(docblockEscape(wordWrap(summary)));
        }

        writer.newLineIfLastNot();
        return writer;
      };

      if (summary && description) {
        docblock = TSGenerator.#addTagToDocblock(docblock, {
          tagName: 'summary',
          text: docblockEscape(wordWrap(summary)),
        });
      }
    }

    let hasOptionalBody = false;
    let hasOptionalMetadata = false;
    const parameters = {} as {
      body: OptionalKind<ParameterDeclarationStructure>;
      metadata: OptionalKind<ParameterDeclarationStructure>;
    };

    if (paramTypes) {
      // If an operation has a request body payload it will only ever have `body` or `formData`,
      // never both, as these are determined upon the media type that's in use.
      if (paramTypes.body || paramTypes.formData) {
        hasOptionalBody = !operation.hasRequiredRequestBody();

        parameters.body = {
          name: 'body',
          type: paramTypes.body ? paramTypes.body : paramTypes.formData,
          hasQuestionToken: hasOptionalBody,
        };
      }

      if (paramTypes.metadata) {
        hasOptionalMetadata = !operation.hasRequiredParameters();

        parameters.metadata = {
          name: 'metadata',
          type: paramTypes.metadata,
          hasQuestionToken: hasOptionalMetadata,
        };
      }
    }

    let returnType = 'Promise<FetchResponse<number, unknown>>';
    if (responseTypes) {
      const returnTypes = Object.entries(responseTypes)
        .map(([status, { description: responseDescription, type: responseType }]) => {
          if (status.toLowerCase() === 'default') {
            return `FetchResponse<number, ${responseType}>`;
          } else if (status.length === 3 && status.toUpperCase().endsWith('XX')) {
            const statusPrefix = status.slice(0, 1);
            if (!Number.isInteger(Number(statusPrefix))) {
              // If this matches the `_XX` format, but it isn't `{number}XX` then we can't handle
              // it and should instead fall back to treating it as an unknown number.
              return `FetchResponse<number, ${responseType}>`;
            }

            if (Number(statusPrefix) >= 4) {
              docblock = TSGenerator.#addTagToDocblock(docblock, {
                tagName: 'throws',
                text: `FetchError<${status}, ${responseType}>${
                  responseDescription ? docblockEscape(wordWrap(` ${responseDescription}`)) : ''
                }`,
              });

              return false;
            }

            this.usesHTTPMethodRangeInterface = true;
            return `FetchResponse<HTTPMethodRange<${statusPrefix}00, ${statusPrefix}99>, ${responseType}>`;
          }

          // 400 and 500 status code families are thrown as exceptions so adding them as a possible
          // return type isn't valid.
          if (Number(status) >= 400) {
            docblock = TSGenerator.#addTagToDocblock(docblock, {
              tagName: 'throws',
              text: `FetchError<${status}, ${responseType}>${
                responseDescription ? docblockEscape(wordWrap(` ${responseDescription}`)) : ''
              }`,
            });

            return false;
          }

          return `FetchResponse<${status}, ${responseType}>`;
        })
        .filter(Boolean)
        .join(' | ');

      // If all of our documented responses are for error status codes then all we can document for
      // anything else that might happen is `unknown`.
      returnType = `Promise<${returnTypes.length ? returnTypes : 'FetchResponse<number, unknown>'}>`;
    }

    const shouldAddAltTypedOverloads = Object.keys(parameters).length === 2 && hasOptionalBody && !hasOptionalMetadata;
    const operationIdAccessor = this.sdk.addMethod({
      name: operationId,
      returnType,

      // If we're going to be creating typed method overloads for optional body an metadata handling
      // we should only add a docblock to the first overload we create because IDE Intellisense will
      // always use that and adding a docblock to all three will bloat the SDK with unused and
      // unsurfaced method documentation.
      docs: shouldAddAltTypedOverloads ? undefined : Object.keys(docblock).length ? [docblock] : undefined,
      statements: writer => {
        /**
         * @example return this.core.fetch('/pet/findByStatus', 'get', body, metadata);
         * @example return this.core.fetch('/pet/findByStatus', 'get', metadata);
         */
        const fetchStmt = writer
          .write('return this.core.fetch(')
          .quote(operation.path)
          .write(', ')
          .quote(operation.method);

        const totalParams = Object.keys(parameters).length;
        if (totalParams) {
          Object.values(parameters).forEach((arg, i) => {
            if (i === 0) {
              fetchStmt.write(', ');
            }

            fetchStmt.write(arg.name);
            if (i !== totalParams - 1) {
              fetchStmt.write(', ');
            }
          });
        }

        fetchStmt.write(');');
        return fetchStmt;
      },
    });

    // If we have both body and metadata parameters but only body is optional we need to create
    // a couple function overloads as Typescript doesn't let us have an optional method parameter
    // come before one that's required.
    if (shouldAddAltTypedOverloads) {
      // Create an overload that has both `body` and `metadata` parameters as required.
      operationIdAccessor.addOverload({
        parameters: [
          { ...parameters.body, hasQuestionToken: false },
          { ...parameters.metadata, hasQuestionToken: false },
        ],
        returnType,
        docs: Object.keys(docblock).length ? [docblock] : undefined,
      });

      // Create an overload that just has a single `metadata` parameter.
      operationIdAccessor.addOverload({
        parameters: [{ ...parameters.metadata }],
        returnType,
      });

      // Create an overload that has both `body` and `metadata` parameters as optional. Even though
      // our `metadata` parameter is actually required for this operation this is the only way we're
      // able to have an optional `body` parameter be present before `metadata`.
      //
      // Thankfully our core fetch work in `@readme/api-core` is able to do the proper determination to
      // see if what the user is supplying is `metadata` or `body` content when they supply one or
      // both.
      operationIdAccessor.addParameters([
        {
          ...parameters.body,
          // Overloads have to be the most distilled version of the method so that's why we need to
          // type `body` as either `body` or `metadata`. If we didn't do this, if `body` was a JSON
          // Schema type that didn't allow `additionalProperties` then the implementation overload
          // would throw type errors.
          type: `${parameters.body.type} | ${parameters.metadata.type}`,
          hasQuestionToken: true,
        },
        { ...parameters.metadata, hasQuestionToken: true },
      ]);
    } else {
      operationIdAccessor.addParameters(Object.values(parameters));
    }
  }

  /**
   * Scour through the current OpenAPI definition and compile a store of every operation, along
   * with every HTTP method that's in use, and their available TypeScript types that we can use,
   * along with every HTTP method that's in use.
   *
   */
  private loadOperationsAndMethods() {
    const operations: Record</* operationId */ string, OperationTypeHousing> = {};
    const methods = new Set<HttpMethods>();

    // Prepare all of the schemas that we need to process for every operation within this API
    // definition.
    Object.entries(this.spec.getPaths()).forEach(([, ops]) => {
      Object.entries(ops).forEach(([method, operation]: [string, Operation]) => {
        methods.add(method as HttpMethods);

        const operationId = operation.getOperationId({
          // This `camelCase` option will clean up any weird characters that might be present in
          // the `operationId` so as we don't break TS compilation with an invalid method accessor.
          camelCase: true,
        });

        operations[operationId] = {
          types: {
            params: this.prepareParameterTypesForOperation(operation, operationId),
            responses: this.prepareResponseTypesForOperation(operation, operationId),
          },
          operation,
        };
      });
    });

    if (!Object.keys(operations).length) {
      throw new Error('Sorry, this OpenAPI definition does not have any operation paths to generate an SDK for.');
    }

    return {
      operations,
      methods,
    };
  }

  /**
   * Compile the parameter (path, query, cookie, and header) schemas for an API operation into
   * usable TypeScript types.
   *
   */
  private prepareParameterTypesForOperation(operation: Operation, operationId: string) {
    const schemas = operation.getParametersAsJSONSchema({
      includeDiscriminatorMappingRefs: false,
      mergeIntoBodyAndMetadata: true,
      retainDeprecatedProperties: true,
      transformer: (s: SchemaObject) => {
        // As our schemas are dereferenced in the `oas` library we don't want to pollute our
        // codegen'd schemas file with duplicate schemas.
        if ('x-readme-ref-name' in s && typeof s['x-readme-ref-name'] !== 'undefined') {
          const typeName = generateTypeName(s['x-readme-ref-name']);
          this.addSchemaToExport(s, typeName, typeName);

          return `${REF_PLACEHOLDER}${typeName}` as SchemaObject;
        }

        return s;
      },
    });

    if (!schemas || !schemas.length) {
      return false;
    }

    const res = schemas
      .map(param => ({ [param.type]: param.schema }))
      .reduce((prev, next) => Object.assign(prev, next));

    return Object.entries(res)
      .map(([paramType, schema]: [string, SchemaObject | string]) => {
        let typeName;

        if (typeof schema === 'string' && schema.startsWith(REF_PLACEHOLDER)) {
          // If this schema is a string and has our conversion prefix then we've already created
          // a type for it.
          typeName = schema.replace(REF_PLACEHOLDER, '');
        } else {
          typeName = generateTypeName(operationId, paramType, 'param');
          this.addSchemaToExport(schema as SchemaObject, typeName, `${generateTypeName(operationId)}.${paramType}`);
        }

        return {
          // Types are prefixed with `types.` because that's how we're importing them from
          // `types.d.ts`.
          [paramType]: `types.${typeName}`,
        };
      })
      .reduce((prev, next) => Object.assign(prev, next), {}) as Record<'body' | 'formData' | 'metadata', string>;
  }

  /**
   * Compile the response schemas for an API operation into usable TypeScript types.
   *
   */
  private prepareResponseTypesForOperation(operation: Operation, operationId: string) {
    const responseStatusCodes = operation.getResponseStatusCodes();
    if (!responseStatusCodes.length) {
      return undefined;
    }

    const schemas = responseStatusCodes
      .map(status => {
        const schema = operation.getResponseAsJSONSchema(status, {
          includeDiscriminatorMappingRefs: false,
          transformer: (s: SchemaObject) => {
            // As our schemas are dereferenced in the `oas` library we don't want to pollute our
            // codegen'd schemas file with duplicate schemas.
            if ('x-readme-ref-name' in s && typeof s['x-readme-ref-name'] !== 'undefined') {
              const typeName = generateTypeName(s['x-readme-ref-name']);
              this.addSchemaToExport(s, typeName, `${typeName}`);

              return `${REF_PLACEHOLDER}${typeName}` as SchemaObject;
            }

            return s;
          },
          /**
           * @todo can remove this casting after https://github.com/readmeio/oas/pull/956 is published
           */
        }) as SchemaObject[];

        if (!schema) {
          return false;
        }

        return {
          [status]: schema.shift(),
        };
      })
      .reduce((prev, next) => Object.assign(prev, next));

    const res = Object.entries(schemas)
      .map(([status, { description, schema }]) => {
        let typeName;

        if (typeof schema === 'string' && schema.startsWith(REF_PLACEHOLDER)) {
          // If this schema is a string and has our conversion prefix then we've already created
          // a type for it.
          typeName = schema.replace(REF_PLACEHOLDER, '');
        } else {
          typeName = generateTypeName(operationId, 'response', status);

          // Because `status` will usually be a number here we need to set the pointer for it
          // within  an `[]` as if we do `FromSchema<typeof schemas.operation.response.200>`,
          // TypeScript will throw a compilation error.
          this.addSchemaToExport(schema, typeName, `${generateTypeName(operationId)}.response['${status}']`);
        }

        return {
          // Types are prefixed with `types.` because that's how we're importing them from
          // `types.d.ts`.
          [status]: {
            type: `types.${typeName}`,
            description,
          },
        };
      })
      .reduce((prev, next) => Object.assign(prev, next), {});

    return Object.keys(res).length ? res : undefined;
  }

  /**
   * Add a given schema into our schema dataset that we'll be be exporting as types.
   *
   */
  private addSchemaToExport(schema: SchemaObject, typeName: string, pointer: string) {
    if (this.types.has(typeName)) {
      return;
    }

    setWith(this.schemas, pointer, schema, Object);
    this.types.set(typeName, `FromSchema<typeof schemas.${pointer}>`);
  }

  /**
   * Add a new JSDoc `@tag` to an existing docblock.
   *
   */
  static #addTagToDocblock(docblock: OptionalKind<JSDocStructure>, tag: OptionalKind<JSDocTagStructure>) {
    const tags = docblock.tags ?? [];
    tags.push(tag);

    return {
      ...docblock,
      tags,
    };
  }
}
