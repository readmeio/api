/* eslint-disable global-require */
/* eslint-disable mocha/no-setup-in-describe */
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
import chai, { expect } from 'chai';
import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';
import rimraf from 'rimraf';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import client from '../src';

chai.use(sinonChai);

const DATASETS_DIR = path.join(__dirname, 'datasets');
const SNIPPETS = readdirSync(DATASETS_DIR);

// eslint-disable-next-line mocha/no-exports
export interface SnippetMock {
  har: HarRequest;
  definition: OASDocument;
  fetch: {
    req: MockMatcher | MockOptions;
    res: Record<string, unknown>;
  };
}

function getSnippetDataset(snippet): Promise<SnippetMock> {
  return import(path.join(DATASETS_DIR, snippet, 'index')).then(r => r.default);
}

describe('httpsnippet-client-api', function () {
  beforeEach(function () {
    try {
      // Mocha doesn't tear this down so if you run Mocha with `--watch` it'll be set up already
      // throwing the error that we're ignoring below.
      addTargetClient('node', client as Client);
    } catch (err) {
      if (err.message !== 'The supplied custom target client already exists, please use a different key') {
        throw err;
      }
    }
  });

  it('should have info', function () {
    expect(client).to.have.property('info');
    expect(client.info).to.deep.equal({
      key: 'api',
      title: 'API',
      link: 'https://npm.im/api',
      description: 'Automatic SDK generation from an OpenAPI definition.',
    });
  });

  it('should error if no apiDefinitionUri was supplied', async function () {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api');
    }).to.throw(/must have an `apiDefinitionUri` option supplied/);
  });

  it('should error if no apiDefinition was supplied', async function () {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api', {
        apiDefinitionUri: 'https://api.example.com/openapi.json',
      });
    }).to.throw(/must have an `apiDefinition` option supplied/);
  });

  // This test should fail because the url in the HAR is missing `/v1` in the path.
  it('should error if no matching operation was found in the apiDefinition', function () {
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
    }).to.throw(/unable to locate a matching operation/i);
  });

  describe('snippets', function () {
    SNIPPETS.forEach(snippet => {
      describe(snippet, function () {
        let mock: SnippetMock;
        let consoleStub;

        beforeEach(async function () {
          try {
            // Since we're doing integration testing with these snippets against the real `api`
            // library we should clear out the cache that it creates so our tests will run in a
            // cleanroom environment.
            rimraf.sync(path.join(__dirname, '../node_modules/.cache/api'));
          } catch (err) {
            // If we couldn't delete the `api` specs cache then it probably doesn't exist yet.
          }

          consoleStub = sinon.stub(console, 'log');

          mock = await getSnippetDataset(snippet);

          // `OpenAPIParser.validate()` updates the spec that's passed and we just want to validate
          // it here so we need to clone the object.
          const spec = JSON.parse(JSON.stringify(mock.definition));
          await openapiParser.validate(spec);
        });

        afterEach(function () {
          consoleStub.restore();
          fetchMock.restore();
        });

        it('should generate the expected snippet', async function () {
          const expected = await fs.readFile(path.join(DATASETS_DIR, snippet, 'output.js'), 'utf-8');

          const code = new HTTPSnippet(mock.har).convert('node', 'api', {
            apiDefinitionUri: `https://api.example.com/${snippet}.json`,
            apiDefinition: mock.definition,
          });

          expect(`${code}\n`).to.equal(expected);
        });

        it('should generate a functional snippet', async function () {
          if (!mock.fetch.req || !mock.fetch.res) {
            throw new Error(
              `The mock definition for ${snippet} must include required \`req\` and \`res\` expectations.`
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

          expect(consoleStub).to.be.calledWith(`The ${snippet} request works properly!`);
        });
      });
    });
  });
});
