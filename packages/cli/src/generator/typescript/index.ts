import type Oas from 'oas';
import type { Operation } from 'oas';
import type { JSONSchema, SchemaObject } from 'oas/@types/rmoas.types';
// import type { SchemaWrapper } from 'oas/@types/operation/get-parameters-as-json-schema';

import { IndentationText, Project, QuoteKind, ScriptTarget, StructureKind } from 'ts-morph';
import * as ts from 'typescript';
import { compile } from 'json-schema-to-typescript';

import { inspect } from 'util';

declare global {
  interface Console {
    logx: any;
  }
}

console.logx = (obj: any) => {
  console.log(inspect(obj, false, null, true));
};

type ResponseJsonSchema = {
  type: string | string[];
  schema: SchemaObject;
  label: string;
  description?: string;
};

async function convertJSONSchemaToTypescript(schema: JSONSchema, name: string) {
  // Though our JSON Schema type exposes JSONSchema4, which `json-schema-to-typescript`, it won't
  // accept our custom type.
  const interfaceCode = await compile(schema as any, name, {
    bannerComment: '',
  });

  // Because the `name` that we're passing to `json-schema-to-typescript` gets run through some
  // internal logic there and won't always be what we supply it we need to parse the TS that that
  // library creates so we can grab the interface name for use in our own autogenerated code.
  const sourceFile = ts.createSourceFile(`${name}.d.ts`, interfaceCode, ts.ScriptTarget.Latest);

  let typeName;
  await ts.forEachChild(sourceFile, node => {
    if (node.kind === ts.SyntaxKind.EndOfFileToken) {
      return;
    }

    if (ts.isInterfaceDeclaration(node)) {
      // The Node `name` property, an `IdentifierObject`, is not formally exposed in the TS types
      // and there aren't any accessors for this either.
      typeName = node.name.text;
    } else if (ts.isTypeAliasDeclaration(node)) {
      typeName = node.name.text;
    }
  });

  return {
    typeName,
    type: interfaceCode,
  };
}

async function loadOperationsAndMethods(spec: Oas) {
  const operations: Record<
    /* operationId */ string,
    { types: { params: any; responses?: any }; operation: Operation }
  > = {};

  const methods: Record<
    /* method */ string,
    Record</* path */ string, { types: { params: any; responses?: any }; operation: Operation }>
  > = {};

  await Promise.all(
    Object.entries(spec.getPaths()).map(async ([path, ops]) => {
      await Promise.all(
        Object.entries(ops).map(async ([method, operation]) => {
          if (!(method in methods)) {
            methods[method] = {};
          }

          const operationId = operation.getOperationId();

          let params;
          // @todo we should be smarter about how we're compiling json schema for these so we bundle all metadata types together under one `allOf` type -- it's dumb to have 3+ types be present with a union on a single method param
          const paramSchemas = operation.getParametersAsJsonSchema({
            // mergeIntoBodyAndMetadata: true,
            // retainDeprecatedProperties: true,
          });

          if (paramSchemas) {
            params = await Promise.resolve(paramSchemas.map(param => ({ [param.type]: param.schema })))
              .then(res => res.reduce((prev, next) => Object.assign(prev, next)))
              .then(res => {
                return Promise.all(
                  Object.entries(res).map(async ([paramType, schema]) => {
                    // @todo add tests for when schema is `{ type: string }`
                    return {
                      [paramType]: {
                        schema,
                        ts: await convertJSONSchemaToTypescript(
                          schema as JSONSchema,
                          `${operationId}_${paramType}_param`
                        ),
                      },
                    };
                  })
                );
              })
              .then(res => res.reduce((prev, next) => Object.assign(prev, next), {}));
          }

          // @todo what does this do for a spec that has no responses?
          const responses = await Promise.resolve(
            operation
              .getResponseStatusCodes()
              .map(status => {
                const schema = operation.getResponseAsJsonSchema(status);
                if (!schema) {
                  return false;
                }

                return {
                  [status]: schema.shift() as ResponseJsonSchema,
                };
              })
              .reduce((prev, next) => Object.assign(prev, next))
          ).then(res => {
            return Promise.all(
              Object.entries(res as Record<string, ResponseJsonSchema>).map(async ([status, jsonSchema]) => {
                return {
                  [status]: await convertJSONSchemaToTypescript(
                    jsonSchema.schema as JSONSchema,
                    `${operationId}_Response_${status}`
                  ),
                };
              })
            );
          });

          methods[method][path] = { types: { params, responses }, operation };
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

  return [operations, methods];
}

export default async function generator(spec: Oas) {
  const [operations, methods] = await loadOperationsAndMethods(spec);

  // @todo fill this user agent in with something contextual.
  const userAgent = 'api/1.0.0';

  const project = new Project({
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
    compilerOptions: {
      // target: ScriptTarget.ES3,
      outDir: 'dist',
    },
  });

  // project.addSourceFilesAtPaths("src/**/*.ts");
  const sdkSource = project.createSourceFile('src/api/index.ts', 'export default class SDK {}');
  // const myEnumFile = project.createSourceFile("src/api/MyEnum.ts", {
  //     statements: [{
  //         kind: StructureKind.Enum,
  //         name: "MyEnum",
  //         isExported: true,
  //         members: [{ name: "member" }],
  //     }],
  // });

  // get information
  // sdk.getName();          // returns: "MyClass"
  // sdk.hasExportKeyword(); // returns: true
  // sdk.isDefaultExport();  // returns: false

  // manipulate
  // const myInterface = sdkSource.addInterface({
  //   name: 'IMyInterface',
  //   isExported: true,
  //   properties: [
  //     {
  //       name: 'myProp',
  //       type: 'object',
  //     }
  //   ],
  // });

  sdkSource.addImportDeclarations([
    { defaultImport: 'Oas', moduleSpecifier: 'oas' },
    { defaultImport: 'APICore', moduleSpecifier: '@readme/api-core' },
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
    statements: ['this.spec = Oas.init(definition);', `this.core = new APICore(this.spec, '${userAgent}');`],
  });

  Object.entries(operations).forEach(([operationId, data]) => {
    const operation: Operation = data.operation;
    const fetchArgs = [`'${operation.path}'`, `'${operation.method}'`];
    const parameters = [];
    if (data.types.params) {
      if (data.types.params.body || data.types.params.formData) {
        // @todo change this to just look for `body` when https://github.com/readmeio/oas/pull/617 is merged.
        parameters.push({ name: 'body', type: data.types.params.body.ts.typeName });
        fetchArgs.push('body');
        sdkSource.addStatements(data.types.params.body.ts.type);
      }

      if (
        data.types.params.path ||
        data.types.params.query ||
        data.types.params.cookie ||
        data.types.params.header ||
        data.types.params.query
      ) {
        // @todo change this to just look for `metadata` when https://github.com/readmeio/oas/pull/617 is merged.
        parameters.push({ name: 'metadata', type: data.types.params.query.ts.typeName });
        fetchArgs.push('metadata');
        sdkSource.addStatements(data.types.params.query.ts.type);
      }
    }

    const method = sdk.addMethod({
      name: operationId,
      // returnType: "string",
      parameters,
      statements: `return this.core.fetch(${fetchArgs.join(', ')});`,
    });

    const summary = operation.getSummary();
    const description = operation.getDescription();
    if (summary || description) {
      method.addJsDoc(
        [
          summary ? `${summary.replace(/\n/g, '\n * ')}` : '',
          description ? `${description.replace(/\n/g, '\n * ')}` : '',
        ]
          .filter(Boolean)
          .join('\n\n')
      );
    }

    // Add the required types we need for this operation.
    console.logx(data.types);
    console.log('------------------')
  });

  // .addJsDoc('this is a constructor');

  // const result = project.emitToMemory();
  console.log(project.getSourceFiles()[0].getFullText())
  // console.log({ methods })
  // console.log(operations)



//   private authKeys: (number | string)[][] = [];

//   private userAgent = 'autogenSDK/1.0.0';

//   constructor() {
//     this.spec = Oas.init(defintion);

//     // this.spec.api.servers[0].url = '{scheme}://httpbin.org/anything/testing';
//   } */

  // const ast = new ApiGenerator(spec.api as OpenAPIV3.Document).generateApi();
  // const src = cg.printFile(ast);

  // console.log(src)




  // Object.entries(operations).forEach(([op, data]) => {
  //   console.log(op)
  //   console.log(data)
  // });

  // console.log(operations)


  // return operations;
}
