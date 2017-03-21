#!/usr/bin/env node

const _ = require('lodash');
const parseArgs = require('minimist')(process.argv.slice(2));
const path = require('path');
require('colors');

const utils = require('./utils/utils');

const args = parseArgs._;
const opts = _.clone(parseArgs);
delete opts._;

const action = load(args[0]);

action.run(args, opts);

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
