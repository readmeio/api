// TODO: This isn't gonna work here
// require('./utils/logger');

const request = require('request-promise');
const path = require('path');
const exists = require('./utils/utils').fileExists;
const getProxyUrl = require('./utils/utils').getProxyUrl;

const localLinksPath = path.join(process.cwd(), '/node_modules/api/data/links.json');

module.exports.actions = {};

module.exports.create = (name, func) => {
  module.exports.actions[name] = func;
};

module.exports.success = callback => (
  (response) => {
    callback(null, response);
  }
);

module.exports.error = callback => (
  (response) => {
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
      callback(undefined, response.result);
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
