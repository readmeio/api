import type Oas from 'oas';
import type { Operation } from 'oas';
import type { HttpMethods, JSONSchema } from 'oas/@types/rmoas.types';
import type { JSDocStructure, MethodDeclaration, OptionalKind, ParameterDeclarationStructure } from 'ts-morph';
import type { Options as JSONSchemaToTypescriptOptions } from 'json-schema-to-typescript';

import CodeGenerator from '.';
import { IndentationText, Project, QuoteKind } from 'ts-morph';
import { compile } from 'json-schema-to-typescript';
import { format as prettier } from 'json-schema-to-typescript/dist/src/formatter';

type OperationTypeHousing = {
  types: {
    params: Record<'body' | 'formData' | 'metadata', string>;
    responses?: Record<string, string>;
  };
  operation: Operation;
};

// https://www.30secondsofcode.org/js/s/word-wrap
function wordWrap(str: string, max = 88) {
  return str.replace(new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), '$1\n');
}

export default class TSGenerator extends CodeGenerator {
  userAgent: 'api/1.0.0';

  project: Project;

  types: Map<string, string>;

  files: Record<string, string>;

  constructor(spec: Oas, specPath: string) {
    super(spec, specPath);

    // @todo fill this user agent in with something contextual.
    this.userAgent = 'api/1.0.0';

    this.project = new Project({
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
        quoteKind: QuoteKind.Single,
      },
      compilerOptions: {
        // target: ScriptTarget.ES3,
        outDir: 'dist',
      },
    });

    this.types = new Map();
  }

  /**
   * Compile the current OpenAPI definition into a TypeScript library.
   *
   */
  async generator() {
    const { operations, methods } = await this.loadOperationsAndMethods();

    const sdkSource = this.project.createSourceFile('index.ts', 'export default class SDK {}');

    sdkSource.addImportDeclarations([
      { defaultImport: 'Oas', moduleSpecifier: 'oas' },
      { defaultImport: 'APICore', moduleSpecifier: 'api/core' },
      { defaultImport: 'definition', moduleSpecifier: this.specPath },
    ]);

    const sdk = sdkSource.getClassOrThrow('SDK');
    sdk.addProperties([
      { name: 'spec', type: 'Oas' },
      { name: 'core', type: 'APICore' },
      { name: 'authKeys', type: '(number | string)[][]', initializer: '[]' },
    ]);

    sdk.addConstructor({
      statements: writer => {
        writer.writeLine('this.spec = Oas.init(definition);');
        writer.write('this.core = new APICore(this.spec, ').quote(this.userAgent).write(');');
        return writer;
      },
    });

    // Add our core API methods for controlling auth, servers, and various configurable abilities.
    sdkSource.addInterface({
      name: 'ConfigOptions',
      properties: [
        {
          name: 'parseResponse',
          type: 'boolean',
          docs: [
            wordWrap(
              'By default we parse the response based on the `Content-Type` header of the request. You can disable this functionality by negating this option.'
            ),
          ],
        },
      ],
    });

    sdk.addMethods([
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
                text: 'config.parseResponse If responses are parsed according to its `Content-Type` header`.',
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
sdk.auth('username', 'password');')

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
    const methodGenerics: Record<string, MethodDeclaration> = {};
    Array.from(methods).forEach((method: string) => {
      const fetchArgs: string[] = [];

      // @todo add docblock tags for these params and return types
      methodGenerics[method] = sdk.addMethod({
        name: method,
        returnType: 'Promise<unknown>',
        parameters: [{ name: 'path', type: 'string' }],
      });

      // Method generic body + metadata parameters are always optional.
      if (method !== 'get') {
        methodGenerics[method].addParameter({ name: 'body', type: 'unknown', hasQuestionToken: true });
        fetchArgs.push('body');
      }

      methodGenerics[method].addParameter({
        name: 'metadata',
        type: 'Record<string, unknown>',
        hasQuestionToken: true,
      });

      fetchArgs.push('metadata');

      methodGenerics[method].setBodyText(writer => {
        /** @example return this.core.fetch(path, 'get', body, metadata); */
        const fetchStmt = writer.write('return this.core.fetch(path, ').quote(method).write(', ');
        fetchArgs.forEach((arg, i) => {
          fetchStmt.write(arg);
          if (fetchArgs.length > 1 && i !== fetchArgs.length) {
            fetchStmt.write(', ');
          }
        });

        fetchStmt.write(');');

        return fetchStmt;
      });
    });

    // Add all available operation ID accessors into the SDK.
    Object.entries(operations).forEach(([operationId, data]: [string, OperationTypeHousing]) => {
      const operation: Operation = data.operation;

      const docblock: OptionalKind<JSDocStructure> = { tags: [] };
      const summary = operation.getSummary();
      const description = operation.getDescription();
      if (summary || description) {
        // To keep our generated docblocks clean we should only add the `@summary` tag if we've
        // got both a summary and a description present on the operation, otherwise we can alternate
        // what we surface the main docblock description.
        docblock.description = writer => {
          if ((description && summary) || (description && !summary)) {
            writer.writeLine(description);
          } else if (summary && !description) {
            writer.writeLine(summary);
          }

          writer.newLineIfLastNot();
          return writer;
        };

        if (summary && description) {
          docblock.tags.push({ tagName: 'summary', text: summary });
        }
      }

      const parameters: OptionalKind<ParameterDeclarationStructure>[] = [];
      if (data.types.params) {
        if (data.types.params.body || data.types.params.formData) {
          parameters.push({
            name: 'body',
            type: data.types.params.body,
            // hasQuestionToken: true, // @todo this should be an optional param if there's no required params.
          });

          docblock.tags.push({ tagName: 'param', text: 'body Request body payload data.' });
        }

        if (data.types.params.metadata) {
          // @todo this should be an optional param if there's no required params.
          parameters.push({
            name: 'metadata',
            type: data.types.params.metadata,
            // hasQuestionToken: true, // @todo this should be an optional param if there's no required params.
          });

          docblock.tags.push({
            tagName: 'param',
            text: 'metadata Object containing all path, query, header, and cookie parameters to supply.',
          });
        }
      }

      let returnType = 'Promise<unknown>';
      if (data.types.responses) {
        returnType = `Promise<${Object.values(data.types.responses).join(' | ')}>`;
      }

      sdk.addMethod({
        name: operationId,
        returnType,
        parameters,
        docs: docblock ? [docblock] : null,
        statements: writer => {
          /** @example return this.core.fetch('/pet/findByStatus', 'get', metadata); */
          const fetchStmt = writer
            .write('return this.core.fetch(')
            .quote(operation.path)
            .write(', ')
            .quote(operation.method);

          if (parameters.length) {
            parameters.forEach((arg, i) => {
              if (i === 0) {
                fetchStmt.write(', ');
              }

              fetchStmt.write(arg.name);
              if (parameters.length > 1 && i !== parameters.length) {
                fetchStmt.write(', ');
              }
            });
          }

          fetchStmt.write(');');
          return fetchStmt;
        },
      });

      // Add a typed generic HTTP method overload for this operation.
      if (operation.method in methodGenerics) {
        methodGenerics[operation.method].addOverload({
          parameters: [{ name: 'path', type: 'string' }, ...parameters],
          returnType,
          docs: docblock ? [docblock] : null,
        });
      }
    });

    // @todo should all of these isolated into their own file outside of the main sdk class file?
    // Add all known types that we're using into the SDK.
    Array.from(this.types.values()).forEach(exp => {
      sdkSource.addStatements(exp);
    });

    // const result = project.emitToMemory();
    return this.project
      .getSourceFiles()
      .map(sourceFile => ({
        [sourceFile.getBaseName()]: prettier(sourceFile.getFullText(), {
          format: true,
          style: {
            printWidth: 120,
            singleQuote: true,
          },
        } as JSONSchemaToTypescriptOptions),
      }))
      .reduce((prev, next) => Object.assign(prev, next));
  }

  /**
   * Convert a JSON Schema object into a readily available TypeScript type or interface along with
   * any `$ref` pointers that are in use and turn those into TS types too.
   *
   * Under the hood this uses https://npm.im/json-schema-to-typescript for all composition and
   * conversion.
   *
   * @param schema
   * @param name
   */
  async convertJSONSchemaToTypescript(schema: JSONSchema, name: string) {
    // Though our JSON Schema type exposes JSONSchema4, which `json-schema-to-typescript` wants, it
    // won't accept our custom union type of JSON Schema 4, JSON Schema 6, and JSON Schema 7.
    const ts = await compile(schema as any, name, {
      bannerComment: '',
      // Running Prettier here for every JSON Schema object we're generating is way too slow so
      // we're instead running it at the very end after we've constructed the SDK.
      format: false,
    });

    let primaryType: string;
    const tempProject = this.project.createSourceFile(`${name}.types.tmp.ts`, ts);
    const declarations = tempProject.getExportedDeclarations();

    Array.from(declarations.keys()).forEach(declarationName => {
      if (!primaryType) {
        primaryType = declarationName;
      }

      declarations.get(declarationName).forEach(declaration => {
        this.types.set(declarationName, declaration.getText());
      });
    });

    this.project.removeSourceFile(tempProject);

    return {
      primaryType,
    };
  }

  /**
   * Scour through the current OpenAPI definition and compile a store of every operation, along
   * with every HTTP method that's in use, and their available TypeScript types that we can use,
   * along with every HTTP method that's in use.
   *
   */
  async loadOperationsAndMethods() {
    const operations: Record</* operationId */ string, OperationTypeHousing> = {};
    const methods = new Set();

    await Promise.all(
      Object.entries(this.spec.getPaths()).map(async ([, ops]) => {
        await Promise.all(
          Object.entries(ops).map(async ([method, operation]: [HttpMethods, Operation]) => {
            methods.add(method);

            const operationId = operation.getOperationId();
            const params = await this.getParameterTypesForOperation(operation, operationId);
            const responses = await this.getResponseTypesForOperation(operation, operationId);

            if (operation.hasOperationId()) {
              operations[operation.getOperationId()] = {
                types: { params, responses },
                operation,
              };
            }
          })
        );
      })
    );

    return {
      operations,
      methods,
    };
  }

  /**
   * Compile the parameter (path, query, cookie, and header) schemas for an API operation into
   * usable TypeScript types.
   *
   * @param operation
   * @param operationId
   */
  async getParameterTypesForOperation(operation: Operation, operationId: string) {
    let params;
    const paramSchemas = operation.getParametersAsJsonSchema({
      mergeIntoBodyAndMetadata: true,
      retainDeprecatedProperties: true,
    });

    if (paramSchemas) {
      params = await Promise.resolve(paramSchemas.map(param => ({ [param.type]: param.schema })))
        .then(res => res.reduce((prev, next) => Object.assign(prev, next)))
        .then(res => {
          return Promise.all(
            Object.entries(res).map(async ([paramType, schema]) => {
              // @todo add tests for when schema is `{ type: string }`
              const ts = await this.convertJSONSchemaToTypescript(
                schema as JSONSchema,
                `${operationId}_${paramType}_param`
              );

              return {
                [paramType]: ts.primaryType,
              };
            })
          );
        })
        .then(res => {
          return res.reduce((prev, next) => Object.assign(prev, next), {}) as Record<
            'body' | 'formData' | 'metadata',
            string
          >;
        });
    }

    return params;
  }

  /**
   * Compile the response schemas for an API operation into usable TypeScript types.
   *
   * @todo what does this do for a spec that has no responses?
   * @param operation
   * @param operationId
   */
  async getResponseTypesForOperation(operation: Operation, operationId: string) {
    return Promise.resolve(
      operation
        .getResponseStatusCodes()
        .map(status => {
          const schema = operation.getResponseAsJsonSchema(status);
          if (!schema) {
            return false;
          }

          return {
            [status]: schema.shift(),
          };
        })
        .reduce((prev, next) => Object.assign(prev, next))
    )
      .then(res => {
        return Promise.all(
          Object.entries(res).map(async ([status, jsonSchema]) => {
            const ts = await this.convertJSONSchemaToTypescript(
              jsonSchema.schema as JSONSchema,
              `${operationId}_Response_${status}`
            );

            return {
              [status]: ts.primaryType,
            };
          })
        );
      })
      .then(res => res.reduce((prev, next) => Object.assign(prev, next), {}))
      .then(res => (Object.keys(res).length ? res : undefined));
  }
}
