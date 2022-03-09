import type Oas from 'oas';
import type { Operation } from 'oas';
import type { HttpMethods, JSONSchema } from 'oas/@types/rmoas.types';
import type { MethodDeclaration } from 'ts-morph';

import CodeGenerator from '.';
import { IndentationText, Project, QuoteKind } from 'ts-morph';
import { compile } from 'json-schema-to-typescript';

type OperationTypeHousing = {
  types: {
    params: Record<'body' | 'formData' | 'metadata', string>;
    responses?: Record<string, string>;
  };
  operation: Operation;
};

export default class TSGenerator extends CodeGenerator {
  userAgent: 'api/1.0.0';

  project: Project;

  types: Map<string, string>;

  files: Record<string, string>;

  constructor(spec: Oas) {
    super(spec);

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
      {
        defaultImport: 'definition',
        moduleSpecifier: '../fixtures/simple.oas.json', // './openapi.json',
      },
    ]);

    const sdk = sdkSource.getClassOrThrow('SDK');
    sdk.addProperty({ name: 'spec', type: 'Oas' });
    sdk.addProperty({ name: 'core', type: 'APICore' });
    sdk.addProperty({ name: 'authKeys', type: '(number | string)[][]', initializer: '[]' });

    sdk.addConstructor({
      statements: ['this.spec = Oas.init(definition);', `this.core = new APICore(this.spec, '${this.userAgent}');`],
    });

    // Add our core API methods for controlling auth, servers, and various configurable abilities.
    sdk.addMethods([
      {
        name: 'config',
        parameters: [{ name: 'config', type: 'ConfigOptions' }],
        statements: 'this.core.setConfig(config);',
      },
      {
        name: 'auth',
        parameters: [{ name: '...values', type: 'string[] | number[]' }],
        statements: ['this.core.setAuth(...values);', 'return this;'],
      },
      {
        name: 'server',
        parameters: [
          { name: 'url', type: 'string' },
          { name: 'variables', initializer: '{}' },
        ],
        statements: 'this.core.setServer(url, variables);',
      },
    ]);

    sdkSource.addInterface({
      name: 'ConfigOptions',
      properties: [
        {
          name: 'parseResponse',
          type: 'boolean',
        },
      ],
    });

    // Add all common method accessors into the SDK.
    const methodGenerics: Record<string, MethodDeclaration> = {};
    methods.forEach(method => {
      const fetchArgs = ['path', `'${method}'`];
      const parameters = [{ name: 'path', type: 'string' }];

      // Method generic body + metadata parameters are always optional.
      if (method !== 'get') {
        parameters.push({ name: 'body?', type: 'unknown' });
        fetchArgs.push('body');
      }

      parameters.push({ name: 'metadata?', type: 'Record<string, unknown>' });
      fetchArgs.push('metadata');

      // @todo add docblock tags for these params and return types
      methodGenerics[method] = sdk.addMethod({
        name: method,
        returnType: 'Promise<unknown>',
        parameters,
        statements: `return this.core.fetch(${fetchArgs.join(', ')});`,
      });
    });

    // Add all available operation ID accessors into the SDK.
    Object.entries(operations).forEach(([operationId, data]: [string, OperationTypeHousing]) => {
      const operation: Operation = data.operation;
      const fetchArgs = [`'${operation.path}'`, `'${operation.method}'`];
      const parameters = [];
      if (data.types.params) {
        if (data.types.params.body || data.types.params.formData) {
          // @todo this should be an optional param if there's no required params.
          parameters.push({ name: 'body', type: data.types.params.body });
          fetchArgs.push('body');
        }

        if (data.types.params.metadata) {
          // @todo this should be an optional param if there's no required params.
          parameters.push({ name: 'metadata', type: data.types.params.metadata });
          fetchArgs.push('metadata');
        }
      }

      let returnType: string;
      if (data.types.responses) {
        returnType = `Promise<${Object.values(data.types.responses).join(' | ')}>`;
      }

      // @todo add docblock tags for these params and return types
      const method = sdk.addMethod({
        name: operationId,
        returnType,
        parameters,
        statements: `return this.core.fetch(${fetchArgs.join(', ')});`,
      });

      let docblock;
      const summary = operation.getSummary();
      const description = operation.getDescription();
      if (summary || description) {
        docblock = [
          summary ? `${summary.replace(/\n/g, '\n * ')}` : '',
          description ? `${description.replace(/\n/g, '\n * ')}` : '',
        ]
          .filter(Boolean)
          .join('\n\n');

        method.addJsDoc(docblock);
      }

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
    return this.project.getSourceFiles().map(sourceFile => ({
      [sourceFile.getBaseName()]: sourceFile.getFullText(),
    }));
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
    });

    let primaryType: string;
    const tmp = this.project.createSourceFile(`${name}.types.tmp.ts`, ts);
    const declarations = tmp.getExportedDeclarations();

    Array.from(declarations.keys()).forEach(declarationName => {
      if (!primaryType) {
        primaryType = declarationName;
      }

      declarations.get(declarationName).forEach(declaration => {
        this.types.set(declarationName, declaration.getText());
      });
    });

    this.project.removeSourceFile(tmp);

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
    const methods: string[] = [];

    await Promise.all(
      Object.entries(this.spec.getPaths()).map(async ([, ops]) => {
        await Promise.all(
          Object.entries(ops).map(async ([method, operation]: [HttpMethods, Operation]) => {
            if (!(method in methods)) {
              methods.push(method);
            }

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
      .then(res => res.reduce((prev, next) => Object.assign(prev, next), {}));
  }
}
