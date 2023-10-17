import { Command, Option } from 'commander';
import figures from 'figures';
import Oas from 'oas';
import ora from 'ora';
import uslug from 'uslug';

import codegenFactory, { SupportedLanguages } from '../codegen/factory.js';
import Fetcher from '../fetcher.js';
import promptTerminal from '../lib/prompt.js';
import logger from '../logger.js';
import Storage from '../storage.js';

import { confirmProposedIdentifier, promptForIdentifier } from './prompts/index.js';

// @todo log logs to `.api/.logs` and have `.logs` ignored
const cmd = new Command();
cmd
  .name('install')
  .description('install an API SDK into your codebase')
  .argument('<uri>', 'an API to install')
  .option('-i, --identifier <identifier>', 'API identifier (eg. `@api/petstore`)')
  .addOption(
    new Option('-l, --lang <language>', 'SDK language').default(SupportedLanguages.JS).choices([SupportedLanguages.JS]),
  )
  .addOption(new Option('-y, --yes', 'Automatically answer "yes" to any prompts printed'))
  .action(async (uri: string, options: { identifier?: string; lang: string; yes?: boolean }) => {
    let language: SupportedLanguages;
    if (options.lang) {
      language = options.lang as SupportedLanguages;
    } else {
      ({ value: language } = await promptTerminal({
        type: 'select',
        name: 'value',
        message: 'What language would you like to generate an SDK for?',
        choices: [{ title: 'JavaScript', value: SupportedLanguages.JS }],
        initial: 1,
      }));
    }

    // @todo let them know that we're going to be creating a `.api/ directory
    // @todo detect if they have a gitigore and .npmignore and if .api woudl be ignored by that
    // @todo don't support swagger files without upconverting them

    if (Storage.isInLockFile({ source: uri })) {
      // @todo
      // logger(`It looks like you already have this API installed. Would you like to update it?`);
    }

    let spinner = ora('Fetching your API').start();
    const storage = new Storage(uri);

    const oas = await storage
      .load(false)
      .then(res => {
        spinner.succeed(spinner.text);
        return res;
      })
      .then(Oas.init)
      .then(async spec => {
        await spec.dereference({ preserveRefAsJSONSchemaTitle: true });
        return spec;
      })
      .catch(err => {
        // @todo cleanup installed files
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    let identifier;
    if (options.identifier) {
      // `Storage.isIdentifierValid` will throw an exception if an identifier is invalid.
      if (Storage.isIdentifierValid(options.identifier)) {
        identifier = options.identifier;
      }
    } else if (Fetcher.isAPIRegistryUUID(uri)) {
      identifier = Fetcher.getProjectPrefixFromRegistryUUID(uri);
    } else if (oas.api?.info?.title) {
      identifier = uslug(oas.api.info.title, { lower: true });

      // let useInfoAsIdentifier;
      const { value: confirmation } = await confirmProposedIdentifier(oas.api.info.title, identifier);
      if (!confirmation) {
        // If they don't like what we picked from the spec info doc then let's have them tell us
        // what they want.
        ({ value: identifier } = await promptForIdentifier(false));
      }
    } else {
      ({ value: identifier } = await promptForIdentifier());
    }

    if (!identifier) {
      logger('You must tell us what you would like to identify this API as in order to install it.', true);
      process.exit(1);
    }

    // Now that we've got an identifier we can save their spec and generate the directory structure
    // for their SDK.
    storage.setIdentifier(identifier);
    await storage.save(oas.api);

    // @todo look for a prettier config and if we find one ask them if we should use it
    spinner = ora('Generating your SDK').start();
    const generator = codegenFactory(language, oas, '../openapi.json', identifier);
    const sdkSource = await generator
      .generate()
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
        let msg = `  ${figures.pointerSmall} ${pkg}: ${pkgInfo.reason}`;
        if (pkgInfo.url) {
          msg += ` ${pkgInfo.url}`;
        }

        logger(msg);
      });

      if (!options.yes) {
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
      }

      spinner = ora('Installing required packages').start();
      try {
        await generator.install(storage);
        spinner.succeed(spinner.text);
      } catch (err) {
        // @todo cleanup installed files
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      }
    }

    spinner = ora('Compiling your SDK').start();
    try {
      await generator.compile(storage);
      spinner.succeed(spinner.text);
    } catch (err) {
      // @todo cleanup installed files
      spinner.fail(spinner.text);
      logger(err.message, true);
      process.exit(1);
    }

    logger('🚀 All done!');
  })
  .addHelpText(
    'after',
    `
Examples:
  $ api install @developers/v2.0#nysezql0wwo236
  $ api install https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore-simple.json
  $ api install ./petstore.json`,
  );

export default cmd;
