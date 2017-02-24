// TODO: This isn't gonna work here
// require('./utils/logger');

const request = require('request-promise');

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
  const body = {
    data,
    key: this.key,
  };
  request.post(`http://localhost:5000/services/${this.service}/${action}/invoke`, { body, json: true }).then((response) => {
    callback(undefined, response.result);
  });
};

module.exports.config = (apiKey) => {
  this.key = apiKey;
  return (service) => {
    this.service = service;
    return this;
  };
};
