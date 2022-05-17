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

  static getOperations(spec) {
    return Object.keys(spec.api.paths)
      .map(path => {
        return Object.keys(spec.api.paths[path]).map(method => {
          return spec.operation(path, method);
        });
      })
      .reduce((prev, next) => prev.concat(next), []);
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

    function loadMethods(spec) {
      const supportedVerbs = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

      return supportedVerbs
        .map(name => {
          return {
            [name]: ((method, path, ...args) => {
              const operation = spec.operation(path, method);
              return fetchOperation(spec, operation, ...args);
            }).bind(null, name),
          };
        })
        .reduce((prev, next) => Object.assign(prev, next));
    }

    function loadOperations(spec) {
      return Sdk.getOperations(spec)
        .filter(operation => operation.schema.operationId)
        .reduce((prev, next) => {
          return Object.assign(prev, {
            [next.schema.operationId]: ((operation, ...args) => {
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
