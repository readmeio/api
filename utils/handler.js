/* eslint-disable */
const api = require('api-build');
/* eslint-enable */

exports.go = (event, context, callback) => {
  require(`./${event.entrypoint}`);
  try {
    api.actions[event.name](event.data, {
      success: api.success(callback),
      error: api.error,
      log: api.log,
    });
  } catch (e) {
    const error = api._handlerUtils.parseErrors(event, e);
    callback(JSON.stringify(error), null);
  }
};
