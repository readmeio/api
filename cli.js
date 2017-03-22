#!/usr/bin/env node

const parseArgs = require('minimist')(process.argv.slice(2));
const path = require('path');
require('colors');

const utils = require('./utils/utils');

const args = parseArgs._;
const action = load(args[0]);
action.run(args);

function load(verb = 'help') {
  let file = path.join(__dirname, 'commands', `${verb}.js`);

  if (utils.fileExists(file)) {
    return require(file);
  }

  const alias = utils.getAliasFile(verb);
  if (alias) {
    file = path.join(__dirname, 'commands', `${alias}.js`);
    return require(file);
  }

  console.log('Command not found.'.red);
  console.log(`Type ${'api help'.yellow} to see all commands`);
  return process.exit();
}
