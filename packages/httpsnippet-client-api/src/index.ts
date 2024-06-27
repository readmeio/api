import type { ReducedHelperObject } from '@readme/httpsnippet/helpers/reducer';
import type { Client, ClientPlugin } from '@readme/httpsnippet/targets';
import type { Operation } from 'oas/operation';
import type { HttpMethods, OASDocument } from 'oas/types';

import { CodeBuilder } from '@readme/httpsnippet/helpers/code-builder';
import camelCase from 'camelcase'; // eslint-disable-line import/no-extraneous-dependencies
import contentType from 'content-type';
import Oas from 'oas';
import { matchesMimeType } from 'oas/utils';
import { isReservedOrBuiltinsLC } from 'reserved2';
import stringifyObject from 'stringify-object'; // eslint-disable-line import/no-extraneous-dependencies

/**
 * @note This regex also exists in `api/fetcher`.
 *
 * @example @petstore/v1.0#n6kvf10vakpemvplx
 * @example @petstore#n6kvf10vakpemvplx
 */
const registryUUIDRegex = /^@(?<project>[a-zA-Z0-9-_]+)(\/?(?<version>.+))?#(?<uuid>[a-z0-9]+)$/;

/**
 * @note This function also exists in `api/fetcher`.
 */
function getProjectPrefixFromRegistryUUID(uri: string) {
  const matches = uri.match(registryUUIDRegex);
  if (!matches) {
    return undefined;
  }

  return matches.groups?.project;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringify(obj: any, opts = {}) {
  return stringifyObject(obj, { indent: '  ', ...opts });
}

function buildAuthSnippet(sdkVariable: string, authKey: string[] | string) {
  // Auth key will be an array for Basic auth cases.
  if (Array.isArray(authKey)) {
    const auth: string[] = [];
    authKey.forEach((token, i) => {
      // If the token part is the last part of the key and it's empty, don't add it to the snippet.
      if (token.length === 0 && authKey.length > 1 && i === authKey.length - 1) {
        return;
      }

      auth.push(`'${token.replace(/'/g, "\\'")}'`);
    });

    return `${sdkVariable}.auth(${auth.join(', ')});`;
  }

  return `${sdkVariable}.auth('${authKey.replace(/'/g, "\\'")}');`;
}

function getAuthSources(operation: Operation) {
  const matchers: { cookie: string[]; header: Record<string, string>; query: string[] } = {
    header: {},
    query: [],
    cookie: [],
  };

  if (operation.getSecurity().length === 0) {
    return matchers;
  }

  Object.entries(operation.prepareSecurity()).forEach(([, schemes]) => {
    schemes.forEach(scheme => {
      if (scheme.type === 'http') {
        if (scheme.scheme === 'basic') {
          matchers.header.authorization = 'Basic';
        } else if (scheme.scheme === 'bearer') {
          matchers.header.authorization = 'Bearer';
        }
      } else if (scheme.type === 'oauth2') {
        matchers.header.authorization = 'Bearer';
      } else if (scheme.type === 'apiKey') {
        if (scheme.in === 'query') {
          matchers.query.push(scheme.name);
        } else if (scheme.in === 'header') {
          // The way that this asterisk header matcher works is that since this `apiKey` goes in a
          // named header (`scheme.name`) because the header is the key, we're matching against the
          // entire header -- counter to the way that the HTTP basic matcher above works where we
          // match and extract the API key from everything after `Basic ` in the `Authorization`
          // header.
          matchers.header[scheme.name.toLowerCase()] = '*';
        } else if (scheme.in === 'cookie') {
          matchers.cookie.push(scheme.name);
        }
      }
    });
  });

  return matchers;
}

interface APIOptions {
  api?: {
    definition: OASDocument;

    /**
     * The string to identify this SDK as. This is used in the `import sdk from '<identifier>'`
     * sample as well as the the variable name we attach the SDK to.
     *
     * @example `@api/developers`
     */
    identifier?: string;

    /**
     * The URI that is used to download this API definition from `npx api install`.
     *
     * @example `@developers/v2.0#17273l2glm9fq4l5`
     */
    registryURI: string;
  };
  escapeBrackets?: boolean;
  indent?: string | false;
}

const client: Client<APIOptions> = {
  info: {
    key: 'api',
    title: 'API',
    link: 'https://npm.im/api',
    description: 'Automatic SDK generation from an OpenAPI definition.',
    extname: '.js',
    installation: 'npx api install "{packageName}"',
  },
  convert: ({ cookiesObj, headersObj, postData, queryObj, url, ...source }, options) => {
    const opts = {
      ...options,
    };

    if (!opts?.api) {
      throw new Error('This HTTPSnippet client must have an `api` config supplied to it.');
    } else if (!opts?.api?.definition) {
      throw new Error('This HTTPSnippet client must have an `api.definition` option supplied to it.');
    } else if (!opts?.api?.registryURI) {
      throw new Error('This HTTPSnippet client must have an `api.registryURI` option supplied to it.');
    }

    const method = source.method.toLowerCase() as HttpMethods;
    const oas = new Oas(opts.api.definition);
    const apiDefinition = oas.getDefinition();
    const foundOperation = oas.findOperation(url, method);
    if (!foundOperation) {
      throw new Error(
        `Unable to locate a matching operation in the supplied \`api.definition\` for: ${source.method} ${url}`,
      );
    }

    let sdkPackageName: string | undefined;
    let sdkVariable: string;
    if (opts.api.identifier) {
      sdkPackageName = opts.api.identifier;

      sdkVariable = camelCase(opts.api.identifier);
      if (isReservedOrBuiltinsLC(sdkVariable)) {
        // If this identifier is a reserved JS word then we should prefix it with an underscore so
        // this snippet can be valid code.
        sdkVariable = `_${sdkVariable}`;
      }
    } else {
      sdkPackageName = getProjectPrefixFromRegistryUUID(opts.api.registryURI);
      sdkVariable = camelCase(sdkPackageName || 'sdk');
    }

    const operationSlugs = foundOperation.url.slugs;
    const operation = oas.operation(foundOperation.url.nonNormalizedPath, method);
    const operationPathParameters = operation.getParameters().filter(param => param.in === 'path');
    const path = operation.path;
    const authData: string[] = [];
    const authSources = getAuthSources(operation);

    const { blank, push, join } = new CodeBuilder({ indent: opts.indent || '  ' });

    push(`import ${sdkVariable} from '@api/${sdkPackageName}';`);
    blank();

    // If we have multiple servers configured and our source URL differs from the stock URL that we
    // receive from our `oas` library then the URL either has server variables contained in it (that
    // don't match the defaults), or the OAS offers alternate server URLs and we should expose that
    // in the generated snippet.
    const configData = [];
    if ((apiDefinition.servers || []).length > 1) {
      const stockUrl = oas.url();
      const baseUrl = url.replace(path, '');
      if (baseUrl !== stockUrl) {
        const serverVars = oas.splitVariables(baseUrl);
        const serverUrl = serverVars ? oas.url(serverVars.selected, serverVars.variables) : baseUrl;

        configData.push(`${sdkVariable}.server('${serverUrl}');`);
      }
    }

    let metadata: Record<string, string[] | string> = {};
    Object.keys(queryObj).forEach(param => {
      if (authSources.query.includes(param)) {
        authData.push(buildAuthSnippet(sdkVariable, queryObj[param]));

        // If this query param is part of an auth source then we don't want it doubled up in the
        // snippet.
        return;
      }

      metadata[param] = queryObj[param];
    });

    Object.keys(cookiesObj).forEach(cookie => {
      if (authSources.cookie.includes(cookie)) {
        authData.push(buildAuthSnippet(sdkVariable, cookiesObj[cookie]));

        // If this cookie is part of an auth source then we don't want it doubled up.
        return;
      }

      // Note that we may have the potential to overlap any cookie that also shares the name as
      // another metadata parameter. This problem is currently inherent to `api` and not this
      // snippet generator.
      metadata[cookie] = cookiesObj[cookie];
    });

    // If we have path parameters present we should add them into the metadata object.
    Array.from(Object.entries(operationSlugs)).forEach(([param, value]) => {
      // The keys in `operationSlugs` will always be prefixed with a `:` in the `oas` library so
      // we can safely do this substring here without asserting this context.
      const cleanedParam = param.substring(1);

      // If our incoming path slug out of `oas.findOperation()` has been sanitized and is missing
      // a hyphen, but there is a parameter in the OpenAPI definition that matches what our
      // hyphen-less slug is then we should use that for the snippet.
      const unsanitizedParam = operationPathParameters.find(p => {
        return p.name.includes('-') && p.name.replace(/-/g, '') === cleanedParam ? p.name : false;
      });

      if (unsanitizedParam) {
        metadata[unsanitizedParam.name] = value;
      } else {
        metadata[cleanedParam] = value;
      }
    });

    if (Object.keys(headersObj).length) {
      const headers = headersObj;
      const requestHeaders: ReducedHelperObject = {};

      Object.keys(headers).forEach(header => {
        // Headers in HTTPSnippet are case-insensitive so we need to add in some special handling to
        // make sure we're able to match them properly.
        const headerLower = header.toLowerCase();

        if (headerLower in authSources.header) {
          // If this header has been set up as an authentication header, let's remove it and add it
          // into our auth data so we can build up an `.auth()` snippet for the SDK.
          const authScheme = authSources.header[headerLower];
          if (authScheme === '*') {
            authData.push(buildAuthSnippet(sdkVariable, headers[header]));
          } else {
            // @ts-expect-error `headers[header]` is typed improperly in HTTPSnippet.
            let authKey = headers[header].replace(`${authSources.header[headerLower]} `, '');
            if (authScheme.toLowerCase() === 'basic') {
              authKey = Buffer.from(authKey, 'base64').toString('ascii');
              authKey = authKey.split(':');
            }

            authData.push(buildAuthSnippet(sdkVariable, authKey));
          }

          delete headers[header];
          return;
        } else if (headerLower === 'content-type') {
          // `Content-Type` headers are automatically added within the SDK so we can filter them out
          // if they don't have parameters attached to them.
          // @ts-expect-error `headers[header]` is typed improperly in HTTPSnippet.
          const parsedContentType = contentType.parse(headers[header]);
          if (!Object.keys(parsedContentType.parameters).length) {
            delete headers[header];
            return;
          }
        } else if (headerLower === 'accept') {
          // If the `Accept` header here is JSON-like header then we can remove it from the code
          // snippet because `api` natively supports and prioritizes JSON over any other mime type.
          if (matchesMimeType.json(headers[header] as string)) {
            delete headers[header];
            return;
          }
        }

        // If we haven't used our header anywhere else, or we've deleted it from the payload
        // because it'll be handled internally by `api` then we should add it into our code snippet.
        if (['accept', 'content-type'].includes(headerLower)) {
          requestHeaders[headerLower] = headers[header];
        } else {
          // Non-reserved headers retain their casing because we want to generate a snippet that
          // matches the TS types that are created during codegeneration.
          requestHeaders[header] = headers[header];
        }
      });

      if (Object.keys(requestHeaders).length > 0) {
        metadata = Object.assign(metadata, requestHeaders);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any;
    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        body = postData.paramsObj;
        break;

      case 'application/json':
        if (postData.jsonObj) {
          body = postData.jsonObj;
        }
        break;

      case 'multipart/form-data':
        if (postData.params) {
          body = {};

          // If there's a `Content-Type` header present in the metadata, but it's for the
          // `multipart/form-data` request then dump it off the snippet. We shouldn't offload that
          // unnecessary bloat of multipart boundaries to the user, instead letting the SDK handle it
          // automatically.
          if ('content-type' in metadata && metadata['content-type'].indexOf('multipart/form-data') === 0) {
            delete metadata['content-type'];
          }

          postData.params.forEach(param => {
            if (param.fileName) {
              body[param.name] = param.fileName;
            } else {
              body[param.name] = param.value;
            }
          });
        }
        break;

      default:
        if (postData.text) {
          body = postData.text;
        }
    }

    const args = [];

    const accessor = operation.getOperationId({ camelCase: true });

    // If we're going to be rendering out body params and metadata we should cut their character
    // limit in half because we'll be rendering them in their own lines.
    const inlineCharacterLimit = typeof body !== 'undefined' && Object.keys(metadata).length > 0 ? 40 : 80;
    if (typeof body !== 'undefined') {
      args.push(stringify(body, { inlineCharacterLimit }));
    }

    if (Object.keys(metadata).length > 0) {
      args.push(stringify(metadata, { inlineCharacterLimit }));
    }

    if (authData.length) {
      push(authData.join('\n'));
    }

    if (configData.length) {
      push(configData.join('\n'));
    }

    push(`${sdkVariable}.${accessor}(${args.join(', ')})`);
    push('.then(({ data }) => console.log(data))', 1);
    push('.catch(err => console.error(err));', 1);

    return join();
  },
};

const plugin: ClientPlugin<APIOptions> = {
  target: 'node',
  client,
};

export default plugin;
