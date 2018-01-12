const os = require('os');
const fs = require('fs');
const url = require('url');
const path = require('path');
const glob = require('glob');
const stream = require('stream');
const request = require('request-promise');
const CookieJar = require('tough-cookie').CookieJar;
const execSync = require('child_process').execSync;
const buildDocs = require('build-docs');

const console = require('./console');
const exit = require('./exit');

const fileUtils = require('./file-utils');

const host = process.env.BUILD_HOST || 'api.readme.build';
const protocol = process.env.BUILD_HOST ? 'http' : 'https'; // if overriding
const www = process.env.WWW_HOST || 'readme.build';
const version = process.env.BUILD_HOST ? '' : 'v1';

exports.WWW_URL = url.format({ host: www, protocol });
exports.BUILD_URL = url.format({ host, protocol, pathname: version });
exports.WS_URL = url.format({ host, protocol: 'ws', slashes: true });

// Sets up ~/.readme-build/ if it doesn't exist
exports.setupSharedDirectory = () => {
  const homePath = exports.sharedDirectoryPath();
  if (!fs.existsSync(homePath)) {
    fs.mkdirSync(homePath);
  }
};

exports.sharedDirectoryPath = () => path.join(process.env.HOME_DIR || os.homedir(), '.readme-build');
exports.credPath = path.join(exports.sharedDirectoryPath(), 'creds.json');

// Sets up ~/.readme-build/.cache
// Currently we just use this for the deploy zip (and delete the zip after deploy)
// But in the future we could do more stuff here
exports.cacheDir = () => {
  // Make sure shared directory is set up
  exports.setupSharedDirectory();

  const cachePath = path.join(exports.sharedDirectoryPath(), '.cache');
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
  }
  return cachePath;
};

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

// Converts command line arguments to a javascript object
// test=1 test2='hello' test3=@/path/to/file
// { test: 1, test2: 'hello', test3: BUFFER }
exports.parseArgs = (args) => {
  const data = {};
  const passedData = exports.fixMinimistSpaces(args);
  for (const arg of passedData) {
    const i = arg.indexOf('=');
    const parsedArg = [arg.slice(0, i), arg.slice(i + 1)];
    data[parsedArg[0]] = exports.convertArgToProperType(parsedArg[1]);
  }
  return data;
};

exports.convertArgToProperType = (arg) => {
  // It's a file
  if (arg.indexOf('@') === 0) {
    return fileUtils.file(arg.split('@')[1]);
  }

  let value = arg;
  try {
    value = JSON.parse(arg);
  } catch (e) {
    // Already in proper format
    // console.log(e);
  }
  return value;
};

// fixes args like numbers=[1, 3, 2]
// Spaces confuse minimist
exports.fixMinimistSpaces = (args) => {
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

// Gets the current version of the sdk
// api-cli@version if `api run`
// api@version if in code
exports.getSDKVersion = (isCLI = false) => {
  const sdkVersion = require(path.join(__dirname, '../../package.json')).version;
  if (isCLI) {
    return `api-cli@${sdkVersion}`;
  }
  return `api@${sdkVersion}`;
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
    if (doc.errors) {
      errors[doc.name] = doc.errors.toString();
    }
  }
  return errors;
};

// Get names of files still containing stub documentation
exports.getUnchangedDocs = (docs) => {
  return docs.filter(doc => doc.fullDescription && doc.fullDescription.indexOf('https://docs.readme.build/docs/writing-documentation') >= 0)
  .map(doc => doc.name);
};

// Parses response to make sure its the correct type
exports.parseResponse = (response) => {
  let parsedResponse = response.body;
  try {
    parsedResponse = JSON.parse(response.body, (k, v) => {
      return v && v.type === 'Buffer' ? Buffer.from(v.data) : v;
    });
  } catch (e) { /* response is a string */ }
  return parsedResponse;
};

// Parses data to be sent for invoke
// body.data is stringified json
// Other is files
exports.parseData = (data) => {
  const files = {};
  const filelessData = {};
  for (const param in data) {
    if (data[param] instanceof stream || Buffer.isBuffer(data[param])) {
      files[param] = data[param];
    } else {
      filelessData[param] = data[param];
    }
  }

  return Object.assign({}, files, { data: JSON.stringify(filelessData) });
};
