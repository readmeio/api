'use strict';

const request = require('request-promise');

module.exports.log = (log) => {
  const logKey = process.env.logKey;
  if (logKey) {
    request.post('http://staging.bips.tech/logs/console', { json: { logKey, log } });
  }
};
