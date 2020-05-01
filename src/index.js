/* eslint-disable global-require */
const fetch = require('node-fetch');
const fetchHar = require('fetch-har');
// const { URL } = require('url');
const pkg = require('../package.json');

const Oas = require('@readme/oas-tooling');
const oasToHar = require('@readme/oas-to-har');
const findCacheDir = require('find-cache-dir');

global.fetch = fetch;
global.Request = fetch.Request;

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
const cacheDir = findCacheDir({ name: pkg.name });

console.logFull = obj => {
  console.log(require('util').inspect(obj, false, null, true));
};

function getOperations(spec) {
  return Object.keys(spec.paths)
    .map(path => {
      return Object.keys(spec.paths[path]).map(method => {
        return {
          method,
          path,
          ...spec.paths[path][method],
        };
      });
    })
    .reduce((prev, next) => prev.concat(next), []);
}

module.exports = uri => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const spec = new Oas(typeof uri === 'string' ? require(uri) : uri);

  let authValues = {};

  function auth(values) {
    authValues = values;
  }

  function fetchOperation(operation, path, body /* , other */) {
    const params = {};
    if (arguments.length === 2) {
      params.path = path;
      params.body = path;
    } else if (arguments.length === 3) {
      params.path = path;
      params.body = body;
    }

    const har = oasToHar(spec, operation, params, authValues);

    // console.logFull(har);

    return fetchHar(har);
  }

  const methods = HTTP_METHODS.map(name => {
    return {
      [name]: ((method, path, ...args) => {
        const operation = spec.operation(path, method);
        return fetchOperation(operation, ...args);
      }).bind(null, name),
    };
  }).reduce((prev, next) => Object.assign(prev, next));

  return {
    auth,
    ...methods,
    ...getOperations(spec)
      .filter(operation => operation.operationId)
      .reduce((prev, next) => {
        return Object.assign(prev, {
          [next.operationId]: ((operation, ...args) => {
            return fetchOperation(operation, ...args);
          }).bind(null, next),
        });
      }, {}),
  };
};
