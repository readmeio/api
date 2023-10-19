import chalk from 'chalk';
import { Command } from 'commander';

import logger from '../logger.js';
import Storage from '../storage.js';

const cmd = new Command();
cmd
  .name('list')
  .alias('ls')
  .description('list any installed API SDKs')
  .action(async () => {
    // We need to preload the storage system so we can grab the lockfile.
    Storage.setStorageDir();

    const lockfile = Storage.getLockfile();

    if (!lockfile.apis.length) {
      logger('😔 You do not have any SDKs installed.');
      return;
    }

    lockfile.apis.forEach((api, i) => {
      if (i > 0) {
        logger('');
      }

      logger(chalk.yellow.underline(api.identifier));
      if (api.private) {
        logger(`package name (${chalk.red('private')}): ${chalk.grey(`@api/${api.identifier}`)}`);
      }

      logger(`source: ${chalk.grey(api.source)}`);
      logger(`installer version: ${chalk.grey(api.installerVersion)}`);
      logger(`created at: ${chalk.grey(api.createdAt || 'n/a')}`);
      if (api.updatedAt) {
        logger(`updated at: ${chalk.grey(api.updatedAt)}`);
      }
    });
  });

export default cmd;
