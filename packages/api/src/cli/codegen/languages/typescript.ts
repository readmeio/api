import type Storage from '../../storage';
import type { InstallerOptions } from '../language';
import type Oas from 'oas';
import type { Operation } from 'oas';
import type { HttpMethods, SchemaObject } from 'oas/dist/rmoas.types';
import type {
  ClassDeclaration,
  JSDocStructure,
  MethodDeclaration,
  OptionalKind,
  ParameterDeclarationStructure,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import fs from 'fs';
import path from 'path';

import execa from 'execa';
import setWith from 'lodash.setwith';
import { IndentationText, Project, QuoteKind, ScriptTarget, VariableDeclarationKind } from 'ts-morph';

import logger from '../../logger';
import CodeGeneratorLanguage from '../language';

import { formatter, generateTypeName, wordWrap } from './typescript/util';

export type TSGeneratorOptions = {
  outputJS?: boolean;
  compilerTarget?: 'cjs' | 'esm';
};

type OperationTypeHousing = {
  types: {
    params?: false | Record<'body' | 'formData' | 'metadata', string>;
    responses?: Record<string, string>;
  };
  operation: Operation;
};

export default class TSGenerator extends CodeGeneratorLanguage {
  project: Project;

  outputJS: boolean;

  compilerTarget: 'cjs' | 'esm';

  types: Map<string, string>;

  files: Record<string, string>;

  methodGenerics: Map<string, MethodDeclaration>;

  sdk: ClassDeclaration;

  schemas: Record<
    string,
    // Operation-level type
    | {
        body?: any;
        metadata?: any;
        response?: Record<string, any>;
      }
    // Wholesale collection of `$ref` pointer types
    | Record<string, any>
  >;

  constructor(spec: Oas, specPath: string, identifier: string, opts: TSGeneratorOptions = {}) {
    const options: { outputJS: boolean; compilerTarget: 'cjs' | 'esm' } = {
      outputJS: false,
      compilerTarget: 'cjs',
      ...opts,
    };

    if (!options.outputJS) {
      // TypeScript compilation will always target towards ESM-like imports and exports.
      options.compilerTarget = 'esm';
    }

    super(spec, specPath, identifier);

    this.requiredPackages = {
      'api@beta': {
        reason: "Required for the `api/dist/core` library that the codegen'd SDK uses for making requests.",
        url: 'https://npm.im/api',
      },
      'json-schema-to-ts': {
        reason: 'Required for TypeScript type handling.',
        url: 'https://npm.im/json-schema-to-ts',
      },
      oas: {
        reason: 'Used within `api/dist/core` and is also loaded for TypeScript types.',
        url: 'https://npm.im/oas',
      },
    };

    this.project = new Project({
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
        quoteKind: QuoteKind.Single,
      },
      compilerOptions: {
        // If we're exporting a TypeScript SDK then we don't need to pollute the codegen directory
        // with unnecessary declaration `.d.ts` files.
        declaration: options.outputJS,
        outDir: 'dist',
        resolveJsonModule: true,
        target: options.compilerTarget === 'cjs' ? ScriptTarget.ES5 : ScriptTarget.ES2020,

        // If we're compiling to a CJS target then we need to include this compiler option
        // otherwise TS will attempt to load our `openapi.json` import with a `.default` property
        // which doesn't exist. `esModuleInterop` wraps imports in a small `__importDefault`
        // function that does some determination to see if the module has a default export or not.
        //
        // Basically without this option CJS code will fail.
        ...(options.compilerTarget === 'cjs' ? { esModuleInterop: true } : {}),
      },
    });

    this.compilerTarget = options.compilerTarget;
    this.outputJS = options.outputJS;

    this.types = new Map();
    this.methodGenerics = new Map();
    this.schemas = {};
  }

  async installer(storage: Storage, opts: InstallerOptions = {}): Promise<void> {
    const installDir = storage.getIdentifierStorageDir();

    const pkg = {
      name: `@api/${storage.identifier}`,
      main: `./index.${this.outputJS ? 'js' : 'ts'}`,
      types: './index.d.ts', // Types are always present regardless if you're getting compiled JS.
    };

    fs.writeFileSync(path.join(installDir, 'package.json'), JSON.stringify(pkg, null, 2));

    const npmInstall = ['install', '--save', opts.dryRun ? '--dry-run' : ''].filter(Boolean);

    // This will install packages required for the SDK within its installed directory in `.apis/`.
    await execa('npm', [...npmInstall, ...Object.keys(this.requiredPackages)].filter(Boolean), {
      cwd: installDir,
    }).then(res => {
      if (opts.dryRun) {
        (opts.logger ? opts.logger : logger)(res.command);
        (opts.logger ? opts.logger : logger)(res.stdout);
      }
    });

    // This will install the installed SDK as a dependency within the current working directory,
    // adding `@api/<sdk identifier>` as a dependency there so you can load it with
    // `require('@api/<sdk identifier>)`.
    return execa('npm', [...npmInstall, storage.getIdentifierStorageDir()].filter(Boolean)).then(res => {
      if (opts.dryRun) {
        (opts.logger ? opts.logger : logger)(res.command);
        (opts.logger ? opts.logger : logger)(res.stdout);
      }
    });
  }

  /**
   * Compile the current OpenAPI definition into a TypeScript library.
   *
   */
  async generator() {
    const sdkSource = this.createSourceFile();

    if (Object.keys(this.schemas).length) {
      this.createSchemasFile();
      this.createTypesFile();

      // Export all of our available types so they can be used in SDK implementations.
      //
      // We're exporting all of the types individually because TS has no way right now of allowing
      // us to do `export type * from './types'` on a non-named entry.
      //
      // https://github.com/microsoft/TypeScript/issues/37238
      const types = Array.from(this.types.keys());
      types.sort();

      sdkSource.addExportDeclarations([
        {
          isTypeOnly: true,
          namedExports: types,
          moduleSpecifier: './types',
        },
      ]);
    } else {
      // If we don't have any schemas then we shouldn't import a `types` file that doesn't exist.
      sdkSource
        .getImportDeclarations()
        .find(id => id.getText() === "import type * as types from './types';")
        .remove();
    }

    if (this.outputJS) {
      return this.project
        .emitToMemory()
        .getFiles()
        .map(sourceFile => {
          const file = path.basename(sourceFile.filePath);
          if (file === 'schemas.js' || file === 'types.js') {
            // If we're generating a JS SDK then we don't need to generate these two files as the
            // user will have `.d.ts` files for them instead.
            return {};
          }

          let code = formatter(sourceFile.text);
          if (file === 'index.js' && this.compilerTarget === 'cjs') {
            /**
             * There's an annoying quirk with `ts-morph` where if we're exporting a default export
             * to a CJS environment, it'll export it as `exports.default`. Because we don't want
             * folks in these environments to have to load their SDKs with
             * `require('@api/sdk').default` we're overriding that here to change it to being the
             * module exports.
             *
             * `ts-morph` unfortunately doesn't give us any options for programatically doing this
             * so we need to resort to modifying the emitted JS code.
             */
            code = code.replace('exports.default = createSDK;', 'module.exports = createSDK;');
          }

          return {
            [file]: code,
          };
        })
        .reduce((prev, next) => Object.assign(prev, next));
    }

    return [
      ...this.project.getSourceFiles().map(sourceFile => ({
        [sourceFile.getBaseName()]: formatter(sourceFile.getFullText()),
      })),

      // Because we're returning the raw source files for TS generation we also need to separately
      // emit out our declaration files so we can put those into a separate file in the installed
      // SDK directory.
      ...this.project
        .emitToMemory({ emitOnlyDtsFiles: true })
        .getFiles()
        .map(sourceFile => ({
          [path.basename(sourceFile.filePath)]: formatter(sourceFile.text),
        })),
    ].reduce((prev, next) => Object.assign(prev, next));
  }

  /**
   * Create our main SDK source file.
   *
   */
  createSourceFile() {
    const { operations, methods } = this.loadOperationsAndMethods();

    const sourceFile = this.project.createSourceFile('index.ts', '');

    sourceFile.addImportDeclarations([
      // This import will be automatically removed later if the SDK ends up not having any types.
      { defaultImport: 'type * as types', moduleSpecifier: './types' },
      { defaultImport: 'type { ConfigOptions }', moduleSpecifier: 'api/dist/core' },
      { defaultImport: 'Oas', moduleSpecifier: 'oas' },
      { defaultImport: 'APICore', moduleSpecifier: 'api/dist/core' },
      { defaultImport: 'definition', moduleSpecifier: this.specPath },
    ]);

    // @todo add TOS, License, info.* to a docblock at the top of the SDK.
    this.sdk = sourceFile.addClass({
      name: 'SDK',
      properties: [
        { name: 'spec', type: 'Oas' },
        { name: 'core', type: 'APICore' },
      ],
    });

    this.sdk.addConstructor({
      statements: writer => {
        writer.writeLine('this.spec = Oas.init(definition);');
        writer.write('this.core = new APICore(this.spec, ').quote(this.userAgent).write(');');
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
              writer.writeLine(
                wordWrap('Optionally configure various options, such as response parsing, that the SDK allows.')
              ),
            tags: [
              { tagName: 'param', text: 'config Object of supported SDK options and toggles.' },
              {
                tagName: 'param',
                text: 'config.parseResponse If responses are parsed according to its `Content-Type` header.',
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
sdk.auth('myApiKey');`)
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
sdk.server('https://eu.api.example.com/v14');`)
              ),
            tags: [
              { tagName: 'param', text: 'url Server URL' },
              { tagName: 'param', text: 'variables An object of variables to replace into the server URL.' },
            ],
          },
        ],
      },
    ]);

    // Add all common method accessors into the SDK.
    Array.from(methods).forEach((method: string) => this.createGenericMethodAccessor(method));

    // Add all available operation ID accessors into the SDK.
    Object.entries(operations).forEach(([operationId, data]: [string, OperationTypeHousing]) => {
      this.createOperationAccessor(data.operation, operationId, data.types.params, data.types.responses);
    });

    // Export our SDK into the source file.
    sourceFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: 'createSDK',
          initializer: writer => {
            // `ts-morph` doesn't have any way to cleanly create an IFEE.
            writer.writeLine('(() => { return new SDK(); })()');
            return writer;
          },
        },
      ],
    });

    sourceFile.addExportAssignment({ isExportEquals: false, expression: 'createSDK' });

    return sourceFile;
  }

  /**
   * Create our main schemas file. This is where all of the JSON Schema that our TypeScript typing
   * infrastructure sources its data from. Without this there are no types.
   *
   */
  createSchemasFile() {
    const sourceFile = this.project.createSourceFile('schemas.ts', '');

    const sortedSchemas = new Map(Array.from(Object.entries(this.schemas)).sort());

    Array.from(sortedSchemas).forEach(([schemaName, schema]) => {
      sourceFile.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: schemaName,
            initializer: writer => {
              /**
               * This is the conversion prefix that we add to all `$ref` pointers we find in
               * generated JSON Schema.
               *
               * Because the pointer name is a string we want to have it reference the schema
               * constant we're adding into the codegen'd schema file. As there's no way, not even
               * using `eval()` in this case, to convert a string to a constant we're prefixing
               * them with this so we can later remove it and rewrite the value to a literal.
               * eg. `'Pet'` becomes `Pet`.
               *
               * And because our TypeScript type name generator properly ignores `:`, this is safe
               * to prepend to all generated type names.
               */
              let str = JSON.stringify(schema);
              str = str.replace(/"::convert::([a-zA-Z_$\\d]*)"/g, '$1');

              writer.writeLine(`${str} as const`);
              return writer;
            },
          },
        ],
      });
    });

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
  createTypesFile() {
    const sourceFile = this.project.createSourceFile('types.ts', '');

    sourceFile.addImportDeclarations([
      { defaultImport: 'type { FromSchema }', moduleSpecifier: 'json-schema-to-ts' },
      { defaultImport: '* as schemas', moduleSpecifier: './schemas' },
    ]);

    Array.from(new Map(Array.from(this.types.entries()).sort())).forEach(([typeName, typeExpression]) => {
      sourceFile.addTypeAlias({ isExported: true, name: typeName, type: typeExpression });
    });

    return sourceFile;
  }

  /**
   * Create a generic HTTP method accessor on the SDK.
   *
   */
  createGenericMethodAccessor(method: string) {
    const parameters: OptionalKind<ParameterDeclarationStructure>[] = [{ name: 'path', type: 'string' }];
    const docblock: OptionalKind<JSDocStructure> = {
      description: writer => {
        writer.writeLine(wordWrap(`Access any ${method.toUpperCase()} endpoint on your API.`));
        return writer;
      },
      tags: [{ tagName: 'param', text: 'path API path to make a request against.' }],
    };

    // Method generic body + metadata parameters are always optional.
    if (method !== 'get') {
      parameters.push({ name: 'body', type: 'unknown', hasQuestionToken: true });
      docblock.tags.push({ tagName: 'param', text: 'body Request body payload data.' });
    }

    parameters.push({ name: 'metadata', type: 'Record<string, unknown>', hasQuestionToken: true });
    docblock.tags.push({
      tagName: 'param',
      text: 'metadata Object containing all path, query, header, and cookie parameters to supply.',
    });

    this.methodGenerics.set(
      method,
      this.sdk.addMethod({
        name: method,
        returnType: 'Promise<T>',
        parameters,
        typeParameters: ['T = unknown'],
        docs: [docblock],
        statements: writer => {
          /**
           * @example return this.core.fetch(path, 'get', body, metadata);
           * @example return this.core.fetch(path, 'get', metadata);
           */
          const fetchStmt = writer.write('return this.core.fetch(path, ').quote(method).write(', ');

          const fetchArgs = parameters.slice(1).map(p => p.name);
          fetchArgs.forEach((arg, i) => {
            fetchStmt.write(arg);
            if (fetchArgs.length > 1 && i !== fetchArgs.length) {
              fetchStmt.write(', ');
            }
          });

          fetchStmt.write(');');

          return fetchStmt;
        },
      })
    );
  }

  /**
   * Create operation accessors on the SDK.
   *
   */
  createOperationAccessor(
    operation: Operation,
    operationId: string,
    paramTypes?: OperationTypeHousing['types']['params'],
    responseTypes?: OperationTypeHousing['types']['responses']
  ) {
    const docblock: OptionalKind<JSDocStructure> = {};
    const summary = operation.getSummary();
    const description = operation.getDescription();
    if (summary || description) {
      // To keep our generated docblocks clean we should only add the `@summary` tag if we've
      // got both a summary and a description present on the operation, otherwise we can alternate
      // what we surface the main docblock description.
      docblock.description = writer => {
        if (description) {
          writer.writeLine(description);
        } else if (summary) {
          writer.writeLine(summary);
        }

        writer.newLineIfLastNot();
        return writer;
      };

      if (summary && description) {
        docblock.tags = [{ tagName: 'summary', text: summary }];
      }
    }

    let hasOptionalBody = false;
    let hasOptionalMetadata = false;
    const parameters: {
      body?: OptionalKind<ParameterDeclarationStructure>;
      metadata?: OptionalKind<ParameterDeclarationStructure>;
    } = {};

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

    let returnType = 'Promise<T>';
    let typeParameters: (string | OptionalKind<TypeParameterDeclarationStructure>)[] = null;
    if (responseTypes) {
      returnType = `Promise<${Object.values(responseTypes)
        .map(responseType => responseType)
        .join(' | ')}>`;
    } else {
      // We should only add the `<T>` method typing if we don't have any response types present.
      typeParameters = ['T = unknown'];
    }

    const operationIdAccessor = this.sdk.addMethod({
      name: operationId,
      typeParameters,
      returnType,
      docs: Object.keys(docblock).length ? [docblock] : null,
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
            if (totalParams > 1 && i !== totalParams) {
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
    //
    // None of these accessor overloads will receive a docblock because the original will have
    // that covered.
    const shouldAddAltTypedOverloads = Object.keys(parameters).length === 2 && hasOptionalBody && !hasOptionalMetadata;
    if (shouldAddAltTypedOverloads) {
      // Create an overload that has both `body` and `metadata` parameters as required.
      operationIdAccessor.addOverload({
        typeParameters,
        parameters: [
          { ...parameters.body, hasQuestionToken: false },
          { ...parameters.metadata, hasQuestionToken: false },
        ],
        returnType,
        docs: Object.keys(docblock).length ? [docblock] : null,
      });

      // Create an overload that just has a single `metadata` parameter.
      operationIdAccessor.addOverload({
        typeParameters,
        parameters: [{ ...parameters.metadata }],
        returnType,
        docs: Object.keys(docblock).length ? [docblock] : null,
      });

      // Create an overload that has both `body` and `metadata` parameters as optional. Even though
      // our `metadata` parameter is actually required for this operation this is the only way we're
      // able to have an optional `body` parameter be present before `metadata`.
      //
      // Thankfully our core fetch work in `api/dist/core` is able to do the proper determination to
      // see if what the user is supplying is `metadata` or `body` content when they supply one or
      // both.
      operationIdAccessor.addParameters([
        { ...parameters.body, hasQuestionToken: true },
        { ...parameters.metadata, hasQuestionToken: true },
      ]);
    } else {
      operationIdAccessor.addParameters(Object.values(parameters));
    }

    // Add a typed generic HTTP method overload for this operation.
    if (this.methodGenerics.has(operation.method)) {
      // If we created alternate overloads for the operation accessor then we need to do the same
      // for its generic HTTP counterpart.
      if (shouldAddAltTypedOverloads) {
        // Create an overload that has both `body` and `metadata` parameters as required.
        this.methodGenerics.get(operation.method).addOverload({
          typeParameters,
          parameters: [
            { name: 'path', type: `'${operation.path}'` },
            { ...parameters.body, hasQuestionToken: false },
            { ...parameters.metadata, hasQuestionToken: false },
          ],
          returnType,
          docs: Object.keys(docblock).length ? [docblock] : null,
        });

        // Create an overload that just has a single `metadata` parameter.
        this.methodGenerics.get(operation.method).addOverload({
          typeParameters,
          parameters: [{ name: 'path', type: `'${operation.path}'` }, parameters.metadata],
          returnType,
          docs: Object.keys(docblock).length ? [docblock] : null,
        });
      } else {
        this.methodGenerics.get(operation.method).addOverload({
          typeParameters: responseTypes ? null : ['T = unknown'],
          parameters: [{ name: 'path', type: `'${operation.path}'` }, ...Object.values(parameters)],
          returnType,
          docs: Object.keys(docblock).length ? [docblock] : null,
        });
      }
    }
  }

  /**
   * Scour through the current OpenAPI definition and compile a store of every operation, along
   * with every HTTP method that's in use, and their available TypeScript types that we can use,
   * along with every HTTP method that's in use.
   *
   */
  loadOperationsAndMethods() {
    const operations: Record</* operationId */ string, OperationTypeHousing> = {};
    const methods = new Set();

    // Prepare all of the schemas that we need to process for every operation within this API
    // definition.
    Object.entries(this.spec.getPaths()).forEach(([, ops]) => {
      Object.entries(ops).forEach(([method, operation]: [HttpMethods, Operation]) => {
        methods.add(method);

        const operationId = operation.getOperationId({
          // This `camelCase` option will clean up any weird characters that might be present in
          // the `operationId` so as we don't break TS compilation with an invalid method accessor.
          camelCase: true,
        });

        const params = this.prepareParameterTypesForOperation(operation, operationId);
        const responses = this.prepareResponseTypesForOperation(operation, operationId);

        if (operation.hasOperationId()) {
          operations[operationId] = {
            types: {
              params,
              responses,
            },
            operation,
          };
        }
      });
    });

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
  prepareParameterTypesForOperation(operation: Operation, operationId: string) {
    const schemas = operation.getParametersAsJSONSchema({
      mergeIntoBodyAndMetadata: true,
      retainDeprecatedProperties: true,
      transformer: (s: SchemaObject) => {
        // As our schemas are dereferenced in the `oas` library we don't want to pollute our
        // codegen'd schemas file with duplicate schemas.
        if ('x-readme-ref-name' in s) {
          const typeName = generateTypeName(s['x-readme-ref-name']);
          this.addSchemaToExport(s, typeName, `${typeName}`);

          return `::convert::${typeName}` as SchemaObject;
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
      .map(([paramType, schema]: [string, string | unknown]) => {
        let typeName;

        if (typeof schema === 'string' && schema.startsWith('::convert::')) {
          // If this schema is a string and has our conversion prefix then we've already created
          // a type for it.
          typeName = schema.replace('::convert::', '');
        } else {
          typeName = generateTypeName(operationId, paramType, 'param');
          this.addSchemaToExport(schema, typeName, `${operationId}.${paramType}`);
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
  prepareResponseTypesForOperation(operation: Operation, operationId: string) {
    const responseStatusCodes = operation.getResponseStatusCodes();
    if (!responseStatusCodes.length) {
      return undefined;
    }

    const schemas = responseStatusCodes
      .map(status => {
        const schema = operation.getResponseAsJSONSchema(status, {
          transformer: (s: SchemaObject) => {
            // As our schemas are dereferenced in the `oas` library we don't want to pollute our
            // codegen'd schemas file with duplicate schemas.
            if ('x-readme-ref-name' in s) {
              const typeName = generateTypeName(s['x-readme-ref-name']);
              this.addSchemaToExport(s, typeName, `${typeName}`);

              return `::convert::${typeName}` as SchemaObject;
            }

            return s;
          },
        });

        if (!schema) {
          return false;
        }

        return {
          [status]: schema.shift(),
        };
      })
      .reduce((prev, next) => Object.assign(prev, next));

    const res = Object.entries(schemas)
      .map(([status, { schema }]) => {
        let typeName;

        if (typeof schema === 'string' && schema.startsWith('::convert::')) {
          // If this schema is a string and has our conversion prefix then we've already created
          // a type for it.
          typeName = schema.replace('::convert::', '');
        } else {
          typeName = generateTypeName(operationId, 'response', status);

          // Because `status` will usually be a number here we need to set the pointer for it
          // within  an `[]` as if we do `FromSchema<typeof schemas.operation.response.200>`,
          // TypeScript will throw a compilation error.
          this.addSchemaToExport(schema, typeName, `${operationId}.response['${status}']`);
        }

        return {
          // Types are prefixed with `types.` because that's how we're importing them from
          // `types.d.ts`.
          [status]: `types.${typeName}`,
        };
      })
      .reduce((prev, next) => Object.assign(prev, next), {});

    return Object.keys(res).length ? res : undefined;
  }

  /**
   * Add a given schema into our schema dataset that we'll be be exporting as types.
   *
   */
  addSchemaToExport(schema: any, typeName: string, pointer: string) {
    if (this.types.has(typeName)) {
      return;
    }

    setWith(this.schemas, pointer, schema, Object);
    this.types.set(typeName, `FromSchema<typeof schemas.${pointer}>`);
  }
}
