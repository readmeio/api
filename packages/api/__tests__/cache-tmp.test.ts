/* eslint-disable import/first */
jest.mock('find-cache-dir', () => {
  return () => undefined;
});

import os from 'os';
import Cache from '../src/cache';

// Since this test is mocking out the `find-cache-dir` module for a single test, it needs to be run separately from the
// rest of the cache tests, otherwise all of those tests would use this mocked out version.
test('should fallback to an os-level temp directory if a cache directory cannot be determined', () => {
  const dir = os.tmpdir();
  const cacheStore = new Cache('http://example.com/readme.json');

  expect(cacheStore.dir).toMatch(dir);
  expect(cacheStore.cacheStore).toMatch(dir);
  expect(cacheStore.specsCache).toMatch(dir);
});
