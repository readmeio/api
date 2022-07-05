import { Command, Option } from 'commander';
import ora from 'ora';
import Oas from 'oas';

import codegen from '../codegen';
import Fetcher from '../../fetcher';
import Storage from '../storage';
import logger from '../logger';

import prompts from 'prompts';
import figures from 'figures';
import validateNPMPackageName from 'validate-npm-package-name';

// @todo log logs to `.api/.logs` and have `.logs` ignored
const cmd = new Command();
cmd
  .name('install')
  .description('install an API SDK into your codebase')
  .argument('<api>', 'an API to install')
  .addOption(
    new Option('-l, --lang <language>', 'SDK language')
      .choices(['javascript', 'js', 'typescript', 'ts'])
      .default('typescript')
  )
  .action(async (api: string, options: { lang: string }) => {
    // @todo let them know that we're going to be creating a `.api/ directory
    // @todo detect if they have a gitigore and .npmignore and if .api woudl be ignored by that
    // @todo don't support swagger files without upconverting them

    if (Storage.isInLockFile({ source: api })) {
      // @todo
      // logger(`It looks like you already have this API installed. Would you like to update it?`);
    }

    let identifier;
    if (Fetcher.isAPIRegistryUUID(api)) {
      identifier = Fetcher.getProjectPrefixFromRegistryUUID(api);
    } else {
      ({ value: identifier } = await prompts({
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
    const storage = new Storage(api, identifier);

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
    const generator = codegen(options.lang, oas, './openapi.json');
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

      await prompts({
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
