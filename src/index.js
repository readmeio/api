const fetch = require('node-fetch');
const fetchHar = require('fetch-har');
const Oas = require('@readme/oas-tooling');
const oasToHar = require('@readme/oas-to-har');

const Cache = require('./cache');
const { prepareAuth, prepareParams } = require('./lib/index');

global.fetch = fetch;
global.Request = fetch.Request;
global.Headers = fetch.Headers;

console.logx = obj => {
  // eslint-disable-next-line global-require
  console.log(require('util').inspect(obj, false, null, true));
};

class Sdk {
  constructor(uri) {
    this.uri = uri;
  }

  static getOperations(spec) {
    return Object.keys(spec.paths)
      .map(path => {
        return Object.keys(spec.paths[path]).map(method => {
          return spec.operation(path, method);
        });
      })
      .reduce((prev, next) => prev.concat(next), []);
  }

  load() {
    const authKeys = [];
    const cache = new Cache(this.uri);

    let isLoaded = false;
    let isCached = cache.isCached();
    let sdk = {};

    function fetchOperation(spec, operation, body, metadata) {
      const har = oasToHar(spec, operation, prepareParams(operation, body, metadata), prepareAuth(authKeys, operation));

      return fetchHar(har);
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
        .filter(operation => operation.operationId)
        .reduce((prev, next) => {
          return Object.assign(prev, {
            [next.operationId]: ((operation, ...args) => {
              return fetchOperation(spec, operation, ...args);
            }).bind(null, next),
          });
        }, {});
    }

    async function loadFromCache() {
      let cachedSpec;
      if (isCached) {
        // console.logx('🌀 retrieving from cache')
        cachedSpec = await cache.get();
      } else {
        // console.logx('💾 loading and caching')
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
        // console.logx(`📲 calling .${method}`);

        // Since auth returns a self-proxy, we **do not** want it to fall through into the async function below as when
        // that'll happen, instead of returning a self-proxy, it'll end up returning a Promise. When that happens,
        // chaining `sdk.auth().operationId()` will fail.
        if (method === 'auth') {
          return function (...args) {
            return target[method].apply(this, args);
          };
        }

        return async function (...args) {
          // console.logx(`🚨 ${method} was called. is it in the target? ${method in target}`);

          if (!(method in target)) {
            // If this method doesn't exist on the proxy (SDK), have we loaded the SDK? If we have, then this method
            // isn't valid.
            if (isLoaded) {
              throw new Error(`Sorry, \`${method}\` does not appear to be a valid operation on this API.`);
            }

            await loadFromCache();

            // If after loading the SDK this method still doesn't exist, then it's not real!
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
        authKeys.push(values);
        return new Proxy(sdk, sdkProxy);
      },
    };

    return new Proxy(sdk, sdkProxy);
  }
}

module.exports = uri => {
  return new Sdk(uri).load();
};
