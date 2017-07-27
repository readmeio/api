const fs = require('fs');
const url = require('url');
const path = require('path');
const glob = require('glob');
const request = require('request-promise');
const CookieJar = require('tough-cookie').CookieJar;
const template = require('lodash.template');
const buildDocs = require('build-docs');
const execSync = require('child_process').execSync;

const console = require('./console');
const exit = require('./exit');

exports.credPath = path.join(__dirname, '..', 'data/creds.json');

const host = process.env.BUILD_HOST || 'api.readme.build';
const protocol = process.env.BUILD_HOST ? 'http' : 'https'; // if overriding
const www = process.env.WWW_HOST || 'readme.build';
const version = process.env.BUILD_HOST ? '' : 'v1';

exports.WWW_URL = url.format({ host: www, protocol });
exports.BUILD_URL = url.format({ host, protocol, pathname: version });
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

  ${'api login'.green}

Don't have an account? Signup is free and takes 5 seconds!

  ${'api signup'.green}
    `);

    return exit(1);
  }
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
    if (err.type === error.name) {
      message = err.description;
      found = true;
    }
  }

  const e = {};
  // Normallize api.error('message')
  if (!found && error.handled) {
    e.message = error.name;
    e.name = 'Error';
  }

  const outError = {
    name: e.name || error.name,
    message: message || e.message || error.message,
    handled: error.handled || false,
    data: event.data,
  };

  // Parse if error message is a template
  if (error.props && outError.message) {
    const interpolate = /\${([\s\S]+?)}/g;
    outError.message = template(outError.message, { interpolate })(error.props);
  }
  return outError;
};

exports.getGitConfig = (config) => {
  let val;
  try {
    val = execSync(`git config --global ${config}`).toString().trim();
  } catch (e) {
    // hi
  }
  return val;
};

exports.getPackageJson = () => {
  try {
    return require(path.join(process.cwd(), 'package.json'));
  } catch (e) {
    // Couldn't get it
  }
  return {};
};

exports.makeUsername = () => {
  if (exports.getGitConfig('github.user')) {
    return exports.getGitConfig('github.user');
  }

  const name = exports.getGitConfig('user.name');
  if (!name) return undefined;

  const split = name.split(' ');
  split[0] = split[0][0]; // first character of first name

  return split.join('').replace(/[^\w]/g, '').toLowerCase();
};

