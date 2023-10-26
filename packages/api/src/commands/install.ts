import type { SupportedLanguage } from '../codegen/factory.js';

import chalk from 'chalk';
import { Command, Option } from 'commander';
import { emphasize } from 'emphasize';
import figures from 'figures';
import Oas from 'oas';
import ora from 'ora';
import uslug from 'uslug';

import { SupportedLanguages, codegenFactory } from '../codegen/factory.js';
import Fetcher from '../fetcher.js';
import promptTerminal from '../lib/prompt.js';
import { buildCodeSnippetForOperation, getSuggestedOperation } from '../lib/suggestedOperations.js';
import logger from '../logger.js';
import Storage from '../storage.js';

interface Options {
  identifier?: string;
  lang: SupportedLanguage;
  yes?: boolean;
}

async function getLanguage(options: Options) {
  let language: SupportedLanguage;
  if (options.lang) {
    language = options.lang;
  } else {
    ({ value: language } = await promptTerminal({
      type: 'select',
      name: 'value',
      message: 'What language would you like to generate an SDK for?',
      choices: [{ title: 'JavaScript', value: SupportedLanguages.JS }],
      initial: 1,
    }));
  }

  return language;
}

async function getIdentifier(oas: Oas, uri: string, options: Options) {
  let identifier;
  if (options.identifier) {
    // `Storage.isIdentifierValid` will throw an exception if an identifier is invalid.
    if (Storage.isIdentifierValid(options.identifier)) {
      identifier = options.identifier;
    }
  } else if (Fetcher.isAPIRegistryUUID(uri)) {
    identifier = Fetcher.getProjectPrefixFromRegistryUUID(uri);
  } else {
    ({ value: identifier } = await promptTerminal({
      type: 'text',
      name: 'value',
      initial: oas.api?.info?.title ? uslug(oas.api.info.title, { lower: true }) : undefined,
      message:
        'What would you like to identify this API as? This will be how you use the SDK. (e.g. entering `petstore` would result in `@api/petstore`)',
      validate: value => {
        if (!value) {
          return false;
        }

        try {
          return Storage.isIdentifierValid(value, true);
        } catch (err) {
          return err.message;
        }
      },
    }));
  }

  return identifier;
}

async function getExampleCodeSnippet(oas: Oas, identifier: string) {
  const operation = getSuggestedOperation(oas);
  if (!operation) {
    return false;
  }

  return buildCodeSnippetForOperation(oas, operation, { identifier });
}

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
  .action(async (uri: string, options: Options) => {
    const language = await getLanguage(options);

    // @todo let them know that we're going to be creating a `.api/ directory
    // @todo detect if they have a gitigore and .npmignore and if .api woudl be ignored by that
    // @todo don't support swagger files without upconverting them

    if (Storage.isInLockFile({ source: uri })) {
      // @todo
      // logger(`It looks like you already have this API installed. Would you like to update it?`);
    }

    let spinner = ora('Fetching your API definition').start();
    const storage = new Storage(uri, language);

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

    const identifier = await getIdentifier(oas, uri, options);
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

    logger('');
    logger(
      `🚀 All done! Your SDK is now available to use locally via the ${chalk.yellow(
        storage.getPackageName(),
      )} package.`,
    );

    const exampleSnippet = await getExampleCodeSnippet(oas, identifier);
    if (exampleSnippet) {
      logger('');
      logger(chalk.bold("👇 Here's an example code snippet you can try out 👇"));
      logger('');
      logger(emphasize.highlight(language, exampleSnippet).value);
    }
    logger('');
  })
  .addHelpText(
    'after',
    `
Examples:
  $ npx api install @developers/v2.0#nysezql0wwo236
  $ npx api install https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore-simple.json
  $ npx api install ./petstore.json`,
  );

export default cmd;
