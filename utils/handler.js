const path = require('path');
const fs = require('fs');
const utils = require('./handler-utils');

exports.go = (event, context, callback) => {
  const endpointPath = path.join(process.cwd(), 'endpoints', `${event.name}.js`);
  try {
    fs.statSync(endpointPath).isFile();
  } catch (e) {
    throw new Error('Endpoint does not exist');
  }
  const endpoint = require(endpointPath);
  try {
    endpoint(event.data, {
      success: utils.success(callback),
      error: utils.error(event, callback),
      log: utils.log,
      getSecret: utils.getSecret(event.secrets),
    });
  } catch (e) {
    const error = utils.parseErrors(event, e);
    callback(JSON.stringify(error), null);
  }
};
