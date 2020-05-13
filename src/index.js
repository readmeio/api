/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fetch = require('node-fetch');
const fetchHar = require('fetch-har');
const Oas = require('@readme/oas-tooling');
const oasToHar = require('@readme/oas-to-har');

const { prepareAuth, prepareParams } = require('./lib/index');

global.fetch = fetch;
global.Request = fetch.Request;
global.Headers = fetch.Headers;

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

console.logx = obj => {
  console.log(require('util').inspect(obj, false, null, true));
};

function getOperations(spec) {
  return Object.keys(spec.paths)
    .map(path => {
      return Object.keys(spec.paths[path]).map(method => {
        return spec.operation(path, method);
      });
    })
    .reduce((prev, next) => prev.concat(next), []);
}

function isPrimitive(val) {
  return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean';
}

module.exports = uri => {
  const spec = new Oas(typeof uri === 'string' ? require(uri) : uri);

  const authKeys = [];

  function auth(...values) {
    authKeys.push(values);
    return this;
  }

  function fetchOperation(operation, body, metadata /* path, body /* , other */) {
    // console.logx(operation.parameters)

    // const params = {};
    /* if (arguments.length === 2) {
      params.path = path;
      params.body = path;
    } else if (arguments.length === 3) {
      params.path = path;
      params.body = body;
    } */

    const har = oasToHar(spec, operation, prepareParams(operation, body, metadata), prepareAuth(authKeys, operation));

    // console.logx(spec);
    // console.logx(authValues);
    console.logx(har);

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
