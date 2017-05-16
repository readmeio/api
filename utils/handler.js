/* eslint-disable */
const api = require('api');
/* eslint-enable */

exports.go = (event, context, callback) => {
  try {
    require(`./${event.entrypoint}`);
    api.actions[event.name](event.data, {
      success: api.success(callback),
      error: api.error,
      log: api.log,
      getSecret: api.secrets(event.secrets),
    });
  } catch (e) {
    const error = api._handlerUtils.parseErrors(event, e);
    callback(JSON.stringify(error), null);
  }
};
