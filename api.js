// TODO: This isn't gonna work here
require('./utils/logger');

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
  console.log(this.service, action, data, callback);
};

module.exports.config = (apiKey) => {
  this.key = apiKey;
  return (service) => {
    this.service = service;
    return this;
  };
};
