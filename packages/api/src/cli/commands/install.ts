import { Command, Option } from 'commander';
import ora from 'ora';
import Oas from 'oas';
// import { Listr } from 'listr2';
// import * as pkg from '../../packageInfo';

import codegen from '../../codegen';
import Fetcher from '../../fetcher';
import Storage from '../storage';
import logger from '../logger';

import prompts from 'prompts';
import validateNPMPackageName from 'validate-npm-package-name';

// @todo log logs to `.api/.logs` and have `.logs` ignored
const cmd = new Command();
cmd
  .name('install')
  .description('install an API SDK into your codebase')
  .argument('<api>', 'an API to install')
  .addOption(
    new Option('-l, --lang <language>, --language <language>', 'SDK language')
      .choices(['typescript'])
      .default('typescript')
  )
  .action(async (api: string, options: { language: string }) => {
    // @todo let them know that we're going to be creating a `.api/ directory
    // @todo detect if they have a gitigore and .npmignore and if .api woudl be ignored by that
    if (options.language === 'typescript') {
      // @todo let them know that we're going to be and adding `api` and `oas` into their `package.json`
    }

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
          'What would you like to identify this API as? This will be how you import the SDK. (eg. entering `petstore` would result in `@api/petstore`)',
        validate: value => {
          // Is this identifier already in storage?
          // if (Storage.isInLockFile({ identifier: value })) {
          //   return `"${value}" is already taken in your \`.api/\` directory. Please enter another identifier.`;
          // }

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
      logger('You must tell us what you would liek to identify this API as in order to install it.', true);
      process.exit(1);
    }

    let spinner = ora('Fetching your API').start();
    const storage = new Storage(api, identifier);

    const oas = await storage
      .load()
      .then(res => {
        spinner.succeed(spinner.text);
        // console.log(Object.keys(res))
        return res;
      })
      .then(Oas.init)
      .catch(err => {
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    // @todo look for a prettier config and if we find one ask them if we should use it
    spinner = ora('Generating your SDK').start();
    const sdkSource = await codegen('ts', oas, './openapi.json')
      .generator()
      .then(res => {
        spinner.succeed(spinner.text);
        return res;
      })
      .catch(err => {
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
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    // @todo save `api` and `oas` into their `package.json`

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
