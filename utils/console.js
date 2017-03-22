const logs = [];

module.exports._flush = () => logs.splice(0).join('\n');

module.exports.log = (...args) => {
  if (process.env.NODE_ENV === 'testing') {
    logs.push(...args);
    return args;
  }

  return console.log(...args);
};

module.exports.error = console.error;
