import type { OASDocument } from 'oas/@types/rmoas.types';

import { expect } from 'chai';
import nock from 'nock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../dist';
import Cache from '../src/cache';

import uspto from '@readme/oas-examples/3.0/json/uspto.json';
import securityOas from '@readme/oas-examples/3.0/json/security.json';

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

    const sdk = api(uspto as unknown as OASDocument);

    expect(await sdk.post('/oa_citations/v1/records')).to.equal('/ds-api/oa_citations/v1/records');

    mock.done();
  });

  it('should be able to set an auth token', async function () {
    const user = 'username';
    const pass = 'changeme';

    const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
    const mock = nock('https://httpbin.org')
      .post('/anything/basic')
      .reply(200, function () {
        return this.req.headers;
      });

    const sdk = api(securityOas as unknown as OASDocument);

    sdk.auth(user, pass);
    expect(await sdk.post('/anything/basic')).to.have.deep.property('authorization', [authHeader]);
    mock.done();
  });
});
