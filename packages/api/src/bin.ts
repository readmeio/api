import { Command } from 'commander';
import updateNotifier from 'update-notifier';

import commands from './commands/index.js';
import logger from './logger.js';
import * as pkg from './packageInfo.js';

updateNotifier({ pkg: { name: pkg.PACKAGE_NAME, version: pkg.PACKAGE_VERSION } }).notify();

(async () => {
  const program = new Command();
  program.name(pkg.PACKAGE_NAME);
  program.version(pkg.PACKAGE_VERSION);

  /**
   * Instead of using Commander's `executableDir` API for loading in external command files we're
   * programatically doing it like this because it's cleaner for us to let Commander manage option
   * and argument parsing within this file than having each command  manage that itself.
   */
  Object.entries(commands).forEach(([, cmd]: [string, Command]) => {
    program.addCommand(cmd);
  });

  await program.parseAsync(process.argv).catch(err => {
    if (err.message) logger(err.message, true);
    process.exit(1);
  });
})();
