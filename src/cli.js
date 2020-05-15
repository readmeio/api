#! /usr/bin/env node
const chalk = require('chalk');
const pkg = require('../package.json');
const { Command } = require('commander');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const Cache = require('./cache');

global.fetch = fetch;
global.Request = fetch.Request;
global.Headers = fetch.Headers;

const program = new Command();
program.version(pkg.version);

console.logx = obj => {
  // eslint-disable-next-line global-require
  console.log(require('util').inspect(obj, false, null, true));
};

program
  .command('install <location>')
  .description('Install an OpenAPI Document to be later used as an SDK')
  .action(async location => {
    console.log(chalk.green('Retrieving...'));

    let url;
    let cacheFrom;

    try {
      url = new URL(location);
      cacheFrom = 'url';
    } catch (err) {
      // This doens't look to be a valid URL so does it exist on their filesystem instead?
      await fs
        .stat(location)
        .then(() => {
          cacheFrom = 'file';
        })
        .catch(() => {
          console.log(
            chalk.red(
              'Sorry, we were unable to install that OpenAPI document. Please either supply a URL or a path on your filesystem.'
            )
          );
          process.exit();
        });
    }

    if (cacheFrom === 'url') {
      await new Cache(url.href).saveUrl().catch(err => {
        console.log(chalk.red(err.message));
      });
    } else {
      await new Cache(location).saveFile().catch(err => {
        console.log(chalk.red(err.message));
      });
    }
  });

program.parse(process.argv);
