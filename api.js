module.exports = function(version) {

if (version !== 'http' && version !== 'https')
  throw new Error(version + ' not supported.');

var util = require('util'),
    http = require(version),
    url = require('url'),
    api = {};

// API Server inherits EventEmitter
function Server () {
  if (!(this instanceof Server))
    return new Server();

  http.Server.call(this);

  // An array that contains the listeners for the different methods
  this.methods = [];

  // Listen for any request and map the request to it's own event.
  // 'regularRequest' is emitted, when there are no listeners for the event.
  this.addListener('request', function(req, resp) {
    var method,
        path;

    req.urlParsed= url.parse(req.url);
    path = req.urlParsed.pathname;

    if (this.listeners(path).length > 0)
      this.emit(path, req, resp);
    else {
      // check if method is defined
      if (method = this.methods[req.method])
        // for each listener of method
        for (var listener in method) {
            var match,
                p = method[listener].pattern;

            // match it
            if ((match = p.exec(req.url)) != null) {
              // add to resp
              resp.match = match;
              // callback
              method[listener].callback(req, resp);
              return;
            }
            console.log(match);
          }
      this.emit('regularRequest', req, resp);
    }
  });

  this.extend('GET');
  this.extend('POST');
  this.extend('PUT');
  this.extend('DELETE');
  this.extend('HEAD');
};

// Inherit from native http.Server
util.inherits(Server, http.Server);

// extend server with a new request method
Server.prototype.extend = function (method, override) {
  var fn = method.toLowerCase(); // the methods will be lowercase

  if (this[fn] && !override)
    return new Error('The property '+fn
        +' already exists. Please use another name or set override to true.');

  this.methods[method] = [];

  this[fn] = function (p, cb) {
    this.methods[method].push({ pattern: Server.util.regExp(p), callback: cb });
  };
};

Server.util = {};
Server.util.regExp = function(path) {
  return new RegExp(path.replace(/\//g, '\\/'));
};

api.Server = Server;

return api;

};
