import type Oas from 'oas';
import type { Operation } from 'oas';
import type { HttpMethods, JSONSchema } from 'oas/@types/rmoas.types';
import type {
  ClassDeclaration,
  JSDocStructure,
  MethodDeclaration,
  OptionalKind,
  ParameterDeclarationStructure,
  TypeParameterDeclarationStructure,
} from 'ts-morph';
import type { Options as JSONSchemaToTypescriptOptions } from 'json-schema-to-typescript';

import CodeGenerator from '.';
import memoize from 'memoizee';
import { IndentationText, Project, QuoteKind } from 'ts-morph';
import { compile } from 'json-schema-to-typescript';
import { format as prettier } from 'json-schema-to-typescript/dist/src/formatter';

const memoizedCompile = memoize(compile);

type OperationTypeHousing = {
  types: {
    params?: Record<'body' | 'formData' | 'metadata', string>;
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

  methodGenerics: Map<string, MethodDeclaration>;

  sdk: ClassDeclaration;

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
    this.methodGenerics = new Map();
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

    // @todo add TOS, License, info.* to a docblock at the top of the SDK.
    this.sdk = sdkSource.getClassOrThrow('SDK');
    this.sdk.addProperties([
      { name: 'spec', type: 'Oas' },
      { name: 'core', type: 'APICore' },
      { name: 'authKeys', type: '(number | string)[][]', initializer: '[]' },
    ]);

    this.sdk.addConstructor({
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

    // @todo should all of these isolated into their own file outside of the main sdk class file?
    // Add all known types that we're using into the SDK.
    Array.from(this.types.values()).forEach(exp => {
      sdkSource.addStatements(exp);
    });

    // const result = project.emitToMemory();
    return this.project
      .getSourceFiles()
      .map(sourceFile => ({
        [sourceFile.getBaseName()]: this.formatter(sourceFile.getFullText()),
      }))
      .reduce((prev, next) => Object.assign(prev, next));
  }

  /**
   * Create a generic HTTP method accessor on the SDK.
   *
   * @param method
   */
  createGenericMethodAccessor(method: string) {
    const parameters: OptionalKind<ParameterDeclarationStructure>[] = [{ name: 'path', type: 'string' }];
    const docblock: OptionalKind<JSDocStructure> = {
      description: writer => {
        writer.writeLine(`Access any ${method} endpoint on your API.`);
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
   * @param operation
   * @param operationId
   * @param paramTypes
   * @param responseTypes
   */
  createOperationAccessor(
    operation: Operation,
    operationId: string,
    paramTypes?: OperationTypeHousing['types']['params'],
    responseTypes?: OperationTypeHousing['types']['responses']
  ) {
    const docblock: OptionalKind<JSDocStructure> = { tags: [] };
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
        docblock.tags.push({ tagName: 'summary', text: summary });
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
          type: paramTypes.body || paramTypes.formData,
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
      returnType = `Promise<${Object.values(responseTypes).join(' | ')}>`;
    } else {
      // We should only add the `<T>` method typing if we don't have any response types present.
      typeParameters = ['T = unknown'];
    }

    const operationIdAccessor = this.sdk.addMethod({
      name: operationId,
      typeParameters,
      returnType,
      docs: docblock ? [docblock] : null,
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
        docs: docblock ? [docblock] : null,
      });

      // Create an overload that just has a single `metadata` parameter.
      operationIdAccessor.addOverload({
        typeParameters,
        parameters: [{ ...parameters.metadata }],
        returnType,
        docs: docblock ? [docblock] : null,
      });

      // Create an overload that has both `body` and `metadata` parameters as optional. Even though
      // our `metadata` parameter is actually required for this operation this is the only way we're
      // able to have an optional `body` parameter be present before `metadata`.
      //
      // Thankfully our core fetch work in `api/core` is able to do the proper determination to
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
            { name: 'path', type: 'string' },
            { ...parameters.body, hasQuestionToken: false },
            { ...parameters.metadata, hasQuestionToken: false },
          ],
          returnType,
          docs: docblock ? [docblock] : null,
        });

        // Create an overload that just has a single `metadata` parameter.
        this.methodGenerics.get(operation.method).addOverload({
          typeParameters,
          parameters: [{ name: 'path', type: 'string' }, parameters.metadata],
          returnType,
          docs: docblock ? [docblock] : null,
        });
      } else {
        this.methodGenerics.get(operation.method).addOverload({
          typeParameters: responseTypes ? null : ['T = unknown'],
          parameters: [{ name: 'path', type: 'string' }, ...Object.values(parameters)],
          returnType,
          docs: docblock ? [docblock] : null,
        });
      }
    }
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
    const ts = await memoizedCompile(schema as any, name, {
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

  // eslint-disable-next-line class-methods-use-this
  formatter(content: string) {
    return prettier(content, {
      format: true,
      style: {
        printWidth: 120,
        singleQuote: true,
      },
    } as JSONSchemaToTypescriptOptions);
  }
}
