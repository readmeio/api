/* eslint-disable */
const api = require('api');
/* eslint-enable */

exports.go = (event, context, callback) => {
  require(`./${event.entrypoint}`);
  api.actions[event.name](event.data, {
    success: api.success(callback),
    error: api.error,
    log: api.log,
    getSecret: api.secrets(event.secrets),
  });

  // Using this instead of try...catch to make sure async errors
  // get caught and everything is handled in the same way
  process.on('uncaughtException', (e) => {
    const error = api._handlerUtils.parseErrors(event, e);
    callback(JSON.stringify(error), null);
  });
};
