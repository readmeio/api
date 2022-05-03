// const config = require('config');
// const core = require('@actions/core');
// const debugPackage = require('debug')(config.get('cli'));
// const isGHA = require('./isGitHub');
import chalk from 'chalk';

export default function logger(log: string, error?: boolean) {
  if (error) {
    console.error(chalk.red(log));
  } else {
    console.log(log);
  }
}

// module.exports.debug = function debug(input) {
//   /* istanbul ignore next */
//   if (isGHA() && process.env.NODE_ENV !== 'testing') core.debug(`rdme: ${input}`);
//   return debugPackage(input);
// };
