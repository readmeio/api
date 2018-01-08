#!/usr/bin/env node

const parseArgs = require('minimist')(process.argv.slice(2));
const path = require('path');
require('colors');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

const utils = require('./utils/utils');

// Notifies the user if there is an update to the api module
updateNotifier({ pkg }).notify();

// --verson and -v
if (parseArgs.version || parseArgs.v) {
  console.log(pkg.version);
  if (process.env.BUILD_HOST) console.log(`BUILD_HOST: ${utils.BUILD_URL}`);
  process.exit(0);
}

const args = parseArgs._;
const action = load(args[0]);

// -t readme and --team readme work
if (parseArgs.t && !parseArgs.team) {
  parseArgs.team = parseArgs.t;
}

try {
  action.run(args, parseArgs);
} catch (e) {
  console.error(`Error running \`${args[0]}\`:\n\n `, e.message.red, '\n');
}

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
