/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable mocha/no-setup-in-describe */
const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const vm = require('vm');
const rimraf = require('rimraf');
const fs = require('fs/promises');
const HTTPSnippet = require('@readme/httpsnippet');
const path = require('path');
const nock = require('nock');
const client = require('../src');
const readme = require('@readme/oas-examples/3.0/json/readme.json');

chai.use(sinonChai);

const DATASETS_DIR = path.join(__dirname, '__datasets__');
const SNIPPETS = require('fs').readdirSync(DATASETS_DIR);

async function getSnippetDataset(snippet) {
  const SNIPPET_DIR = path.join(DATASETS_DIR, snippet);

  const har = await fs
    .stat(path.join(SNIPPET_DIR, 'har.json'))
    .then(() => require(path.join(SNIPPET_DIR, 'har.json')))
    .catch(() => {
      return fs
        .stat(path.join(SNIPPET_DIR, 'har.js'))
        .then(() => require(path.join(SNIPPET_DIR, 'har.js')))
        .catch(() => {
          throw new Error(`The ${snippet} dataset has neither a "har.js" or "har.json" present.`);
        });
    });

  const definition = await fs
    .stat(path.join(SNIPPET_DIR, 'openapi.json'))
    .then(() => require(path.join(SNIPPET_DIR, 'openapi.json')))
    .catch(() => {
      return fs
        .stat(path.join(SNIPPET_DIR, 'openapi.js'))
        .then(() => require(path.join(SNIPPET_DIR, 'openapi.js')))
        .catch(() => {
          throw new Error(`The ${snippet} dataset has neither a "openapi.js" or "openapi.json" present.`);
        });
    });

  const mock = await fs
    .stat(path.join(SNIPPET_DIR, 'mock.json'))
    .then(() => require(path.join(SNIPPET_DIR, 'mock.json')))
    .catch(() => {
      return fs
        .stat(path.join(SNIPPET_DIR, 'mock.js'))
        .then(() => require(path.join(SNIPPET_DIR, 'mock.js')))
        .catch(() => {
          throw new Error(`The ${snippet} dataset has neither a "mock.js" or "mock.json" present.`);
        });
    });

  return [har, definition, mock];
}

describe('httpsnippet-client-api', function () {
  beforeEach(function () {
    try {
      // Mocha doesn't tear this down so if you run Mocha with `--watch` it'll be set up already
      // throwing the error that we're ignoring below.
      HTTPSnippet.addTargetClient('node', client);
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
    const [har] = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api');
    }).to.throw(/must have an `apiDefinitionUri` option supplied/);
  });

  it('should error if no apiDefinition was supplied', async function () {
    const [har] = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api', {
        apiDefinitionUri: 'https://example.com/openapi.json',
      });
    }).to.throw(/must have an `apiDefinition` option supplied/);
  });

  // This test should fail because the url in the HAR is missing `/v1` in the path.
  it('should error if no matching operation was found in the apiDefinition', function () {
    const har = {
      bodySize: 0,
      cookies: [],
      headers: [],
      headersSize: 0,
      httpVersion: 'HTTP/1.1',
      method: 'GET',
      queryString: [
        { name: 'perPage', value: '10' },
        { name: 'page', value: '1' },
      ],
      url: 'https://dash.readme.com/api/api-specification',
    };

    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api', {
        apiDefinitionUri: 'https://example.com/openapi.json',
        apiDefinition: readme,
      });
    }).to.throw(/unable to locate a matching operation/i);
  });

  describe('snippets', function () {
    SNIPPETS.forEach(snippet => {
      describe(snippet, function () {
        let consoleStub;

        beforeEach(function () {
          try {
            // Since we're doing integration testing with these snippets against the real `api`
            // library we should clear out the cache that it creates so our tests will run in a
            // cleanroom environment.
            rimraf.sync(path.join(__dirname, '../node_modules/.cache/api'));
          } catch (err) {
            // If we couldn't delete the `api` specs cache then it probably doesn't exist yet.
          }

          consoleStub = sinon.stub(console, 'log');
        });

        afterEach(function () {
          consoleStub.restore();
        });

        it('should generate the expected snippet', async function () {
          const [har, definition] = await getSnippetDataset(snippet);
          const expected = await fs.readFile(path.join(DATASETS_DIR, snippet, 'output.js'), 'utf-8');

          const code = new HTTPSnippet(har).convert('node', 'api', {
            apiDefinitionUri: 'https://example.com/openapi.json',
            apiDefinition: definition,
          });

          expect(`${code}\n`).to.equal(expected);
        });

        it('should generate a functional snippet', async function () {
          const [, definition, mock] = await getSnippetDataset(snippet);
          const nocks = nock.define([
            {
              scope: 'https://example.com',
              method: 'GET',
              path: `/openapi-${snippet}.json`,
              status: 200,
              response: definition,
            },
            { ...mock, response: `The ${snippet} request works properly!` },
          ]);

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
              sdk: require('api')(`https://example.com/openapi-${snippet}.json`),

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

          nocks.forEach(n => n.done());
        });
      });
    });
  });
});
