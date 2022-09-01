import type { SupportedLanguages } from '../codegen';

import { Command, Option } from 'commander';
import figures from 'figures';
import Oas from 'oas';
import ora from 'ora';
import validateNPMPackageName from 'validate-npm-package-name';

import Fetcher from '../../fetcher';
import codegen from '../codegen';
import promptTerminal from '../lib/prompt';
import logger from '../logger';
import Storage from '../storage';

// @todo log logs to `.api/.logs` and have `.logs` ignored
const cmd = new Command();
cmd
  .name('install')
  .description('install an API SDK into your codebase')
  .argument('<uri>', 'an API to install')
  .addOption(
    new Option('-l, --lang <language>', 'SDK language').choices([
      'js', // User generally wants JS, we'll prompt if they want CJS or ESM files.
      'js-cjs',
      'js-esm',
      'ts',
    ])
  )
  .action(async (uri: string, options: { lang: string }) => {
    let language: SupportedLanguages;
    if (options.lang) {
      language = options.lang as SupportedLanguages;
    } else {
      ({ value: language } = await promptTerminal({
        type: 'select',
        name: 'value',
        message: 'What language would you like to generate an SDK for?',
        choices: [
          { title: 'TypeScript', value: 'ts' },
          { title: 'JavaScript', value: 'js' },
        ],
        initial: 1,
      }));
    }

    // Because our TS generation outputs raw TS source files we don't need to worry about CJS/ESM.
    if (language === 'js') {
      ({ value: language } = await promptTerminal({
        type: 'select',
        name: 'value',
        message: 'How are your project imports and exports structured?',
        choices: [
          { title: 'CommonJS', description: 'require/exports', value: 'cjs' },
          { title: 'ECMAScript Modules', description: 'import/export', value: 'esm' },
        ],
        initial: 0,
        format: sel => (sel === 'cjs' ? 'js-cjs' : 'js-esm'),
      }));
    }

    // @todo let them know that we're going to be creating a `.api/ directory
    // @todo detect if they have a gitigore and .npmignore and if .api woudl be ignored by that
    // @todo don't support swagger files without upconverting them

    if (Storage.isInLockFile({ source: uri })) {
      // @todo
      // logger(`It looks like you already have this API installed. Would you like to update it?`);
    }

    let identifier;
    if (Fetcher.isAPIRegistryUUID(uri)) {
      identifier = Fetcher.getProjectPrefixFromRegistryUUID(uri);
    } else {
      ({ value: identifier } = await promptTerminal({
        type: 'text',
        name: 'value',
        message:
          'What would you like to identify this API as? This will be how you import the SDK. (e.g. entering `petstore` would result in `@api/petstore`)',
        validate: value => {
          if (!value) {
            return false;
          }

          // Is this identifier already in storage?
          if (Storage.isInLockFile({ identifier: value })) {
            return `"${value}" is already taken in your \`.api/\` directory. Please enter another identifier.`;
          }

          const isValidForNPM = validateNPMPackageName(`@api/${value}`);
          if (!isValidForNPM.validForNewPackages) {
            // `prompts` doesn't support surfacing multiple errors in a `validate` call so we can
            // only surface the first to the user.
            return isValidForNPM.errors[0];
          }

          return true;
        },
      }));
    }

    if (!identifier) {
      logger('You must tell us what you would like to identify this API as in order to install it.', true);
      process.exit(1);
    }

    let spinner = ora('Fetching your API').start();
    const storage = new Storage(uri, identifier);

    const oas = await storage
      .load()
      .then(res => {
        spinner.succeed(spinner.text);
        return res;
      })
      .then(Oas.init)
      .catch(err => {
        // @todo cleanup installed files
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    // @todo look for a prettier config and if we find one ask them if we should use it
    spinner = ora('Generating your SDK').start();
    const generator = codegen(language, oas, './openapi.json', identifier);
    const sdkSource = await generator
      .generator()
      .then(res => {
        spinner.succeed(spinner.text);
        return res;
      })
      .catch(err => {
        // @todo cleanup installed files
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    spinner = ora('Saving your SDK into your codebase').start();
    await storage
      .saveSourceFiles(sdkSource)
      .then(() => {
        spinner.succeed(spinner.text);
      })
      .catch(err => {
        // @todo cleanup installed files
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    if (generator.hasRequiredPackages()) {
      logger(`${figures.warning} This generator requires some packages to be installed alongside it:`);
      Object.entries(generator.requiredPackages).forEach(([pkg, pkgInfo]) => {
        logger(`  ${figures.pointerSmall} ${pkg}: ${pkgInfo.reason} ${pkgInfo.url}`);
      });

      await promptTerminal({
        type: 'confirm',
        name: 'value',
        message: 'OK to proceed with package installation?',
        initial: true,
      }).then(({ value }) => {
        if (!value) {
          // @todo cleanup installed files
          logger('Installation cancelled.', true);
          process.exit(1);
        }
      });

      spinner = ora('Installing required packages').start();
      try {
        await generator.installer(storage);
        spinner.succeed(spinner.text);
      } catch (err) {
        // @todo cleanup installed files
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      }
    }

    logger('🚀 All done!');
  })
  .addHelpText(
    'after',
    `
Examples:
  $ api install @developers/v2.0#nysezql0wwo236
  $ api install https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore-simple.json
  $ api install ./petstore.json`
  );

export default cmd;
