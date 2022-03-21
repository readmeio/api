/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable mocha/no-setup-in-describe */
const { expect } = require('chai');
const fs = require('fs/promises');
const HTTPSnippet = require('@readme/httpsnippet');
const path = require('path');
const client = require('../src');
const readme = require('@readme/oas-examples/3.0/json/readme.json');
const security = require('@readme/oas-examples/3.0/json/security.json');

const DATASETS_DIR = path.join(__dirname, '__datasets__');
const snippets = require('fs').readdirSync(DATASETS_DIR);

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
    const har = await fs.readFile(path.join(__dirname, './__fixtures__/request/petstore/har.json'), 'utf8');
    const snippet = new HTTPSnippet(JSON.parse(har));

    expect(() => {
      snippet.convert('node', 'api');
    }).to.throw(/must have an `apiDefinitionUri` option supplied/);
  });

  it('should error if no apiDefinition was supplied', async function () {
    const har = await fs.readFile(path.join(__dirname, './__fixtures__/request/petstore/har.json'), 'utf8');
    const snippet = new HTTPSnippet(JSON.parse(har));

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

  describe('auth handling', function () {
    describe('basic', function () {
      [
        ['should not encode basic auth in the `.auth()` call', 'buster:pug', "sdk.auth('buster', 'pug')"],
        ["should be able to handle basic auth that's just a username", 'buster:', "sdk.auth('buster')"],
        ["should be able to handle basic auth that's just a password", ':pug', "sdk.auth('', 'pug')"],
      ].forEach(([_, authKey, expected]) => {
        it(`${_}`, function () {
          const har = {
            bodySize: 0,
            cookies: [],
            headers: [
              {
                name: 'Authorization',
                value: `Basic ${Buffer.from(authKey).toString('base64')}`,
              },
            ],
            headersSize: 0,
            httpVersion: 'HTTP/1.1',
            method: 'GET',
            queryString: [
              { name: 'perPage', value: '10' },
              { name: 'page', value: '1' },
            ],
            url: 'https://dash.readme.com/api/v1/api-specification',
          };

          const code = new HTTPSnippet(har).convert('node', 'api', {
            apiDefinitionUri: 'https://example.com/openapi.json',
            apiDefinition: readme,
          });

          expect(code).to.contain(expected);
        });
      });
    });

    describe('bearer', function () {
      it('should be able to handle bearer auth', function () {
        const har = {
          bodySize: 0,
          cookies: [],
          headers: [
            {
              name: 'Authorization',
              value: `Bearer myBearerToken`,
            },
          ],
          headersSize: 0,
          httpVersion: 'HTTP/1.1',
          method: 'POST',
          url: 'https://httpbin.org/bearer',
        };

        const code = new HTTPSnippet(har).convert('node', 'api', {
          apiDefinitionUri: 'https://example.com/openapi.json',
          apiDefinition: security,
        });

        expect(code).to.contain("sdk.auth('myBearerToken')");
      });
    });
  });

  describe.only('snippets', function () {
    snippets.forEach(snippet => {
      it(`should generate \`${snippet}\` snippet`, async function () {
        if (snippet === 'output' || snippet === 'request') {
          this.skip();
        }

        // Cookies test needs to get built out.
        if (snippet === 'cookies') {
          this.skip();
          return;
        }

        const expected = await fs.readFile(path.join(__dirname, `./__datasets__/${snippet}/output.js`), 'utf-8');
        const har = await fs
          .stat(path.join(DATASETS_DIR, snippet, 'har.json'))
          .then(() => require(path.join(DATASETS_DIR, snippet, 'har.json')))
          .catch(() => {
            return fs
              .stat(path.join(DATASETS_DIR, snippet, 'har.js'))
              .then(() => require(path.join(DATASETS_DIR, snippet, 'har.js')))
              .catch(() => {
                throw new Error(`The ${snippet} dataset has neither a "har.js" or "har.json" present.`);
              });
          });

        const definition = await fs
          .stat(path.join(DATASETS_DIR, snippet, 'openapi.json'))
          .then(() => require(path.join(DATASETS_DIR, snippet, 'openapi.json')))
          .catch(() => {
            return fs
              .stat(path.join(DATASETS_DIR, snippet, 'openapi.js'))
              .then(() => require(path.join(DATASETS_DIR, snippet, 'openapi.js')))
              .catch(() => {
                throw new Error(`The ${snippet} dataset has neither a "openapi.js" or "openapi.json" present.`);
              });
          });

        const code = new HTTPSnippet(har).convert('node', 'api', {
          apiDefinitionUri: 'https://example.com/openapi.json',
          apiDefinition: definition,
        });

        expect(`${code}\n`).to.equal(expected);
      });
    });
  });
});
