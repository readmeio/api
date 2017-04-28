const request = require('request-promise');
const BUILD_URL = require('../utils/utils').BUILD_URL;

module.exports.log = (log) => {
  const logKey = process.env.logKey;
  if (logKey) {
    request.post(`${BUILD_URL}/logs/console`, { json: { logKey, log } });
  }
};
