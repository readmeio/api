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

describe('snippets', () => {
  beforeAll(() => {
    HTTPSnippet.addTargetClient('node', client);
  });

  it.each([
    ['application-form-encoded'],
    ['application-json'],
    ['full'],
    ['headers'],
    ['https'],
    ['jsonObj-multiline'],
    ['jsonObj-null-value'],

    // These tests need to be improved because the attachment handling isn't right.
    // ['multipart-data'],
    // ['multipart-file'],
    // ['multipart-form-data'],

    ['query'],
    ['short'],
    ['text-plain'],
  ])('should generate %s snippet', async testCase => {
    const har = await fs.readFile(path.join(__dirname, `./__fixtures__/request/${testCase}.json`), 'utf8');
    const expected = await fs.readFile(path.join(__dirname, `./__fixtures__/output/${testCase}.js`), 'utf8');

    const snippet = new HTTPSnippet(JSON.parse(har));

    expect(`${snippet.convert('node', 'api')}\n`).toBe(expected);
  });
});
