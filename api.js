'use strict';

const request = require('request-promise');
const path = require('path');
const exists = require('./utils/utils').fileExists;
const getProxyUrl = require('./utils/utils').getProxyUrl;
const logger = require('./utils/logger');
require('colors');

const localLinksPath = path.join(process.cwd(), '/node_modules/api/data/links.json');

module.exports.actions = {};

module.exports.create = (name, func) => {
  module.exports.actions[name] = func;
};

module.exports.success = callback => (
  (response) => {
    logger.close();
    callback(null, response);
  }
);

module.exports.error = callback => (
  (response) => {
    logger.close();
    callback(response);
  }
);

module.exports.do = (action, data, callback) => {
  const localLinks = exists(localLinksPath) ? require(localLinksPath) : {};
  if (localLinks[this.service]) {
    const handler = require(path.join(localLinks[this.service], '/handler.js'));
    const pjson = require(path.join(localLinks[this.service], '/package.json'));
    const event = {
      entrypoint: pjson.main,
      name: action,
      data,
    };

    handler.go(event, undefined, (err, response) => {
      callback(err, response);
    });
  } else {
    const base = getProxyUrl(this.key);
    request.post(`${base}/services/${this.service}/${action}/invoke`, { body: data, json: true }).then((response) => {
      logger.close();
      callback(undefined, response.result);
    }).catch((err) => {
      logger.close();
      console.log(`Error calling ${this.service}.${action} v${err.response.headers['x-build-version']}`.red);
      console.log(`\n${err.response.body.error.red}`);
    });
  }
};

module.exports.config = (apiKey) => {
  this.key = apiKey;
  return (service) => {
    this.service = service;
    return this;
  };
};

module.exports.log = function log() {
  const args = Array.prototype.slice.call(arguments);
  let out = '';
  for (const i of args) {
    if (typeof i === 'object') {
      out += JSON.stringify(i);
    } else {
      out += i;
    }
    out += ' ';
  }
  logger.log(out);
  console.log.apply(undefined, args);
};
