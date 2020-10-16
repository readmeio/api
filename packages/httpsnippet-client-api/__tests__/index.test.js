/* eslint-disable import/no-dynamic-require, global-require */

// Most of this has been copied over from the httpsnippet target unit test file. It'd be ideal if this were in a
// helper library we could use instead.
const fs = require('fs').promises;
const HTTPSnippet = require('@readme/httpsnippet');
const path = require('path');
const client = require('../src');

HTTPSnippet.addTargetClient('node', client);

test('it should have info', () => {
  expect(client).toHaveProperty('info');
  expect(typeof client.info).toBe('object');

  expect(client.info).toStrictEqual(
    expect.objectContaining({
      key: expect.any(String),
      title: expect.any(String),
      link: expect.any(String),
      description: expect.any(String),
    })
  );
});

test('it should error if no apiDefinitionUri was supplied', async () => {
  const har = await fs.readFile(path.join(__dirname, `./__fixtures__/request/petstore/har.json`), 'utf8');
  const snippet = new HTTPSnippet(JSON.parse(har));

  expect(() => {
    snippet.convert('node', 'api');
  }).toThrow(/must have an `apiDefinitionUri` option supplied/);
});

test('it should error if no apiDefinition was supplied', async () => {
  const har = await fs.readFile(path.join(__dirname, `./__fixtures__/request/petstore/har.json`), 'utf8');
  const snippet = new HTTPSnippet(JSON.parse(har));

  expect(() => {
    snippet.convert('node', 'api', {
      apiDefinitionUri: 'https://example.com/openapi.json',
    });
  }).toThrow(/must have an `apiDefinition` option supplied/);
});

describe('auth handling', () => {
  describe('basic', () => {
    it.each([
      ['should not encode basic auth in the `.auth()` call', 'buster:pug'],
      ["should be able to handle basic auth that's just a username", 'buster:'],
      ["should be able to handle basic auth that's just a password", ':pug'],
    ])('%s', (testCase, authKey) => {
      const definition = require('@readme/oas-examples/3.0/json/readme.json');
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
        url: 'https://dash.readme.io/api/v1/api-specification',
      };

      const code = new HTTPSnippet(har).convert('node', 'api', {
        apiDefinitionUri: 'https://example.com/openapi.json',
        apiDefinition: definition,
      });

      expect(code).toMatchSnapshot();
    });
  });
});

describe('snippets', () => {
  it.each([
    ['application-form-encoded'],
    ['application-json'],
    // ['cookies'], // Cookies test needs to get built out.
    ['full'],
    ['headers'],
    ['https'],
    ['issue-76'],
    ['issue-78'],
    ['issue-78-operationid'],
    ['issue-128'],
    ['jsonObj-multiline'],
    ['jsonObj-null-value'],
    ['multipart-data'],
    ['multipart-file'],
    ['multipart-form-data'],
    ['petstore'],
    ['query'],
    ['query-auth'],
    ['short'],
    ['text-plain'],
  ])('should generate `%s` snippet', async testCase => {
    const har = require(`./__fixtures__/request/${testCase}/har.json`);
    const definition = require(`./__fixtures__/request/${testCase}/definition.json`);
    const expected = await fs.readFile(path.join(__dirname, `./__fixtures__/output/${testCase}.js`), 'utf8');

    const code = new HTTPSnippet(har).convert('node', 'api', {
      apiDefinitionUri: 'https://example.com/openapi.json',
      apiDefinition: definition,
    });

    expect(`${code}\n`).toBe(expected);
  });
});
