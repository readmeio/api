const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BUILD_URL = 'http://localhost:5000';

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

exports.getCredentials = () => {
  const credPath = path.join(__dirname, '..', 'data/creds.json');
  if (exports.fileExists(credPath)) {
    const creds = require(credPath);
    if (Object.keys(creds).length > 1) {
      console.log('pick team');
    } else {
      const teamName = Object.keys(creds)[0];
      return { teamName, key: creds[teamName] };
    }
  }
  return new Error('Not logged in');
};

exports.getProxyUrl = (key) => {
  const url = BUILD_URL;
  if (!key) return url;
  const parts = url.split('://');
  return `${parts[0]}://${key}:@${parts[1]}`;
};
