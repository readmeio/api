const path = require('path');
const maybe = require('call-me-maybe');
require('colors');

const utils = require('./utils/utils');
const console = require('./utils/console');
const invoke = require('./lib/invoke');

const linksPath = path.join(utils.sharedDirectoryPath, 'links.json');

module.exports.run = (action, d, cb) => {
  if (this.key && this.key.startsWith('demo')) {
    return maybe(cb, new Promise((resolve) => {
      console.log('This is a demo API key!'.red);
      console.log('To get your own, run:');
      console.log('');
      console.log(`  ${'$'.grey} ${'api signup'.yellow}`);
      console.log('');

      return resolve();
    }));
  }

  // Can't reassign params
  let data = d;
  let callback = cb;

  // If no data is passed in, default to {}
  if (typeof data === 'function') {
    callback = data;
    data = {};
  } else if (!data) {
    data = {};
  }

  // Don't call api if there is a local link
  const baseLinks = { linkedServices: {}, localLinks: {} };
  const localLinks = utils.fileExists(linksPath) ? require(linksPath) : baseLinks;
  if (localLinks.linkedServices[this.service]) {
    const handler = require(path.join(process.cwd(), 'node_modules/api/utils/handler.js'));
    const errors = utils.buildErrors(localLinks.linkedServices[this.service]);

    const event = {
      name: action,
      data,
      pathOverride: localLinks.linkedServices[this.service],
      errors,
    };

    console.log(`Running ${this.service} from ${localLinks.linkedServices[this.service]}`.yellow);

    return maybe(callback, new Promise((resolve, reject) => {
      handler.go(event, undefined, (err, response) => {
        if (err) return reject(err);

        return resolve(response);
      });
    }));
  }

  return maybe(callback, new Promise((resolve, reject) => {
    return invoke(this.key, this.service, action, data).then((response) => {
      return resolve(response.body);
    }).catch((err) => {
      return reject(err.response.body);
    });
  }));
};

module.exports.config = (apiKey) => {
  this.key = apiKey;
  return (service) => {
    this.service = service;
    return this;
  };
};

/*
 * docsTest: This is an example for docs.test.js
 */
