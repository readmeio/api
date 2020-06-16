/* eslint-disable import/no-dynamic-require, global-require */

// Most of this has been copied over from the httpsnippet target unit test file. It'd be ideal if this were in a
// helper library we could use instead.
const fs = require('fs').promises;
const HTTPSnippet = require('httpsnippet');
const path = require('path');
const client = require('../src');

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
  HTTPSnippet.addTargetClient('node', client);

  const har = await fs.readFile(path.join(__dirname, `./__fixtures__/request/petstore/har.json`), 'utf8');
  const snippet = new HTTPSnippet(JSON.parse(har));

  expect(() => {
    snippet.convert('node', 'api');
  }).toThrow(/must have an `apiDefinitionUri` option supplied/);
});

test('it should error if no apiDefinition was supplied', async () => {
  HTTPSnippet.addTargetClient('node', client);

  const har = await fs.readFile(path.join(__dirname, `./__fixtures__/request/petstore/har.json`), 'utf8');
  const snippet = new HTTPSnippet(JSON.parse(har));

  expect(() => {
    snippet.convert('node', 'api', {
      apiDefinitionUri: 'https://example.com/openapi.json',
    });
  }).toThrow(/must have an `apiDefinition` option supplied/);
});

describe('snippets', () => {
  beforeAll(() => {
    HTTPSnippet.addTargetClient('node', client);
  });

  it.each([
    ['application-form-encoded'],
    ['application-json'],
    // ['cookies'], // @todo
    ['full'],
    ['headers'],
    ['https'],
    ['issue-76'],
    ['jsonObj-multiline'],
    ['jsonObj-null-value'],

    // These tests need to be improved because the attachment handling isn't right.
    // ['multipart-data'],
    // ['multipart-file'],
    // ['multipart-form-data'],

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
