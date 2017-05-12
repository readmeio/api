const request = require('request-promise');

const utils = require('../utils/utils');
const console = require('../utils/console');

const baseUrl = utils.BUILD_URL;
const jar = utils.getJar();

const agent = request.defaults({ baseUrl, jar });

function errorHandler(err) {
  // Pass along errors in testing environment
  if (process.env.NODE_ENV === 'testing') throw err;

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
  } else { // If we dont have a response, then something has really gone wrong!
    console.error(`
  Error making request to ${err.options.baseUrl}${err.options.uri}

  Message: ${err.message}
    `);
  }
}

module.exports.errorHandler = errorHandler;

['get', 'post', 'put'].forEach((method) => {
  module.exports[method] = (uri, options = { defaultErrorHandler: true, sendRequest: true }) => {
    const opts = Object.assign({}, options, {
      uri,
      headers: {
        'user-agent': `api/${require('../package.json').version} ${process.platform}/${process.version}`,
      },
    });
    if (options.sendRequest === false) {
      return agent[method](opts);
    }

    // We have to wrap the promise so that we can get a default error handler
    // on all http requests. This is configurable via the `defaultErrorHandler`
    // option when making the request
    return new Promise((resolve, reject) => {
      return agent[method](opts)
        .then(resolve)
        .catch(options.defaultErrorHandler !== false ? errorHandler : reject);
    });
  };
});
