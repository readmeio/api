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

module.exports.error = (name, props) => {
  const e = new Error();
  e.name = name;
  e.handled = true;
  e.props = props;
  throw e;
};

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
    const opts = { body: data, json: true, resolveWithFullResponse: true };
    request.post(`${base}/services/${this.service}/${action}/invoke`, opts).then((response) => {
      utils.checkDeprecated(response);
      callback(undefined, response.body.result);
    }).catch((err) => {
      utils.checkDeprecated(err.response);
      callback(err.response.body);
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

module.exports._handlerUtils = {
  parseErrors: utils.parseErrors,
};

/*
 * docsTest: This is an example for docs.test.js
 */
