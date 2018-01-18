const path = require('path');
const maybe = require('call-me-maybe');
require('colors');

const { baseLinks } = require('./commands/link');
const utils = require('./utils/utils');
const { parseLocalFileResponse, convertToFileType, file } = require('./utils/file-utils');
const console = require('./utils/console');
const invoke = require('./lib/invoke');

const linksPath = path.join(utils.sharedDirectoryPath(), 'links.json');

const scope = {};

module.exports.config = (apiKey) => {
  scope.key = apiKey;

  function setService(service) {
    scope.service = service;
    return api;
  }
  return Object.assign(setService.bind(scope), api);
};

const api = {
  run(action, d, outputs, cb) {
    if (scope.key && scope.key.startsWith('demo')) {
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

    // Make outputs an optional parameter
    if (typeof outputs === 'function') {
      callback = outputs;
    }

    // If no data is passed in, default to {}
    if (typeof data === 'function') {
      callback = data;
      data = {};
    } else if (!data) {
      data = {};
    }

    // Don't call api if there is a local link
    const localLinks = utils.fileExists(linksPath) ? require(linksPath) : baseLinks;
    if (localLinks.services[scope.service] && localLinks.directories[process.cwd()].length) {
      const handler = require(path.join(process.cwd(), 'node_modules/api/utils/handler.js'));
      const errors = utils.buildErrors(localLinks.services[scope.service]);

      const event = {
        name: action,
        data,
        pathOverride: localLinks.services[scope.service],
        errors,
      };

      console.log(`Running ${scope.service} from ${localLinks.services[scope.service]}`.yellow);

      return maybe(callback, new Promise(async (resolve, reject) => {
        event.data = await convertToFileType(event.data);

        handler.go(event, undefined, (err, response) => {
          if (err) return reject(err);

          return resolve(parseLocalFileResponse(JSON.stringify(response)));
        });
      }));
    }

    return maybe(callback, new Promise((resolve, reject) => {
      return invoke(scope.key, scope.service, action, data, { outputs }).then((response) => {
        return resolve(response);
      }).catch((err) => {
        return reject(err);
      });
    }));
  },
  file,
};

module.exports.file = file;

/*
 * docsTest: This is an example for docs.test.js
 */
