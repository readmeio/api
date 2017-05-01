const request = require('request-promise');

const utils = require('../utils/utils');
const console = require('../utils/console');

const baseUrl = utils.BUILD_URL;
const jar = utils.getJar();

const agent = request.defaults({ baseUrl, jar });

const methods = ['get', 'post', 'put'];

function errorHandler(err) {
  let parsed;
  try {
    parsed = JSON.parse(err.response.body);
  } catch (e) {
    // Ignore the error, we have defaults set below
    parsed = {};
  }

  if (err.response) {
    console.error(`
  Error making request to ${err.options.baseUrl}${err.options.uri}

  Message: ${parsed.error || 'An unexpected error has occurred'}
  Code: ${parsed.code || 'Unknown'}
  Response status: ${err.response.statusCode} ${err.response.statusMessage}

  Stack: ${err.stack}
    `);
  } else {
    console.error(`
  Error making request to ${err.options.baseUrl}${err.options.uri}

  Message: ${err.message}
    `);
  }
}

methods.forEach((method) => {
  module.exports[method] = (uri, options) => {
    return {
      then: (onFulfilled) => {
        return agent[method](Object.assign({}, options, { uri }))
          .then(onFulfilled)
          .catch(errorHandler);
      },
    };
  };
});
