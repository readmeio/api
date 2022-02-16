import type { Operation } from 'oas';
import type { OASDocument } from './types';

import 'isomorphic-fetch';
import fetchHar from 'fetch-har';
import Oas from 'oas';
import oasToHar from '@readme/oas-to-har';
import { parseResponse, prepareAuth, prepareParams, prepareServer } from '@readme/api-core';
import { FormDataEncoder } from 'form-data-encoder';

import Cache from './cache';

import { PACKAGE_NAME, PACKAGE_VERSION } from './packageInfo';

interface ConfigOptions {
  parseResponse: boolean;
}

class Sdk {
  uri: string | OASDocument;

  userAgent: string;

  constructor(uri: string | OASDocument) {
    this.uri = uri;
    this.userAgent = `${PACKAGE_NAME} (node)/${PACKAGE_VERSION}`;
  }

  load() {
    const authKeys: (number | string)[][] = [];
    const cache = new Cache(this.uri);
    const userAgent = this.userAgent;

    let config: ConfigOptions = { parseResponse: true };
    let server:
      | false
      | {
          url: string;
          variables: Record<string, string | number>;
        } = false;

    let isLoaded = false;
    let isCached = cache.isCached();
    let sdk = {};

    function fetchOperation(spec: Oas, operation: Operation, body?: unknown, metadata?: Record<string, unknown>) {
      return prepareParams(operation, body, metadata).then(params => {
        const data = { ...params };

        // If `sdk.server()` has been issued data then we need to do some extra work to figure out
        // how to use that supplied server, and also handle any server variables that were sent
        // alongside it.
        if (server) {
          const preparedServer = prepareServer(spec, server.url, server.variables);
          if (preparedServer) {
            data.server = preparedServer;
          }
        }

        const har = oasToHar(spec, operation, data, prepareAuth(authKeys, operation));

        return fetchHar(har, {
          userAgent,
          files: data.files || {},
          multipartEncoder: FormDataEncoder,
        }).then((res: Response) => {
          if (res.status >= 400 && res.status <= 599) {
            throw res;
          }

          if (config.parseResponse === false) return res;

          return parseResponse(res);
        });
      });
    }

    /**
     * Create dynamic accessors for every HTTP method that the OpenAPI specification supports.
     *
     * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#fixed-fields-7}
     * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#fixed-fields-7}
     * @param spec
     */
    function loadMethods(spec: Oas) {
      return ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']
        .map(httpVerb => {
          return {
            [httpVerb]: ((method: string, path: string, ...args: unknown[]) => {
              // The HTTPMethods enum in `oas` makes working with string methods difficult so we
              // need to cast it as `any` here.
              const operation = spec.operation(path, method as any);
              return fetchOperation(spec, operation, ...args);
            }).bind(null, httpVerb),
          };
        })
        .reduce((prev, next) => Object.assign(prev, next));
    }

    /**
     * Create dynamic accessors for every operation with a defined operation ID. If an operation
     * does not have an operation ID it can be accessed by its `.method('/path')` accessor instead.
     *
     * @param spec
     */
    function loadOperations(spec: Oas) {
      return Object.entries(spec.getPaths())
        .map(([, operations]) => Object.values(operations))
        .reduce((prev, next) => prev.concat(next), [])
        .filter(operation => {
          // `getOperationId()` creates dynamic operation IDs when one isn't available but we need
          // to know here if we actually have one present or not.
          return operation.hasOperationId() ? operation.getOperationId() : false;
        })
        .reduce((prev, next) => {
          return Object.assign(prev, {
            [next.getOperationId()]: ((operation: Operation, ...args: unknown[]) => {
              return fetchOperation(spec, operation, ...args);
            }).bind(null, next),
          });
        }, {});
    }

    async function loadFromCache() {
      let cachedSpec;
      if (isCached) {
        cachedSpec = await cache.get();
      } else {
        cachedSpec = await cache.load();
        isCached = true;
      }

      const spec = new Oas(cachedSpec);

      sdk = Object.assign(sdk, {
        ...loadMethods(spec),
        ...loadOperations(spec),
      });

      isLoaded = true;
    }

    const sdkProxy = {
      // @give this a better type than any
      get(target: any, method: string) {
        // Since auth returns a self-proxy, we **do not** want it to fall through into the async
        // function below as when that'll happen, instead of returning a self-proxy, it'll end up
        // returning a Promise. When that happens, chaining `sdk.auth().operationId()` will fail.
        if (['auth', 'config'].includes(method)) {
          // @todo split this up so we have better types for `auth` and `config`
          return function (...args: any) {
            return target[method].apply(this, args);
          };
        }

        return async function (...args: unknown[]) {
          if (!(method in target)) {
            // If this method doesn't exist on the proxy, have we loaded the SDK? If we have, then
            // this method isn't valid.
            if (isLoaded) {
              throw new Error(`Sorry, \`${method}\` does not appear to be a valid operation on this API.`);
            }

            await loadFromCache();

            // If after loading the SDK and this method still doesn't exist, then it's not real!
            if (!(method in sdk)) {
              throw new Error(`Sorry, \`${method}\` does not appear to be a valid operation on this API.`);
            }

            // @todo give sdk a better type
            return (sdk as any)[method].apply(this, args);
          }

          return target[method].apply(this, args);
        };
      },
    };

    sdk = {
      auth: (...values: string[] | number[]) => {
        authKeys.push(values);
        return new Proxy(sdk, sdkProxy);
      },
      config: (opts: ConfigOptions) => {
        // Downside to having `opts` be merged into the existing `config` is that there isn't a
        // clean way to reset your current config to the default, so having `opts` assigned directly
        // to the existing config should be okay.
        config = opts;
        return new Proxy(sdk, sdkProxy);
      },
      server: (url: string, variables = {}) => {
        server = {
          url,
          variables,
        };
      },
    };

    return new Proxy(sdk, sdkProxy);
  }
}

// Why `export` vs `export default`? If we leave this as `export` then TS will transpile it into
// a `module.exports` export so that when folks load this they don't need to load it as
// `require('api').default`.
export = (uri: string | OASDocument) => {
  return new Sdk(uri).load();
};
