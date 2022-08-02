const fetch = require('node-fetch');
const fetchHar = require('fetch-har');
const Oas = require('oas').default;
const oasToHar = require('@readme/oas-to-har');
const pkg = require('../package.json');

const Cache = require('./cache');
const { parseResponse, prepareAuth, prepareParams, prepareServer } = require('./lib');

global.fetch = fetch;
global.Request = fetch.Request;
global.Headers = fetch.Headers;
global.FormData = require('form-data');

class Sdk {
  constructor(uri, opts = {}) {
    this.uri = uri;
    this.userAgent = `${pkg.name} (node)/${pkg.version}`;

    this.cacheDir = opts.cacheDir ? opts.cacheDir : false;
  }

  load() {
    let authKeys = [];
    const cache = new Cache(this.uri, this.cacheDir);
    const self = this;
    let config = { parseResponse: true };
    let server = false;

    let isLoaded = false;
    let isCached = cache.isCached();
    let sdk = {};

    function fetchOperation(spec, operation, body, metadata) {
      return new Promise(resolve => {
        resolve(prepareParams(operation, body, metadata));
      }).then(params => {
        const data = { ...params };

        // If `sdk.server()` has been issued data then we need to do some extra work to figure out how to use that
        // supplied server, and also handle any server variables that were sent alongside it.
        if (server) {
          const preparedServer = prepareServer(spec, server.url, server.variables);
          if (preparedServer) {
            data.server = preparedServer;
          }
        }

        const har = oasToHar(spec, operation, data, prepareAuth(authKeys, operation));

        return fetchHar(har, self.userAgent).then(res => {
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
     */
    function loadMethods(spec) {
      const supportedVerbs = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

      return supportedVerbs
        .map(httpVerb => {
          return {
            [httpVerb]: ((method, path, ...args) => {
              const operation = spec.operation(path, method);
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
    function loadOperations(spec) {
      return Object.entries(spec.getPaths())
        .map(([, operations]) => Object.values(operations))
        .reduce((prev, next) => prev.concat(next), [])
        .filter(operation => operation.hasOperationId())
        .reduce((prev, next) => {
          // `getOperationId()` creates dynamic operation IDs when one isn't available but we need
          // to know here if we actually have one present or not. The `camelCase` option here also
          // cleans up any `operationId` that we might have into something that can be used as a
          // valid JS method.
          const operationId = next.getOperationId({ camelCase: true });
          const originalOperationId = next.getOperationId();

          const op = {
            [operationId]: ((operation, ...args) => {
              return fetchOperation(spec, operation, ...args);
            }).bind(null, next),
          };

          if (operationId !== originalOperationId) {
            // If we cleaned up their operation ID into a friendly method accessor (`findPetById`
            // versus `find pet by id`) we should still let them use the non-friendly version if
            // they want.
            op[originalOperationId] = ((operation, ...args) => {
              return fetchOperation(spec, operation, ...args);
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

      sdk = Object.assign(sdk, {
        ...loadMethods(spec),
        ...loadOperations(spec),
      });

      isLoaded = true;
    }

    const sdkProxy = {
      get(target, method) {
        // Since auth returns a self-proxy, we **do not** want it to fall through into the async function below as when
        // that'll happen, instead of returning a self-proxy, it'll end up returning a Promise. When that happens,
        // chaining `sdk.auth().operationId()` will fail.
        if (['auth', 'config'].includes(method)) {
          return function (...args) {
            return target[method].apply(this, args);
          };
        }

        return async function (...args) {
          if (!(method in target)) {
            // If this method doesn't exist on the proxy (SDK), have we loaded the SDK? If we have, then this method
            // isn't valid.
            if (isLoaded) {
              throw new Error(`Sorry, \`${method}\` does not appear to be a valid operation on this API.`);
            }

            await loadFromCache();

            // If after loading the SDK and this method still doesn't exist, then it's not real!
            if (!(method in sdk)) {
              throw new Error(`Sorry, \`${method}\` does not appear to be a valid operation on this API.`);
            }

            return sdk[method].apply(this, args);
          }

          return target[method].apply(this, args);
        };
      },
    };

    sdk = {
      auth: (...values) => {
        authKeys = values;
      },
      config: opts => {
        // Downside to having `opts` be merged into the existing `config` is that there isn't a clean way to reset your
        // current config to the default, so having `opts` assigned directly to the existing config should be okay.
        config = opts;
        return new Proxy(sdk, sdkProxy);
      },
      server: (url, variables = {}) => {
        server = {
          url,
          variables,
        };
      },
    };

    return new Proxy(sdk, sdkProxy);
  }
}

module.exports = (uri, opts = {}) => {
  return new Sdk(uri, opts).load();
};
