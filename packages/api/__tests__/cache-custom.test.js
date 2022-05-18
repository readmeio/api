const path = require('path');
const fs = require('fs').promises;
const api = require('../src');
const nock = require('nock');

const uspto = require('@readme/oas-examples/3.0/json/uspto.json');

describe('custom cache directory', () => {
  let cacheDir;

  beforeAll(async () => {
    cacheDir = path.join(__dirname, '..', '.api-test');

    await fs.mkdir(cacheDir, { recursive: true });
  });

  afterAll(async () => {
    await fs.rmdir(cacheDir, { recursive: true });
  });

  it('should support supplying a custom cache directory', async () => {
    // Our custom caching directory should be empty.
    await expect(fs.readdir(cacheDir)).resolves.toHaveLength(0);

    const oasMock = nock('https://example.com').get('/openapi.json').reply(200, uspto);
    const mock = nock('https://developer.uspto.gov/ds-api').get('/').reply(200);

    const sdk = api('https://example.com/openapi.json', { cacheDir });

    await sdk.get('/').then(() => {
      mock.done();
      oasMock.done();
    });

    // Our custom caching directory should have our cached spec in it.
    const files = [...(await fs.readdir(cacheDir)), ...(await fs.readdir(path.join(cacheDir, 'specs')))];
    expect(files).toStrictEqual(['cache.json', 'specs', 'f2068ebf6ce28b51a8467bf7ac53bbae.json']);

    const cache = await fs.readFile(path.join(cacheDir, 'cache.json'), 'utf8').then(JSON.parse);
    expect(cache).toStrictEqual({
      bcace67532514a49e663e471602b7be6: {
        hash: 'f2068ebf6ce28b51a8467bf7ac53bbae',
        original: 'https://example.com/openapi.json',
        title: 'USPTO Data Set API',
        version: '1.0.0',
      },
    });
  });
});
