const fs = require('fs').promises;
const HTTPSnippet = require('@readme/httpsnippet');
const path = require('path');
const client = require('../src');
const readme = require('@readme/oas-examples/3.0/json/readme.json');

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
  const har = await fs.readFile(path.join(__dirname, './__fixtures__/request/petstore/har.json'), 'utf8');
  const snippet = new HTTPSnippet(JSON.parse(har));

  expect(() => {
    snippet.convert('node', 'api');
  }).toThrow(/must have an `apiDefinitionUri` option supplied/);
});

test('it should error if no apiDefinition was supplied', async () => {
  const har = await fs.readFile(path.join(__dirname, './__fixtures__/request/petstore/har.json'), 'utf8');
  const snippet = new HTTPSnippet(JSON.parse(har));

  expect(() => {
    snippet.convert('node', 'api', {
      apiDefinitionUri: 'https://example.com/openapi.json',
    });
  }).toThrow(/must have an `apiDefinition` option supplied/);
});

// This test should fail because the url in the HAR is missing `/v1` in the path.
test('it should error if no matching operation was found in the apiDefinition', () => {
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
    url: 'https://dash.readme.io/api/api-specification',
  };

  const snippet = new HTTPSnippet(har);

  expect(() => {
    snippet.convert('node', 'api', {
      apiDefinitionUri: 'https://example.com/openapi.json',
      apiDefinition: readme,
    });
  }).toThrow(/unable to locate a matching operation/i);
});

describe('auth handling', () => {
  describe('basic', () => {
    it.each([
      ['should not encode basic auth in the `.auth()` call', 'buster:pug'],
      ["should be able to handle basic auth that's just a username", 'buster:'],
      ["should be able to handle basic auth that's just a password", ':pug'],
    ])('%s', (testCase, authKey) => {
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
        apiDefinition: readme,
      });

      expect(code).toMatchSnapshot();
    });
  });
});

describe('snippets', () => {
  it.each([
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
  ])('should generate `%s` snippet', async testCase => {
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

    expect(`${code}\n`).toBe(expected);
  });
});
