require('./utils/logger');

module.exports.actions = {};

module.exports.create = function(name, func) {
  module.exports.actions[name] = func;
}

module.exports.success = function(callback) {
  return function(response) {
    callback(null, response);
  }
}

module.exports.error = function(callback) {
  return function(response) {
    callback(response);
  }
}