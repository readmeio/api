import { Command } from 'commander';

import commands from './cli/commands';
import * as pkg from './packageInfo';

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

  await program.parseAsync(process.argv);
})();
