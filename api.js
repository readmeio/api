'use strict';

const request = require('request-promise');
const path = require('path');
const utils = require('./utils/utils');
const logger = require('./utils/logger');
require('colors');

const localLinksPath = path.join(process.cwd(), '/node_modules/api/data/links.json');

module.exports.actions = {};

module.exports.create = (name, func) => {
  module.exports.actions[name] = func;
};

module.exports.success = callback => response => callback(null, response);

module.exports.error = callback => response => callback(response);

module.exports.do = (action, data, callback) => {
  const localLinks = utils.fileExists(localLinksPath) ? require(localLinksPath) : {};
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
    const base = utils.getKeyUrl(this.key);
    request.post(`${base}/services/${this.service}/${action}/invoke`, { body: data, json: true }).then((response) => {
      callback(undefined, response.result);
    }).catch((err) => {
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
  logger.log(args);
  console.log.apply(undefined, args);
};

/*
 * docsTest: This is an example for docs.test.js
 */
