'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const request = require('request-promise');
const CookieJar = require('tough-cookie').CookieJar;

exports.credPath = path.join(__dirname, '..', 'data/creds.json');

exports.BUILD_URL = process.env.BUILD_URL || 'http://staging.bips.tech';

exports.fileExists = (file) => {
  try {
    return fs.statSync(file).isFile();
  } catch (err) {
    return false;
  }
};

exports.getAliasFile = (unknownAction) => {
  const files = glob.sync(path.join(__dirname, '../commands', '*'));
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
  const s = fs.readFileSync(exports.credPath).toString();
  CookieJar.deserializeSync(s, jar._jar.store);

  return jar;
};

exports.getKeyUrl = (key) => {
  const url = exports.BUILD_URL;
  if (!key) return url;
  const parts = url.split('://');
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
