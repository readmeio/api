import path from 'node:path';

import { logger, oraOptions } from '@readme/api-shared';
import chalk from 'chalk';
import { Command, Option } from 'commander';
import ora from 'ora';

import { SupportedLanguages, uninstallerFactory } from '../codegen/factory.js';
import promptTerminal from '../lib/prompt.js';
import Storage from '../storage.js';

interface Options {
  yes?: boolean;
}

const cmd = new Command();
cmd
  .name('uninstall')
  .description('uninstall an SDK from your codebase')
  .argument('<identifier>', 'the SDK to uninstall')
  .addOption(new Option('-y, --yes', 'Automatically answer "yes" to any prompts printed'))
  .action(async (identifier: string, options: Options) => {
    // We don't know if we have `identifier` in the storage system yet, we just need to preload the
    // system so we can access lockfiles.
    const storage = new Storage('', SupportedLanguages.JS, identifier);

    const entry = Storage.getFromLockfile(identifier);
    if (!entry) {
      throw new Error(
        `You do not appear to have ${identifier} installed. You can run \`npx api list\` to see what SDKs are present.`,
      );
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
          throw new Error('Uninstallation cancelled.');
        }
      });
    }

    let spinner = ora({ text: `Uninstalling ${chalk.grey(identifier)}`, ...oraOptions() }).start();

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
          throw err;
        });
    }

    spinner = ora({ text: `Removing ${chalk.grey(directory)}`, ...oraOptions() }).start();
    await storage
      .remove()
      .then(() => {
        spinner.succeed(spinner.text);
      })
      .catch(err => {
        spinner.fail(spinner.text);
        throw err;
      });

    logger('🚀 All done!');
  })
  .addHelpText(
    'after',
    `
Examples:
  $ npx api uninstall petstore`,
  );

export default cmd;
