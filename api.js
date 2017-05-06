const request = require('request-promise');
const path = require('path');
const utils = require('./utils/utils');
const logger = require('./utils/logger');
require('colors');
const maybe = require('call-me-maybe');

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

module.exports.secrets = secrets => secret => secrets.find(s => s.key === secret).value;

module.exports.do = (action, d, cb) => {
  // Can't reassign params
  let data = d;
  let callback = cb;

  // If no data is passed in, defualt to {}
  if (typeof data === 'function') {
    callback = data;
    data = {};
  } else if (!data) {
    data = {};
  }

  // Don't call api if there is a local link
  const localLinks = utils.fileExists(localLinksPath) ? require(localLinksPath) : {};
  if (localLinks[this.service]) {
    const handler = require(path.join(localLinks[this.service], '/handler.js'));
    const pjson = require(path.join(localLinks[this.service], '/package.json'));
    const event = {
      entrypoint: pjson.main,
      name: action,
      data,
    };

    return maybe(callback, new Promise((resolve, reject) => {
      handler.go(event, undefined, (err, response) => {
        if (err) return reject(err);

        return resolve(response);
      });
    }));
  }

  const base = utils.getKeyUrl(this.key);
  const opts = { body: data, json: true, resolveWithFullResponse: true };
  return maybe(callback, new Promise((resolve, reject) => (
    request.post(`${base}/services/${this.service}/${action}/invoke`, opts).then((response) => {
      utils.checkDeprecated(response);
      return resolve(response.body.result);
    }).catch((err) => {
      utils.checkDeprecated(err.response);
      return reject(err.response.body);
    })
  )));
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
