const path = require('path');
const fs = require('fs');
const utils = require('./handler-utils');

exports.go = (event, context, callback) => {
  const basePath = event.pathOverride || process.cwd();
  const endpointPath = path.join(basePath, 'endpoints', `${event.name}.js`);
  try {
    fs.statSync(endpointPath).isFile();
  } catch (e) {
    throw new Error('Endpoint does not exist');
  }
  const endpoint = require(endpointPath);
  const parsedData = utils.fixBuffers(event.data);
  try {
    endpoint(parsedData, {
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
