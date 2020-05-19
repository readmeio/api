const fetch = require('node-fetch');
const fetchHar = require('fetch-har');
const Oas = require('@readme/oas-tooling');
const oasToHar = require('@readme/oas-to-har');

const SdkCache = require('./cache');
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
    this.supportedVerbs = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
    this.spec = new Oas(new SdkCache(uri).load());
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
    const { spec } = this;
    const authKeys = [];

    function auth(...values) {
      authKeys.push(values);
      return this;
    }

    function fetchOperation(operation, body, metadata) {
      const har = oasToHar(spec, operation, prepareParams(operation, body, metadata), prepareAuth(authKeys, operation));

      return fetchHar(har);
    }

    const methods = this.supportedVerbs
      .map(name => {
        return {
          [name]: ((method, path, ...args) => {
            const operation = spec.operation(path, method);
            return fetchOperation(operation, ...args);
          }).bind(null, name),
        };
      })
      .reduce((prev, next) => Object.assign(prev, next));

    return {
      auth,
      ...methods,
      ...Sdk.getOperations(spec)
        .filter(operation => operation.operationId)
        .reduce((prev, next) => {
          return Object.assign(prev, {
            [next.operationId]: ((operation, ...args) => {
              return fetchOperation(operation, ...args);
            }).bind(null, next),
          });
        }, {}),
    };
  }
}

module.exports = uri => {
  return new Sdk(uri).load();
};
