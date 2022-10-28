import fs from 'fs/promises';
import path from 'path';

import { expect } from 'chai';
import fetchMock from 'fetch-mock';

import api from '../src';
import Cache from '../src/cache';

import loadSpec from './helpers/load-spec';

describe('cache (custom directory)', function () {
  let cacheDir;
  let originalCacheDir;

  beforeEach(async function () {
    originalCacheDir = Cache.dir;

    cacheDir = path.join(__dirname, '..', '.api-test');

    await fs.mkdir(cacheDir, { recursive: true });
  });

  afterEach(async function () {
    await fs.rmdir(cacheDir, { recursive: true });

    Cache.setCacheDir(originalCacheDir);

    fetchMock.restore();
  });

  it('should support supplying a custom cache directory', async function () {
    const uspto = await loadSpec('@readme/oas-examples/3.0/json/uspto.json');

    // Our custom caching directory should be empty.
    expect(await fs.readdir(cacheDir)).to.have.length(0);

    fetchMock.get('https://example.com/openapi.json', uspto);
    fetchMock.get('https://developer.uspto.gov/ds-api/', { status: 200 });

    const sdk = api('https://example.com/openapi.json', { cacheDir });

    await sdk.listDataSets();

    // Our custom caching directory should have our cached spec in it.
    const files = [...(await fs.readdir(cacheDir)), ...(await fs.readdir(path.join(cacheDir, 'specs')))];
    expect(files).to.deep.equal(['cache.json', 'specs', 'f2068ebf6ce28b51a8467bf7ac53bbae.json']);

    const cache = await fs.readFile(path.join(cacheDir, 'cache.json'), 'utf8').then(JSON.parse);
    expect(cache).to.deep.equal({
      bcace67532514a49e663e471602b7be6: {
        hash: 'f2068ebf6ce28b51a8467bf7ac53bbae',
        original: 'https://example.com/openapi.json',
        title: 'USPTO Data Set API',
        version: '1.0.0',
      },
    });
  });
});
