/* eslint-disable no-restricted-imports */
/* eslint-disable unicorn/no-useless-spread */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-multi-assign */
/* eslint-disable spaced-comment */
/* eslint-disable unicorn/prefer-type-error */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import type { OpenAPIV3 } from 'openapi-types';
import type { OASDocument } from 'oas/@types/rmoas.types';

import _ from 'lodash';
import ts, { factory } from 'typescript';
import path from 'path';

import * as cg from './tscodegen';

export const verbs = ['GET', 'PUT', 'POST', 'DELETE','OPTIONS', 'HEAD', 'PATCH', 'TRACE'];

type ContentType = 'json' | 'form' | 'multipart';

export const contentTypes: Record<string, ContentType> = {
  '*/*': 'json',
  'application/json': 'json',
  'application/hal+json': 'json',
  'application/x-www-form-urlencoded': 'form',
  'multipart/form-data': 'multipart',
};

/**
 * Get the name of a formatter function for a given parameter.
 */
export function getFormatter({ style, explode }: OpenAPIV3.ParameterObject) {
  if (style === 'spaceDelimited') return 'space';
  if (style === 'pipeDelimited') return 'pipe';
  if (style === 'deepObject') return 'deep';
  return explode ? 'explode' : 'form';
}

export function getOperationIdentifier(id?: string) {
  if (!id) return;
  if (id.match(/[^\w\s]/)) return;
  id = _.camelCase(id);
  if (cg.isValidIdentifier(id)) return id;
}

/**
 * Create a method name for a given operation, either from its operationId or
 * the HTTP verb and path.
 */
export function getOperationName(verb: string, path: string, operationId?: string) {
  const id = getOperationIdentifier(operationId);
  if (id) return id;
  path = path.replace(/\{(.+?)\}/, 'by $1').replace(/\{(.+?)\}/, 'and $1');
  return _.camelCase(`${verb} ${path}`);
}

export function isNullable(schema: any) {
  return !!(schema && schema.nullable);
}

export function isReference(obj: any): obj is OpenAPIV3.ReferenceObject {
  return obj && '$ref' in obj;
}

//See https://swagger.io/docs/specification/using-ref/
export function getReference(spec: any, ref: string) {
  const path = ref
    .slice(2)
    .split('/')
    .map(s => unescape(s.replace(/~1/g, '/').replace(/~0/g, '~')));

  const ret = _.get(spec, path);
  if (typeof ret === 'undefined') {
    throw new Error(`Can't find ${path}`);
  }
  return ret;
}
/**
 * If the given object is a ReferenceObject, return the last part of its path.
 */
export function getReferenceName(obj: any) {
  if (isReference(obj)) {
    return _.camelCase(obj.$ref.split('/').slice(-1)[0]);
  }
}

/**
 * Create a template string literal from the given OpenAPI urlTemplate.
 * Curly braces in the path are turned into identifier expressions,
 * which are read from the local scope during runtime.
 */
export function createUrlExpression(path: string, qs?: ts.Expression) {
  const spans: { expression: ts.Expression; literal: string }[] = [];
  // Use a replacer function to collect spans as a side effect:
  const head = path.replace(/(.*?)\{(.+?)\}(.*?)(?=\{|$)/g, (_substr, head, name, literal) => {
    const expression = _.camelCase(name);
    spans.push({ expression: factory.createIdentifier(expression), literal });
    return head;
  });

  if (qs) {
    // add the query string as last span
    spans.push({ expression: qs, literal: '' });
  }

  return cg.createTemplateString(head, spans);
}

/**
 * Create a call expression for one of the QS runtime functions.
 */
export function callQsFunction(name: string, args: ts.Expression[]) {
  return cg.createCall(factory.createPropertyAccessExpression(factory.createIdentifier('QS'), name), { args });
}

/**
 * Create a call expression for one of the oazapfts runtime functions.
 */
export function callOazapftsFunction(name: string, args: ts.Expression[], typeArgs?: ts.TypeNode[]) {
  return cg.createCall(factory.createPropertyAccessExpression(factory.createIdentifier('oazapfts'), name), {
    args,
    typeArgs,
  });
}

/**
 * Despite its name, OpenApi's `deepObject` serialization does not support
 * deeply nested objects. As a workaround we detect parameters that contain
 * square brackets and merge them into a single object.
 */
export function supportDeepObjects(params: OpenAPIV3.ParameterObject[]) {
  const res: OpenAPIV3.ParameterObject[] = [];
  const merged: any = {};
  params.forEach(p => {
    const m = /^(.+?)\[(.*?)\]/.exec(p.name);
    if (!m) {
      res.push(p);
      return;
    }
    const [, name, prop] = m;
    let obj = merged[name];
    if (!obj) {
      obj = merged[name] = {
        name,
        in: p.in,
        style: 'deepObject',
        schema: {
          type: 'object',
          properties: {},
        },
      };
      res.push(obj);
    }
    obj.schema.properties[prop] = p.schema;
  });

  return res;
}

/**
 * Main entry point that generates TypeScript code from a given API spec.
 */
export default class ApiGenerator {
  public readonly spec: OpenAPIV3.Document;

  constructor(spec: OpenAPIV3.Document) {
    this.spec = spec;
  }

  aliases: ts.TypeAliasDeclaration[] = [];

  // Collect the types of all referenced schemas so we can export them later
  refs: Record<string, ts.TypeReferenceNode> = {};

  // Keep track of already used type aliases
  typeAliases: Record<string, number> = {};

  reset() {
    this.aliases = [];
    this.refs = {};
    this.typeAliases = {};
  }

  resolve<T>(obj: T | OpenAPIV3.ReferenceObject) {
    if (!isReference(obj)) return obj;
    const ref = obj.$ref;
    if (!ref.startsWith('#/')) {
      throw new Error(`External refs are not supported (${ref}). Make sure to call SwaggerParser.bundle() first.`);
    }
    return getReference(this.spec, ref) as T;
  }

  resolveArray<T>(array?: (T | OpenAPIV3.ReferenceObject)[]) {
    return array ? array.map(el => this.resolve(el)) : [];
  }

  getUniqueAlias(name: string) {
    let used = this.typeAliases[name] || 0;
    if (used) {
      this.typeAliases[name] = ++used;
      name += used;
    }
    this.typeAliases[name] = 1;
    return name;
  }

  getRefBasename(ref: string): string {
    return ref.replace(/.+\//, '');
  }

  /**
   * Create a type alias for the schema referenced by the given ReferenceObject
   */
  getRefAlias(obj: OpenAPIV3.ReferenceObject) {
    const { $ref } = obj;
    let ref = this.refs[$ref];
    if (!ref) {
      const schema = this.resolve<OpenAPIV3.SchemaObject>(obj);
      const name = this.getUniqueAlias(_.upperFirst(_.camelCase(schema.title || this.getRefBasename($ref))));

      ref = this.refs[$ref] = factory.createTypeReferenceNode(name, undefined);

      const type = this.getTypeFromSchema(schema);
      this.aliases.push(
        cg.createTypeAliasDeclaration({
          modifiers: [cg.modifier.export],
          name,
          type,
        })
      );
    }
    return ref;
  }

  getUnionType(
    variants: (OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject)[],
    discriminator?: OpenAPIV3.DiscriminatorObject
  ): ts.TypeNode {
    if (discriminator) {
      // oneOf + discriminator -> tagged union (polymorphism)
      if (discriminator.propertyName === undefined) {
        throw new Error('Discriminators require a propertyName');
      }

      // By default, the last component of the ref name (i.e., after the last trailing slash) is
      // used as the discriminator value for each variant. This can be overridden using the
      // discriminator.mapping property.
      const mappedValues = new Set(Object.values(discriminator.mapping || {}).map(ref => this.getRefBasename(ref)));

      return factory.createUnionTypeNode(
        (
          [
            ...Object.entries(discriminator.mapping || {}).map(([discriminatorValue, variantRef]) => [
              discriminatorValue,
              { $ref: variantRef },
            ]),
            ...variants
              .filter(variant => {
                if (!isReference(variant)) {
                  // From the Swagger spec: "When using the discriminator, inline schemas will not be
                  // considered."
                  throw new Error('Discriminators require references, not inline schemas');
                }
                return !mappedValues.has(this.getRefBasename(variant.$ref));
              })
              .map(schema => [this.getRefBasename((schema as OpenAPIV3.ReferenceObject).$ref), schema]),
          ] as [string, OpenAPIV3.ReferenceObject][]
        ).map(([discriminatorValue, variant]) =>
          // Yields: { [discriminator.propertyName]: discriminatorValue } & variant
          factory.createIntersectionTypeNode([
            factory.createTypeLiteralNode([
              cg.createPropertySignature({
                name: discriminator.propertyName,
                type: factory.createLiteralTypeNode(factory.createStringLiteral(discriminatorValue)),
              }),
            ]),
            this.getTypeFromSchema(variant),
          ])
        )
      );
    }

    // oneOf -> untagged union
    return factory.createUnionTypeNode(variants.map(schema => this.getTypeFromSchema(schema)));
  }

  /**
   * Creates a type node from a given schema.
   * Delegates to getBaseTypeFromSchema internally and
   * optionally adds a union with null.
   */
  getTypeFromSchema(schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject): ts.TypeNode {
    const type = this.getBaseTypeFromSchema(schema);
    return isNullable(schema) ? factory.createUnionTypeNode([type, cg.keywordType.null]) : type;
  }

  /**
   * This is the very core of the OpenAPI to TS conversion - it takes a
   * schema and returns the appropriate type.
   */
  getBaseTypeFromSchema(schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject): ts.TypeNode {
    if (!schema) return cg.keywordType.any;
    if (isReference(schema)) {
      return this.getRefAlias(schema);
    }

    if (schema.oneOf) {
      // oneOf -> union
      return this.getUnionType(schema.oneOf, schema.discriminator);
    }

    if (schema.anyOf) {
      // anyOf -> union
      return factory.createUnionTypeNode(schema.anyOf.map(schema => this.getTypeFromSchema(schema)));
    }

    if (schema.allOf) {
      // allOf -> intersection
      return factory.createIntersectionTypeNode(schema.allOf.map(schema => this.getTypeFromSchema(schema)));
    }

    if ('items' in schema) {
      // items -> array
      return factory.createArrayTypeNode(this.getTypeFromSchema(schema.items));
    }

    if (schema.properties || schema.additionalProperties) {
      // properties -> literal type
      return this.getTypeFromProperties(schema.properties || {}, schema.required, schema.additionalProperties);
    }

    if (schema.enum) {
      // enum -> union of literal types
      const types = schema.enum.map(s => {
        if (s === null) return cg.keywordType.null;
        if (typeof s === 'boolean') {
          return s
            ? factory.createLiteralTypeNode(ts.factory.createToken(ts.SyntaxKind.TrueKeyword))
            : factory.createLiteralTypeNode(ts.factory.createToken(ts.SyntaxKind.FalseKeyword));
        }
        if (typeof s === 'number') {
          return factory.createLiteralTypeNode(factory.createNumericLiteral(s));
        }
        return factory.createLiteralTypeNode(factory.createStringLiteral(s));
      });
      return types.length > 1 ? factory.createUnionTypeNode(types) : types[0];
    }

    if (schema.format == 'binary') {
      return factory.createTypeReferenceNode('Blob', []);
    }

    if (schema.type) {
      // string, boolean, null, number
      if (schema.type in cg.keywordType) return cg.keywordType[schema.type];
      if (schema.type === 'integer') return cg.keywordType.number;
    }

    return cg.keywordType.any;
  }

  /**
   * Recursively creates a type literal with the given props.
   */
  getTypeFromProperties(
    props: {
      [prop: string]: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
    },
    required?: string[],
    additionalProperties?: boolean | OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  ) {
    const members: ts.TypeElement[] = Object.keys(props).map(name => {
      const schema = props[name];
      const isRequired = required && required.includes(name);
      return cg.createPropertySignature({
        questionToken: !isRequired,
        name,
        type: this.getTypeFromSchema(schema),
      });
    });

    if (additionalProperties) {
      const type = additionalProperties === true ? cg.keywordType.any : this.getTypeFromSchema(additionalProperties);

      members.push(cg.createIndexSignature(type));
    }

    return factory.createTypeLiteralNode(members);
  }

  getTypeFromResponses(responses: OpenAPIV3.ResponsesObject) {
    return factory.createUnionTypeNode(
      Object.entries(responses).map(([code, res]) => {
        const statusType =
          code === 'default'
            ? cg.keywordType.number
            : factory.createLiteralTypeNode(factory.createNumericLiteral(code));

        const props = [
          cg.createPropertySignature({
            name: 'status',
            type: statusType,
          }),
        ];

        const dataType = this.getTypeFromResponse(res);
        if (dataType !== cg.keywordType.void) {
          props.push(
            cg.createPropertySignature({
              name: 'data',
              type: dataType,
            })
          );
        }
        return factory.createTypeLiteralNode(props);
      })
    );
  }

  getTypeFromResponse(resOrRef: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject) {
    const res = this.resolve(resOrRef);
    if (!res || !res.content) return cg.keywordType.void;
    return this.getTypeFromSchema(this.getSchemaFromContent(res.content));
  }

  getResponseType(responses?: OpenAPIV3.ResponsesObject): 'json' | 'text' | 'blob' {
    // backwards-compatibility
    if (!responses) return 'text';

    const resolvedResponses = Object.values(responses).map(response => this.resolve(response));

    // if no content is specified, assume `text` (backwards-compatibility)
    if (!resolvedResponses.some(res => Object.keys(res.content ?? []).length > 0)) {
      return 'text';
    }

    const isJson = resolvedResponses.some(response => {
      const responseMimeTypes = Object.keys(response.content ?? {});
      return responseMimeTypes.some(mimeType => contentTypes[mimeType] === 'json');
    });

    // if there’s `application/json` or `*/*`, assume `json`
    if (isJson) {
      return 'json';
    }

    // if there’s `text/*`, assume `text`
    if (resolvedResponses.some(res => Object.keys(res.content ?? []).some(type => type.startsWith('text/')))) {
      return 'text';
    }

    // for the rest, assume `blob`
    return 'blob';
  }

  getSchemaFromContent(content: any) {
    const contentType = Object.keys(contentTypes).find(t => t in content);
    let schema;
    if (contentType) {
      schema = _.get(content, [contentType, 'schema']);
    }
    if (schema) {
      return schema;
    }

    // if no content is specified -> string
    // `text/*` -> string
    if (Object.keys(content).length === 0 || Object.keys(content).some(type => type.startsWith('text/'))) {
      return { type: 'string' };
    }

    // rest (e.g. `application/octet-stream`, `application/gzip`, …) -> binary
    return { type: 'string', format: 'binary' };
  }

  wrapResult(ex: ts.Expression) {
    return ex;
    // return this.opts?.optimistic ? callOazapftsFunction('ok', [ex]) : ex;
  }

  generateApi() {
    this.reset();

    // Parse ApiStub.ts so that we don't have to generate everything manually
    const stub = cg.parseFile(path.resolve(__dirname, './ApiStub.ts'));

    // ApiStub contains `const servers = {}`, find it ...
    // const servers = cg.findFirstVariableDeclaration(stub.statements, 'servers');
    // servers.initializer is readonly, this might break in a future TS version, but works fine for now.
    // Object.assign(servers, {
    //   initializer: generateServers(this.spec.servers || []),
    // });

    const { initializer } = cg.findFirstVariableDeclaration(stub.statements, 'defaults');
    if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
      throw new Error('No object literal: defaults');
    }

    // cg.changePropertyValue(
    //   initializer,
    //   'baseUrl',
    //   defaultBaseUrl(this.spec.servers || []),
    // );

    // Collect class functions to be added...
    const functions: ts.FunctionDeclaration[] = [];

    // Keep track of names to detect duplicates
    const names: Record<string, number> = {};

    Object.keys(this.spec.paths).forEach(path => {
      const item = this.spec.paths[path];

      if (!item) {
        return;
      }

      Object.keys(this.resolve(item)).forEach(verb => {
        const method = verb.toUpperCase();
        // skip summary/description/parameters etc...
        if (!verbs.includes(method)) return;

        const op: OpenAPIV3.OperationObject = (item as any)[verb];
        const {
          operationId,
          requestBody,
          responses,
          summary,
          description,
          // tags,
        } = op;

        let name = getOperationName(verb, path, operationId);
        const count = (names[name] = (names[name] || 0) + 1);
        if (count > 1) {
          // The name is already taken, which means that the spec is probably
          // invalid as operationIds must be unique. Since this is quite common
          // nevertheless we append a counter:
          name += count;
        }

        // merge item and op parameters
        const resolvedParameters = [...this.resolveArray(item.parameters), ...this.resolveArray(op.parameters)];

        // expand older OpenAPI parameters into deepObject style where needed
        // const parameters = this.isConverted ? supportDeepObjects(resolvedParameters) : resolvedParameters;
        const parameters = resolvedParameters;

        // split into required/optional
        const [required, optional] = _.partition(parameters, 'required');

        // convert parameter names to argument names ...
        const argNames: any = {};
        parameters
          .map(p => p.name)
          .sort((a, b) => a.length - b.length)
          .forEach(name => {
            argNames[name] = _.camelCase(name);
          });

        // build the method signature - first all the required parameters
        const methodParams = required.map(p =>
          cg.createParameter(argNames[this.resolve(p).name], {
            type: this.getTypeFromSchema(isReference(p) ? p : p.schema),
          })
        );

        let body: any;
        let bodyVar;

        // add body if present
        if (requestBody) {
          body = this.resolve(requestBody);
          const schema = this.getSchemaFromContent(body.content);
          const type = this.getTypeFromSchema(schema);
          bodyVar = _.camelCase((type as any).name || getReferenceName(schema) || 'body');
          methodParams.push(
            cg.createParameter(bodyVar, {
              type,
              questionToken: !body.required,
            })
          );
        }

        // add an object with all optional parameters
        if (optional.length) {
          methodParams.push(
            cg.createParameter(
              cg.createObjectBinding(
                optional.map(param => this.resolve(param)).map(({ name }) => ({ name: argNames[name] }))
              ),
              {
                initializer: factory.createObjectLiteralExpression(),
                type: factory.createTypeLiteralNode(
                  optional.map(p =>
                    cg.createPropertySignature({
                      name: argNames[this.resolve(p).name],
                      questionToken: true,
                      type: this.getTypeFromSchema(isReference(p) ? p : p.schema),
                    })
                  )
                ),
              }
            )
          );
        }

        methodParams.push(
          cg.createParameter('opts', {
            type: factory.createTypeReferenceNode('Oazapfts.RequestOpts', undefined),
            questionToken: true,
          })
        );

        // Next, build the method body...

        const returnType = this.getResponseType(responses);
        const query = parameters.filter(p => p.in === 'query');
        const header = parameters.filter(p => p.in === 'header').map(p => p.name);
        let qs;
        if (query.length) {
          const paramsByFormatter = _.groupBy(query, getFormatter);
          qs = callQsFunction(
            'query',
            Object.entries(paramsByFormatter).map(([format, params]) => {
              //const [allowReserved, encodeReserved] = _.partition(params, "allowReserved");
              return callQsFunction(format, [cg.createObjectLiteral(params.map(p => [p.name, argNames[p.name]]))]);
            })
          );
        }

        const url = createUrlExpression(path, qs);
        const init: ts.ObjectLiteralElementLike[] = [factory.createSpreadAssignment(factory.createIdentifier('opts'))];

        if (method !== 'GET') {
          init.push(factory.createPropertyAssignment('method', factory.createStringLiteral(method)));
        }

        if (bodyVar) {
          init.push(cg.createPropertyAssignment('body', factory.createIdentifier(bodyVar)));
        }

        if (header.length) {
          init.push(
            factory.createPropertyAssignment(
              'headers',
              factory.createObjectLiteralExpression(
                [
                  factory.createSpreadAssignment(
                    factory.createLogicalAnd(
                      factory.createIdentifier('opts'),
                      factory.createPropertyAccessExpression(factory.createIdentifier('opts'), 'headers')
                    )
                  ),
                  ...header.map(name => cg.createPropertyAssignment(name, factory.createIdentifier(argNames[name]))),
                ],
                true
              )
            )
          );
        }

        const args: ts.Expression[] = [url];

        if (init.length) {
          const m = Object.entries(contentTypes).find(([type]) => {
            return !!_.get(body, ['content', type]);
          });
          const initObj = factory.createObjectLiteralExpression(init, true);
          args.push(m ? callOazapftsFunction(m[1], [initObj]) : initObj); // json, form, multipart
        }

        functions.push(
          cg.addComment(
            cg.createFunctionDeclaration(
              name,
              {
                modifiers: [cg.modifier.export],
              },
              methodParams,
              cg.block(
                factory.createReturnStatement(
                  this.wrapResult(
                    callOazapftsFunction(
                      {
                        json: 'fetchJson',
                        text: 'fetchText',
                        blob: 'fetchBlob',
                      }[returnType],
                      args,
                      returnType === 'json' || returnType === 'blob'
                        ? [this.getTypeFromResponses(responses!) || ts.SyntaxKind.AnyKeyword]
                        : undefined
                    )
                  )
                )
              )
            ),
            summary || description
          )
        );
      });
    });

    Object.assign(stub, {
      statements: cg.appendNodes(stub.statements, ...[...this.aliases, ...functions]),
    });

    return stub;
  }
}
