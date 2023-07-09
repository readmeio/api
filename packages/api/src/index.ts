import type { ConfigOptions } from './core';
import type { Operation } from 'oas';
import type { OASDocument } from 'oas/dist/rmoas.types';

import Oas from 'oas';

import Cache from './cache';
import APICore from './core';
import { PACKAGE_NAME, PACKAGE_VERSION } from './packageInfo';

interface SDKOptions {
  cacheDir?: string;
}

class Sdk {
  uri: string | OASDocument;

  userAgent: string;

  cacheDir: string | false;

  constructor(uri: string | OASDocument, opts: SDKOptions = {}) {
    this.uri = uri;
    this.userAgent = `${PACKAGE_NAME} (node)/${PACKAGE_VERSION}`;

    this.cacheDir = opts.cacheDir ? opts.cacheDir : false;
  }

  load() {
    const cache = new Cache(this.uri, this.cacheDir);
    const userAgent = this.userAgent;

    const core = new APICore();
    core.setUserAgent(userAgent);

    let isLoaded = false;
    let isCached = cache.isCached();
    let sdk = {};

    /**
     * Create dynamic accessors for every operation with a defined operation ID. If an operation
     * does not have an operation ID it can be accessed by its `.method('/path')` accessor instead.
     *
     */
    function loadOperations(spec: Oas) {
      return Object.entries(spec.getPaths())
        .map(([, operations]) => Object.values(operations))
        .reduce((prev, next) => prev.concat(next), [])
        .reduce((prev, next) => {
          // `getOperationId()` creates dynamic operation IDs when one isn't available but we need
          // to know here if we actually have one present or not. The `camelCase` option here also
          // cleans up any `operationId` that we might have into something that can be used as a
          // valid JS method.
          const originalOperationId = next.getOperationId();
          const operationId = next.getOperationId({ camelCase: true });

          const op = {
            [operationId]: ((operation: Operation, ...args: unknown[]) => {
              return core.fetchOperation(operation, ...args);
            }).bind(null, next),
          };

          if (operationId !== originalOperationId) {
            // If we cleaned up their operation ID into a friendly method accessor (`findPetById`
            // versus `find pet by id`) we should still let them use the non-friendly version if
            // they want.
            //
            // This work is to maintain backwards compatibility with `api@4` and does not exist
            // within our code generated SDKs -- those only allow the cleaner camelCase
            // `operationId` to be used.
            op[originalOperationId] = ((operation: Operation, ...args: unknown[]) => {
              return core.fetchOperation(operation, ...args);
            }).bind(null, next);
          }

          return Object.assign(prev, op);
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

      core.setSpec(spec);

      sdk = Object.assign(sdk, loadOperations(spec));
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
          return function authAndConfigHandler(...args: any) {
            return target[method].apply(this, args);
          };
        }

        return async function accessorHandler(...args: unknown[]) {
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
      /**
       * If the API you're using requires authentication you can supply the required credentials
       * through this method and the library will magically determine how they should be used
       * within your API request.
       *
       * With the exception of OpenID and MutualTLS, it supports all forms of authentication
       * supported by the OpenAPI specification.
       *
       * @example <caption>HTTP Basic auth</caption>
       * sdk.auth('username', 'password');
       *
       * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
       * sdk.auth('myBearerToken');
       *
       * @example <caption>API Keys</caption>
       * sdk.auth('myApiKey');
       *
       * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
       * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
       * @param values Your auth credentials for the API. Can specify up to two strings or numbers.
       */
      auth: (...values: string[] | number[]) => {
        core.setAuth(...values);
      },

      /**
       * Optionally configure various options that the SDK allows.
       *
       * @param config Object of supported SDK options and toggles.
       * @param config.timeout Override the default `fetch` request timeout of 30 seconds (30000ms).
       */
      config: (config: ConfigOptions) => {
        core.setConfig(config);
      },

      /**
       * If the API you're using offers alternate server URLs, and server variables, you can tell
       * the SDK which one to use with this method. To use it you can supply either one of the
       * server URLs that are contained within the OpenAPI definition (along with any server
       * variables), or you can pass it a fully qualified URL to use (that may or may not exist
       * within the OpenAPI definition).
       *
       * @example <caption>Server URL with server variables</caption>
       * sdk.server('https://{region}.api.example.com/{basePath}', {
       *   name: 'eu',
       *   basePath: 'v14',
       * });
       *
       * @example <caption>Fully qualified server URL</caption>
       * sdk.server('https://eu.api.example.com/v14');
       *
       * @param url Server URL
       * @param variables An object of variables to replace into the server URL.
       */
      server: (url: string, variables = {}) => {
        core.setServer(url, variables);
      },
    };

    return new Proxy(sdk, sdkProxy);
  }
}

// Why `export` vs `export default`? If we leave this as `export` then TS will transpile it into
// a `module.exports` export so that when folks load this they don't need to load it as
// `require('api').default`.
export = (uri: string | OASDocument, opts: SDKOptions = {}) => {
  return new Sdk(uri, opts).load();
};
