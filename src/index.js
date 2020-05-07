/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fetch = require('node-fetch');
const fetchHar = require('fetch-har');
// const { URL } = require('url');
// const pkg = require('../package.json');

const Oas = require('@readme/oas-tooling');
const oasToHar = require('@readme/oas-to-har');

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

module.exports = uri => {
  const spec = new Oas(typeof uri === 'string' ? require(uri) : uri);

  const authKeys = [];

  function auth(...values) {
    authKeys.push(values);
    return this;
  }

  // Needs work for supporting multiple different kinds of auth at the same time. for example if an operation uses
  // OAuth and HTTP bearer, how can we guarantee that the OAuth bearer is used with oauth?
  // @todo
  function prepareAuth(operation) {
    if (authKeys.length === 0) {
      return {};
    }

    const prepared = {};
    const security = operation.prepareSecurity();
    const securitySchemes = Object.keys(security);

    authKeys.forEach((authKey, idx) => {
      const schemes = security[securitySchemes[idx]];
      if (schemes.length > 1) {
        throw new Error(`Sorry, this API currently requires multiple forms of authentication which we don't yet support.`);
      }

      const scheme = schemes[0];
      if (scheme.type === 'http') {
        if (scheme.scheme === 'basic') {
          prepared[scheme._key] = {
            user: authKey[0],
            pass: (authKey.length === 2) ? authKey[1] : ''
          };
        } else if (scheme.scheme === 'bearer') {
          if (authKey.length > 1) {
            throw new Error('Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.');
          }

          prepared[scheme._key] = authKey[0];
        }
      } else if (scheme.type === 'oauth2') {
        if (authKey.length > 1) {
          throw new Error('Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.');
        }

        prepared[scheme._key] = authKey[0];
      } else if (scheme.type === 'apiKey') {
        if (authKey.length > 1) {
          throw new Error('Multiple auth keys were supplied for the auth on this endpoint, but only a single key is needed.');
        }

        if (scheme.in === 'query' || scheme.in === 'header') {
          prepared[scheme._key] = authKey[0];
        }
      } else {
        throw new Error(`Sorry, this API currently supports a scheme, ${scheme.type}, that we don't yet support.`);
      }
    });

    return prepared
  }

  function fetchOperation(operation, path, body /* , other */) {
    // console.logFull(spec.operation('/', 'get'))
    // console.logFull(operation)

    const params = {};
    if (arguments.length === 2) {
      params.path = path;
      params.body = path;
    } else if (arguments.length === 3) {
      params.path = path;
      params.body = body;
    }

    const har = oasToHar(spec, operation, params, prepareAuth(operation));

    // console.logx(spec);
    // console.logx(authValues);
    // console.logx(har);

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
