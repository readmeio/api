import path from 'node:path';

import chalk from 'chalk';
import { Command, Option } from 'commander';
import ora from 'ora';

import { SupportedLanguages, uninstallerFactory } from '../codegen/factory.js';
import promptTerminal from '../lib/prompt.js';
import logger from '../logger.js';
import Storage from '../storage.js';

interface Options {
  yes?: boolean;
}

const cmd = new Command();
cmd
  .name('rebuild')
  .description('rebuild an installed SDK')
  .argument('<identifier>', 'the SDK to rebuild')
  .addOption(new Option('-y, --yes', 'Automatically answer "yes" to any prompts printed'))
  .action(async (identifier: string, options: Options) => {
    // We don't know if we have `identifier` in the storage system yet, we just need to preload the
    // system so we can access lockfiles.
    const storage = new Storage('', SupportedLanguages.JS, identifier);

    const entry = Storage.getFromLockfile(identifier);
    if (!entry) {
      logger(
        `You do not appear to have ${identifier} installed. You can run \`npx api list\` to see what SDKs are present.`,
        true,
      );
      process.exit(1);
    }

    storage.setLanguage(entry?.language);
    storage.setIdentifier(identifier);

    const directory = path.relative(process.cwd(), storage.getIdentifierStorageDir());
    if (!options.yes) {
      await promptTerminal({
        type: 'confirm',
        name: 'value',
        message: `Are you sure you want to uninstall ${chalk.yellow(identifier)}? This will delete the ${chalk.yellow(
          directory,
        )} directory and potentially any changes you may have made there.`,
        initial: true,
      }).then(({ value }) => {
        if (!value) {
          process.exit(1);
        }
      });
    }

    let spinner = ora(`Uninstalling ${chalk.grey(identifier)}`).start();

    // If we have a known package name for this then we can uninstall it from within cooresponding
    // package manager.
    const pkgName = storage.getPackageName();
    if (pkgName) {
      const language = storage.getSDKLanguage();
      await uninstallerFactory(language, storage)
        .then(() => {
          spinner.succeed(spinner.text);
        })
        .catch(err => {
          spinner.fail(spinner.text);
          logger(err.message, true);
          process.exit(1);
        });
    }

    spinner = ora(`Removing ${chalk.grey(directory)}`).start();
    await storage
      .remove()
      .then(() => {
        spinner.succeed(spinner.text);
      })
      .catch(err => {
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    logger('🚀 All done!');
  })
  .addHelpText(
    'after',
    `
Examples:
  $ npx api rebuild petstore`,
  );

export default cmd;
