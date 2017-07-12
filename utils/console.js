const logs = [];

module.exports._flush = () => logs.splice(0).join('\n');

function createLog(method, ...args) {
  if (process.env.NODE_ENV === 'testing') {
    logs.push(...args);
    return args;
  }

  return console[method](...args);
}

module.exports.log = createLog.bind(null, 'log');

module.exports.error = createLog.bind(null, 'error');
module.exports.warn = console.warn;
