/* eslint-disable global-require */
import type { HarRequest, Request } from '@readme/httpsnippet';
import type { Client } from '@readme/httpsnippet/dist/targets/targets';
import type { MockMatcher, MockOptions } from 'fetch-mock';
import type { OASDocument } from 'oas/dist/rmoas.types';

import { readdirSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import vm from 'vm';

import { HTTPSnippet, addTargetClient } from '@readme/httpsnippet';
import readme from '@readme/oas-examples/3.0/json/readme.json';
import openapiParser from '@readme/openapi-parser';
import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';
import rimraf from 'rimraf';

import client from '../src';

const DATASETS_DIR = path.join(__dirname, '__datasets__');
const SNIPPETS = readdirSync(DATASETS_DIR);

export interface SnippetMock {
  definition: OASDocument;
  fetch: {
    req: MockMatcher | MockOptions;
    res: Record<string, unknown>;
  };
  har: HarRequest;
}

function getSnippetDataset(snippet): Promise<SnippetMock> {
  return import(path.join(DATASETS_DIR, snippet, 'index')).then(r => r.default);
}

describe('httpsnippet-client-api', () => {
  beforeEach(() => {
    try {
      addTargetClient('node', client as Client);
    } catch (err) {
      if (err.message !== 'The supplied custom target client already exists, please use a different key') {
        throw err;
      }
    }
  });

  it('should have info', () => {
    expect(client).toHaveProperty('info');
    expect(client.info).toStrictEqual({
      key: 'api',
      title: 'API',
      link: 'https://npm.im/api',
      description: 'Automatic SDK generation from an OpenAPI definition.',
    });
  });

  it('should error if no apiDefinitionUri was supplied', async () => {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api');
    }).toThrow(/must have an `apiDefinitionUri` option supplied/);
  });

  it('should error if no apiDefinition was supplied', async () => {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api', {
        apiDefinitionUri: 'https://api.example.com/openapi.json',
      });
    }).toThrow(/must have an `apiDefinition` option supplied/);
  });

  // This test should fail because the url in the HAR is missing `/v1` in the path.
  it('should error if no matching operation was found in the apiDefinition', () => {
    const har = {
      httpVersion: 'HTTP/1.1',
      method: 'GET',
      queryString: [
        { name: 'perPage', value: '10' },
        { name: 'page', value: '1' },
      ],
      url: 'https://dash.readme.com/api/api-specification',
    };

    const snippet = new HTTPSnippet(har as Request);

    expect(() => {
      snippet.convert('node', 'api', {
        apiDefinitionUri: 'https://api.example.com/openapi.json',
        apiDefinition: readme,
      });
    }).toThrow(/unable to locate a matching operation/i);
  });

  describe('snippets', () => {
    SNIPPETS.forEach(snippet => {
      describe(`${snippet}`, () => {
        let mock: SnippetMock;
        let consoleStub;

        beforeEach(async () => {
          try {
            // Since we're doing integration testing with these snippets against the real `api`
            // library we should clear out the cache that it creates so our tests will run in a
            // cleanroom environment.
            rimraf.sync(path.join(__dirname, '../node_modules/.cache/api'));
          } catch (err) {
            // If we couldn't delete the `api` specs cache then it probably doesn't exist yet.
          }

          consoleStub = jest.spyOn(console, 'log').mockImplementation();

          mock = await getSnippetDataset(snippet);

          // `OpenAPIParser.validate()` updates the spec that's passed and we just want to validate
          // it here so we need to clone the object.
          const spec = JSON.parse(JSON.stringify(mock.definition));
          await openapiParser.validate(spec);
        });

        afterEach(() => {
          consoleStub.mockRestore();
          fetchMock.restore();
        });

        it('should generate the expected snippet', async () => {
          const expected = await fs.readFile(path.join(DATASETS_DIR, snippet, 'output.js'), 'utf-8');

          const code = new HTTPSnippet(mock.har).convert('node', 'api', {
            apiDefinitionUri: `https://api.example.com/${snippet}.json`,
            apiDefinition: mock.definition,
          });

          expect(`${code}\n`).toStrictEqual(expected);
        });

        it('should generate a functional snippet', async () => {
          // eslint-disable-next-line jest/no-if
          if (!mock.fetch.req || !mock.fetch.res) {
            throw new Error(
              `The mock definition for ${snippet} must include required \`req\` and \`res\` expectations.`,
            );
          }

          fetchMock.get(`https://api.example.com/${snippet}.json`, { status: 200, body: mock.definition });
          fetchMock.mock(mock.fetch.req, {
            ...mock.fetch.res,
            body: `The ${snippet} request works properly!`,
          });

          const code = await fs.readFile(path.join(DATASETS_DIR, snippet, 'output.js'), 'utf-8').then(str => {
            // So we can test these snippets within a Node VM environment we need to remove the api
            // require statement off (as we'll be handling that ourselves), and also set up the
            // promise within the snippet to be returned so that we can containerize it within
            // another promise.
            const lines = str.split('\n').slice(2);

            // If the first non-require statement in our snippet is an `sdk.auth()` or
            // `sdk.server()` call then we should add our `return` statement to the following. We
            // currently don't have any tests that test both auth and alternate servers so we don't
            // need to worry about that.
            if (lines[0].startsWith('sdk.auth(') || lines[0].startsWith('sdk.server')) {
              lines[1] = `return ${lines[1]}`;
            } else {
              lines[0] = `return ${lines[0]}`;
            }

            return lines.join('\n');
          });

          await new Promise((resolve, reject) => {
            const sandbox = {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              sdk: require('api')(`https://api.example.com/${snippet}.json`),

              // So we can access logged data from our snippets within the VM we need to set the
              // global `console` object within it to our current one so that the stub we're
              // creating above will have visibility into what the VM is doing.
              console,

              // So we can await for responses from the async snippets we've got in the VM we need
              // to set some global `resolve` and `reject` methods inside the VM to the current
              // of the same in this Promise so that when they're called from within the context of
              // the VM environment the this Promise will also be resolved/rejected.
              // https://stackoverflow.com/a/60216761
              resolve,
              reject,
            };

            const vmCode = `Promise.resolve().then(() => {
              ${code}
            }).then(res => {
              resolve();
            }).catch(err => {
              reject(err.message);
            })`;

            const script = new vm.Script(vmCode);
            const context = vm.createContext(sandbox);
            script.runInContext(context);
          });

          expect(consoleStub).toHaveBeenCalledWith(`The ${snippet} request works properly!`);
        });
      });
    });
  });
});
