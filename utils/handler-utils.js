const http = require('http');

module.exports.success = callback => response => callback(null, response);

module.exports.error = (event, callback) => (name, props) => {
  if (name instanceof Error) {
    return callback(JSON.stringify(module.exports.parseErrors(event, name)), null);
  }

  const e = new Error();
  e.name = name;
  e.handled = true;
  e.props = props;

  return callback(JSON.stringify(module.exports.parseErrors(event, e)), null);
};

module.exports.parseErrors = (event, error) => {
  let compiledErrors;
  try {
    compiledErrors = require('./_errors'); // eslint-disable-line import/no-unresolved
  } catch (e) {
    compiledErrors = event.errors || { [event.name]: {} };
  }

  const errors = compiledErrors[event.name];

  const e = {};
  // Normallize api.error('message')
  if (!errors[error.name] && error.handled) {
    e.message = error.name;
    e.name = 'Error';
  }

  const outError = {
    name: e.name || error.name,
    message: e.message || error.message,
    handled: error.handled || false,
    data: event.data,
  };

  // Parse if error message is a template
  if (errors[error.name]) {
    const template = errors[error.name];
    outError.message = eval(`(${template})`)(error.props); // eslint-disable-line no-eval
  }
  return outError;
};

module.exports.log = function log() {
  const args = Array.prototype.slice.call(arguments);
  const logKey = process.env.logKey;
  if (logKey) {
    const options = {
      hostname: 'api.readme.build',
      port: 80,
      path: '/logs/console',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const req = http.request(options);
    const data = { logKey, log };
    req.write(`${data.toString()}`);
    req.end();
  }
  console.log.apply(undefined, args);
};

module.exports.getSecret = secrets => secret => secrets.find(s => s.key === secret).value;
