/* eslint-disable import/first */
import { expect } from 'chai';
import mockRequire from 'mock-require';

mockRequire('find-cache-dir', () => undefined);

import os from 'os';
import Cache from '../src/cache';

describe('cache (temp dir handling)', function () {
  afterEach(function () {
    mockRequire.stop('find-cache-dir');
  });

  // Since this test is mocking out the `find-cache-dir` module for a single test, it needs to be run
  // separately from the rest of the cache tests, otherwise all of those tests would use this mocked
  // out version.
  it('should fallback to an os-level temp directory if a cache directory cannot be determined', function () {
    const dir = os.tmpdir();
    const cacheStore = new Cache('http://example.com/readme.json');

    expect(cacheStore.dir).to.match(new RegExp(dir));
    expect(cacheStore.cacheStore).to.match(new RegExp(dir));
    expect(cacheStore.specsCache).to.match(new RegExp(dir));
  });
});
