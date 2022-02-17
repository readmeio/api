import 'isomorphic-fetch';
import { CliUx, Command, Flags } from '@oclif/core';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import * as inquirer from 'inquirer';
import * as yaml from 'js-yaml';
import OpenAPIParser from '@readme/openapi-parser';

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

export default class Install extends Command {
  static description = 'Generate and install an SDK for an OpenAPI definition';

  // static examples = [
  //   '<%= config.bin %> <%= command.id %>',
  // ]

  static flags = {
    language: Flags.enum({
      char: 'l',
      description: 'SDK language',
      default: 'typescript',
      options: ['typescript'],
    }),

    // flag with a value (-n, --name=VALUE)
    // name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: Flags.boolean({char: 'f'}),
  };

  static args = [
    {
      name: 'uri',
      description: 'API definition URL, company, or ReadMe specification UUID to install',
      required: true,
      // default: 'readme',
      // default: '@developers/v2.0#5p9er16kx9dx3ib',
      default: 'https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json',
      // default: './petstore.json',
      parse: (uri: any) => {
        // readme
        // @developers/v2.0#5p9er16kx9dx3ib
        // https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json
        // ./petstore.json
        return typeof uri === 'string'
          ? uri.replace(/^@[a-zA-Z0-9-_]+\/?(.+)#([a-z0-9]+)$/, 'https://dash.readme.com/api/v1/api-registry/$2')
          : uri;
      },
    },
  ];

  async catch(err: Error) {
    // Close any running spinner.
    CliUx.ux.action.stop('🚨');

    // `@readme/openapi-parser` sometimes doesn't give the best error messages for invalid specs
    // so we need to clean it up a bit.
    if (/is not a valid openapi definition/i.test(err.message)) {
      throw new Error("Sorry, that doesn't look like a valid OpenAPI definition.");
    }

    throw err;
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Install);

    const uri = args.uri;

    let language = flags.language;
    if (!language) {
      const responses: any = await inquirer.prompt([
        {
          name: 'language',
          message: 'Select an SDK language',
          type: 'list',
          choices: [{ name: 'TypeScript' }],
        },
      ]);

      language = responses.language;
    }

    /**
     * Fetch the API definition
     */
    CliUx.ux.action.start('Retrieving');

    const json: any = await Install.fetchURI(uri).then(res => {
      CliUx.ux.action.stop('✅');
      return res;
    });

    /**
     * Validate and dereference the API definition
     */
    CliUx.ux.action.start('Validating and preparing');

    const spec = await OpenAPIParser.validate(json, {
      dereference: {
        // If circular `$refs` are ignored they'll remain in the API definition as `$ref: String`.
        // This allows us to not only do easy circular reference detection but also stringify and
        // save dereferenced API definitions back into the cache directory.
        circular: 'ignore',
      },
    }).then(res => {
      CliUx.ux.action.stop('✅');
      return res;
    });

    /**
     * Transform the API definition into an AST
     */
    // save this to the filesystem so we can build an `update` command.
    const hash = crypto.createHash('sha256').update(JSON.stringify(spec)).digest('hex');
    this.log(` · Your unique API definition hash is ${hash}`);

    /**
     * Build out an SDK for the selected language
     */


    // console.logx({
    //   args,
    //   flags,
    //   dirs: {
    //     dataDir: this.config.dataDir,
    //     cacheDir: this.config.cacheDir,
    //     configDir: this.config.configDir
    //   }
    // })

    // const name = flags.uri ?? 'world';
    // this.log(`hello ${name} from /Users/erunion/code/readmeio/api/packages/cli/src/commands/inst.ts`);
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`);
    // }
  }

  static async fetchURI(uri: string) {
    try {
      const url = new URL(uri);

      return Install.fetchURL(url);
    } catch (err) {
      // Support relative paths by resolving them against the cwd.
      const file = path.resolve(process.cwd(), uri);

      return Install.fetchFile(file);
    }
  }

  static fetchURL(url: URL) {
    return fetch(url.href)
      .then(res => {
        if (!res.ok) {
          if (res.status === 401 && res.headers.has('www-authenticate')) {
            // @todo we should automatically prompt the user for auth credentials
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
            throw new Error(`Unable to fetch ${url} as it requires authorization.`);
          }

          throw new Error(`Unable to retrieve URL. Reason: ${res.statusText}`);
        }

        if (res.headers.get('content-type') === 'application/yaml' || /\.(yaml|yml)/.test(url.href)) {
          return res.text().then(text => {
            return yaml.load(text);
          });
        }

        return res.json();
      })
      .then((json: Record<string, unknown>) => json);
  }

  static fetchFile(file: string) {
    if (!fs.existsSync(file)) {
      throw new Error(
        `Sorry, we were unable to load that OpenAPI definition. Please either supply a URL or a path on your filesystem.`
      );
    }

    return Promise.resolve(fs.readFileSync(file, 'utf8'))
      .then(res => {
        if (/\.(yaml|yml)/.test(file)) {
          return yaml.load(res as string);
        }

        return JSON.parse(res as string);
      })
      .then((json: Record<string, unknown>) => json);
  }
}
