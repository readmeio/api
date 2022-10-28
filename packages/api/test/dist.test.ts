import type { OASDocument } from 'oas/dist/rmoas.types';

import securityOas from '@readme/oas-examples/3.0/json/security.json';
import uspto from '@readme/oas-examples/3.0/json/uspto.json';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../dist';
import Cache from '../src/cache';

import { responses as mockResponses } from './helpers/fetch-mock';

describe('typescript dist verification', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  this.beforeAll(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  afterEach(function () {
    fetchMock.restore();
  });

  it('should be able to use the transpiled dist', async function () {
    fetchMock.post('https://developer.uspto.gov/ds-api/oa_citations/v1/records', mockResponses.url('pathname'));

    const sdk = api(uspto as unknown as OASDocument);

    await sdk.performSearch().then(({ data }) => {
      expect(data).to.equal('/ds-api/oa_citations/v1/records');
    });
  });

  it('should be able to set an auth token', async function () {
    const user = 'buster';
    const pass = 'hunter1';

    const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
    fetchMock.post('https://httpbin.org/anything/basic', mockResponses.headers);

    const sdk = api(securityOas as unknown as OASDocument);

    sdk.auth(user, pass);
    await sdk.postAnythingBasic().then(({ data }) => {
      expect(data).to.have.deep.property('authorization', authHeader);
    });
  });
});
