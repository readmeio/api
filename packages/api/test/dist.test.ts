import { expect } from 'chai';
import nock from 'nock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../dist';
import Cache from '../src/cache';

import uspto from '@readme/oas-examples/3.0/json/uspto.json';

describe('typescript dist verification', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  this.beforeAll(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  it('should be able to use the transpiled dist', async function () {
    const mock = nock('https://developer.uspto.gov/ds-api')
      .post('/oa_citations/v1/records')
      .reply(200, uri => uri);

    const sdk = api(uspto);

    expect(await sdk.post('/oa_citations/v1/records')).to.equal('/ds-api/oa_citations/v1/records');

    mock.done();
  });
});
