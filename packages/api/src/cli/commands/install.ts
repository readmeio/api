import type { Ora } from 'ora';

import { Command, Option } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import Oas from 'oas';
// import { Listr } from 'listr2';
// import * as pkg from '../../packageInfo';

import generator from '../../codegen';
import Fetcher from '../../fetcher';
import logger from '../logger';

// ////////////////////////////////////////////////////////////////////////////
import { inspect } from 'util';

declare global {
  interface Console {
    logx: any;
  }
}

console.logx = (obj: any) => {
  console.log(inspect(obj, false, null, true));
};
// ////////////////////////////////////////////////////////////////////////////

const cmd = new Command();
cmd
  .name('install')
  .description('install an API SDK into your codebase')
  .argument('<api>', 'an API to install')
  // .addOption(
  //   new Option('-l, --lang <language>, --language <language>', 'SDK language')
  //     .choices(['typescript'])
  //     .default('typescript')
  // )
  .action(async (api: string, options: { language: string }, command: Command) => {
    console.logx({
      api,
      options,
      cmd: command.name(),
    });

    // @todo don't support swagger files without upconverting them
    // @todo let them know we're going to add `api` and `oas` into their deps
    // @todo look for a prettier config and if we find one ask them if we should use it
    // @todo log logs to `.api/.logs` and have `.logs` ignored
    // @todo defualt as `.api/petstore/index.ts` like `npm init`
    // @todo add step to save deps to the package.json
    // @todo detect if they have a gitigore and .npmignore and if .api woudl be ignored by that

    let spinner = ora('Fetching your API').start();
    const oas = await new Fetcher(api)
      .load()
      .then(res => {
        spinner.succeed(spinner.text);
        return res;
      })
      .then(Oas.init)
      .catch(err => {
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    spinner = ora('Generating your SDK').start();
    const codegen = generator('ts', oas, './openapi.json');
    await codegen
      .generator()
      .then(res => {
        console.log(res);
        spinner.succeed(spinner.text);
      })
      .catch(err => {
        spinner.fail(spinner.text);
        logger(err.message, true);
        process.exit(1);
      });

    // await new Promise((resolve, reject) => {
    //   spinner = ora('Generating your SDK [@todo]').start();
    //   setTimeout(() => {
    //     spinner.succeed(spinner.text);
    //     resolve('done');
    //   }, 1000);
    // });

    // await new Promise((resolve, reject) => {
    //   spinner = ora('Saving your SDK to your codebase [@todo]').start();
    //   setTimeout(() => {
    //     spinner.succeed(spinner.text);
    //     resolve('done');
    //   }, 1000);
    // });

    // await new Promise((resolve, reject) => {
    //   console.log('');
    //   console.log('🚀 All done! [put some text here on how to use the sdk or link them to a page on our docs?]')
    //   resolve('done');
    // });
  })
  .addHelpText(
    'after',
    `
Examples:
  $ api install @developers/v2.0#nysezql0wwo236
  $ api install https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json
  $ api install ./petstore.json`
  );

export default cmd;

// const program = new Command();

// program.name('api');
// program.option('--first').option('-s, --separator <char>');
// program.parse();

// const spinner = ora('Loading unicorns').start();

// setTimeout(() => {
//   spinner.color = 'yellow';
//   spinner.text = 'Loading rainbows';
//   spinner.info('Done!');
// }, 1000);

// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// // console.log(program)
// // console.log(program.args[0].split(options.separator, limit));


// const sdk = require('api/async')('@developers/v2.0#nysezql0wwo236');
// const sdk = require('api')('readme');

// sdk.getAPIRegistry({uuid: 'uuid'})
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
