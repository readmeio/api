const fs = require('fs');
const url = require('url');
const path = require('path');
const glob = require('glob');
const request = require('request-promise');
const CookieJar = require('tough-cookie').CookieJar;
const template = require('lodash.template');
const buildDocs = require('build-docs');

const console = require('./console');
const exit = require('./exit');

exports.credPath = path.join(__dirname, '..', 'data/creds.json');

const host = process.env.BUILD_HOST || 'staging.bips.tech';
const www = process.env.WWW_HOST || 'bips.tech';

exports.WWW_URL = url.format({ host: www, protocol: 'http' });
exports.BUILD_URL = url.format({ host, protocol: 'http' });
exports.WS_URL = url.format({ host, protocol: 'ws', slashes: true });

exports.fileExists = (file) => {
  try {
    return fs.statSync(file).isFile();
  } catch (err) {
    return false;
  }
};

exports.getAliasFile = (unknownAction) => {
  const files = glob.sync(path.join(__dirname, '../commands', '*.js'));
  let foundAction = false;
  for (const file of files) {
    const actionInfo = require(file);
    if (actionInfo.aliases && actionInfo.aliases.indexOf(unknownAction) >= 0) {
      foundAction = file.match(/(\w+).js/)[1];
    }
  }
  return foundAction;
};

exports.getJar = () => {
  const jar = request.jar();
  try {
    const s = fs.readFileSync(exports.credPath).toString();
    CookieJar.deserializeSync(s, jar._jar.store);
    return jar;
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;

    if (process.env.NODE_ENV === 'testing') return undefined;

    console.error(`You must be logged in to perform that action:

  api login
    `);

    return exit(1);
  }
};

exports.getKeyUrl = (key) => {
  if (!key) return exports.BUILD_URL;
  const parts = exports.BUILD_URL.split('://');
  return `${parts[0]}://${key}:@${parts[1]}`;
};

// fixes args like numbers=[1, 3, 2]
// Spaces confuse minimist
exports.parseArgs = (args) => {
  const parsed = [];
  for (const arg of args) {
    const stringArg = arg.toString();
    if (stringArg.indexOf('=') === -1) {
      parsed[parsed.length - 1] += stringArg;
    } else {
      parsed.push(arg);
    }
  }
  return parsed;
};

exports.parseErrors = (event, error) => {
  // Don't want to modify error passed in
  const e = Object.assign({}, error);

  const file = fs.readFileSync(`${event.entrypoint}`);
  const docs = buildDocs(file);

  // Get errors for called action
  let errors = [];
  for (const doc of docs) {
    if (doc.name === event.name) {
      errors = doc.throws;
    }
  }

  // Match error in docs with message
  let message;
  let found = false;
  for (const err of errors) {
    if (err.type === e.name) {
      message = err.description;
      found = true;
    }
  }

  // Normallize api.error('message')
  if (!found && e.handled) {
    e.message = e.name;
    e.name = 'Error';
  }

  const outError = {
    name: e.name,
    message: message || e.message,
    handled: e.handled || false,
    data: event.data,
  };

  // Parse if error message is a template
  if (e.props && outError.message) {
    const interpolate = /\${([\s\S]+?)}/g;
    outError.message = template(outError.message, { interpolate })(e.props);
  }
  return outError;
};

exports.checkDeprecated = (response) => {
  const service = response.headers['x-build-service'];
  const version = response.headers['x-build-version'];
  if (response.headers['x-build-deprecated']) {
    console.log(`${service} v${version} is deprecated! Run \`api update ${service}\` to use the latest version`.red);
  }
};
