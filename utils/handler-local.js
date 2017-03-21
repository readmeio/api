'use strict';

const path = require('path');

exports.go = (event, context, callback) => {
  require(`${event.entrypoint}`);
  try {
    const api = require(path.join(process.cwd(), 'node_modules/api-build/api'));
    api.actions[event.name](event.data, {
      success: api.success(callback),
      error: api.error(callback),
      log: api.log,
    });
  } catch (e) {
    const err = new Error(`Cannot run ${event.name}: ${e.message}`);
    callback(err, null);
  }
};
