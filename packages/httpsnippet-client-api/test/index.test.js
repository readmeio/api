const { expect } = require('chai');
const fs = require('fs/promises');
const HTTPSnippet = require('@readme/httpsnippet');
const path = require('path');
const client = require('../src');
const readme = require('@readme/oas-examples/3.0/json/readme.json');

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
    expect(typeof client.info).to.equal('object');

    expect(client.info).to.deep.equal({
      key: 'api',
      title: 'API',
      link: 'https://npm.im/api',
      description: 'Automatic SDK generation from an OpenAPI definition.',
    });
  });

  it('it should error if no apiDefinitionUri was supplied', async function () {
    const har = await fs.readFile(path.join(__dirname, './__fixtures__/request/petstore/har.json'), 'utf8');
    const snippet = new HTTPSnippet(JSON.parse(har));

    expect(() => {
      snippet.convert('node', 'api');
    }).to.throw(/must have an `apiDefinitionUri` option supplied/);
  });

  it('it should error if no apiDefinition was supplied', async function () {
    const har = await fs.readFile(path.join(__dirname, './__fixtures__/request/petstore/har.json'), 'utf8');
    const snippet = new HTTPSnippet(JSON.parse(har));

    expect(() => {
      snippet.convert('node', 'api', {
        apiDefinitionUri: 'https://example.com/openapi.json',
      });
    }).to.throw(/must have an `apiDefinition` option supplied/);
  });

  // This test should fail because the url in the HAR is missing `/v1` in the path.
  it('it should error if no matching operation was found in the apiDefinition', function () {
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
      // eslint-disable-next-line mocha/no-setup-in-describe
      [
        ['should not encode basic auth in the `.auth()` call', 'buster:pug', "sdk.auth('buster', 'pug')"],
        ["should be able to handle basic auth that's just a username", 'buster:', "sdk.auth('buster')"],
        ["should be able to handle basic auth that's just a password", ':pug', "sdk.auth('', 'pug')"],
      ].forEach(([testCase, authKey, expected]) => {
        it(testCase, function () {
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

          expect(code).to.include(expected);
        });
      });
    });
  });

  describe('snippets', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    [
      ['alternate-server'],
      ['application-form-encoded'],
      ['application-json'],
      // ['cookies'], // Cookies test needs to get built out.
      ['full'],
      ['full-many-query-params'],
      ['headers'],
      ['https'],
      ['issue-76'],
      ['issue-78'],
      ['issue-78-operationid'],
      ['issue-119'],
      ['issue-128'],
      ['jsonObj-multiline'],
      ['jsonObj-null-value'],
      ['multipart-data'],
      ['multipart-file'],
      ['multipart-form-data'],
      ['multipart-form-data-no-params'],
      ['petstore'],
      ['query'],
      ['query-auth'],
      ['short'],
      ['text-plain'],
    ].forEach(([testCase]) => {
      it(`should generate \`${testCase}\` snippet`, async function () {
        const har = JSON.parse(
          await fs.readFile(path.join(__dirname, `./__fixtures__/request/${testCase}/har.json`), 'utf8')
        );

        const definition = JSON.parse(
          await fs.readFile(path.join(__dirname, `./__fixtures__/request/${testCase}/definition.json`), 'utf8')
        );

        const expected = await fs.readFile(path.join(__dirname, `./__fixtures__/output/${testCase}.js`), 'utf8');

        const code = new HTTPSnippet(har).convert('node', 'api', {
          apiDefinitionUri: 'https://example.com/openapi.json',
          apiDefinition: definition,
        });

        expect(`${code}\n`).to.equal(expected);
      });
    });
  });
});
