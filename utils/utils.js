const os = require('os');
const fs = require('fs');
const url = require('url');
const path = require('path');
const glob = require('glob');
const request = require('request-promise');
const CookieJar = require('tough-cookie').CookieJar;
const execSync = require('child_process').execSync;
const buildDocs = require('build-docs');

const console = require('./console');
const exit = require('./exit');

const host = process.env.BUILD_HOST || 'api.readme.build';
const protocol = process.env.BUILD_HOST ? 'http' : 'https'; // if overriding
const www = process.env.WWW_HOST || 'readme.build';
const version = process.env.BUILD_HOST ? '' : 'v1';

exports.WWW_URL = url.format({ host: www, protocol });
exports.BUILD_URL = url.format({ host, protocol, pathname: version });
exports.WS_URL = url.format({ host, protocol: 'ws', slashes: true });

// Sets up ~/.readme-build/ if it doesn't exist
exports.setupSharedDirectory = () => {
  const homePath = exports.sharedDirectoryPath;
  if (!fs.existsSync(homePath)) {
    fs.mkdirSync(homePath);
  }
};

exports.sharedDirectoryPath = path.join(os.homedir(), '.readme-build');
exports.credPath = path.join(exports.sharedDirectoryPath, 'creds.json');

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

exports.buildErrors = (baseDir = process.cwd()) => {
  const docs = buildDocs.parseDirectory(path.join(baseDir, 'endpoints'));
  const errors = {};
  for (const doc of docs) {
    errors[doc.name] = doc.errors.toString();
  }
  return errors;
};
