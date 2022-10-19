import os from 'os';

import { expect } from 'chai';
import mockRequire from 'mock-require';

mockRequire('find-cache-dir', () => undefined);

// We need to load `Cache` here after `find-cache-dir` in order for that mock to get picked up.
// eslint-disable-next-line import/first
import Cache from '../src/cache';

describe('cache (temp dir handling)', function () {
  // Since this test is mocking out the `find-cache-dir` module for a single test, it needs to be
  // run separately from the rest of the cache tests, otherwise all of those tests would use this
  // mocked out version.
  it('should fallback to an os-level temp directory if a cache directory cannot be determined', async function () {
    await Cache.reset();

    const dir = os.tmpdir();
    // eslint-disable-next-line no-new
    new Cache('http://example.com/readme.json');

    expect(Cache.dir).to.match(new RegExp(dir));
    expect(Cache.cacheStore).to.match(new RegExp(dir));
    expect(Cache.specsCache).to.match(new RegExp(dir));
  });
});
