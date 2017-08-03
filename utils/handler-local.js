const path = require('path');

exports.go = (event, context, callback) => {
  require(`${event.entrypoint}`);
  const api = require(path.join(process.cwd(), 'node_modules/api/api'));
  api.actions[event.name](event.data, {
    success: api.success(callback),
    error: api.error,
    log: () => {},
  });

  // Need this to recover from async exceptions
  process.on('uncaughtException', (e) => {
    const error = api._handlerUtils.parseErrors(event, e);
    callback(JSON.stringify(error), null);
  });
};
