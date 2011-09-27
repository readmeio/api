module.exports = function(version) {

if (version !== 'http' && version !== 'https')
  throw new Error(version + ' not supported.');

var util = require('util'),
    http = require(version),
    url = require('url'),
    api = {};

// API Server inherits EventEmitter
function Server () {
  if (!(this instanceof Server)) return new Server();
  http.Server.call(this);

  // Listen for any request and map the request to it's own event.
  // 'regularRequest' is emitted, when there are no listeners for the event.
  this.addListener('request', function(req, res) {
    var path = url.parse(req.url).pathname;

    if (this.listeners(path).length > 0)
      this.emit(path, req, res);
    else
      this.emit('regularRequest', req, res);
  });
};
util.inherits(Server, http.Server);

api.Server = Server;

return api;

};
