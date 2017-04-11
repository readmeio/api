const path = require('path');

exports.go = (event, context, callback) => {
  require(`${event.entrypoint}`);
  const api = require(path.join(process.cwd(), 'node_modules/api-build/api'));
  try {
    api.actions[event.name](event.data, {
      success: api.success(callback),
      error: api.error,
      log: () => {},
    });
  } catch (e) {
    const error = api._handlerUtils.parseErrors(event, e);
    callback(JSON.stringify(error), null);
  }
};
