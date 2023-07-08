import os from 'os';

import Cache from '../src/cache';

jest.mock('find-cache-dir', () => {
  return () => undefined;
});

describe('cache (temp dir handling)', () => {
  // Since this test is mocking out the `find-cache-dir` module for a single test, it needs to be
  // run separately from the rest of the cache tests, otherwise all of those tests would use this
  // mocked out version.
  it('should fallback to an os-level temp directory if a cache directory cannot be determined', async () => {
    await Cache.reset();

    const dir = os.tmpdir();
    // eslint-disable-next-line no-new
    new Cache('http://example.com/readme.json');

    expect(Cache.dir).toMatch(new RegExp(dir));
    expect(Cache.cacheStore).toMatch(new RegExp(dir));
    expect(Cache.specsCache).toMatch(new RegExp(dir));
  });
});
