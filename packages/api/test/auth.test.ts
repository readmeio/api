import type { OASDocument } from 'oas/dist/rmoas.types';

import { assert, expect } from 'chai';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../src';
import Cache from '../src/cache';

import { responses as mockResponses } from './helpers/fetch-mock';
import loadSpec from './helpers/load-spec';

let sdk;

const apiKey = '123457890';
const user = 'buster';
const pass = 'hunter1';

describe('#auth()', function () {
  before(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  beforeEach(async function () {
    const securityOas = await loadSpec('@readme/oas-examples/3.0/json/security.json');
    sdk = api(securityOas as unknown as OASDocument);
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe('API Keys', function () {
    describe('in: query', function () {
      it('should allow you to supply auth', async function () {
        fetchMock.get(
          {
            url: 'https://httpbin.org/anything/apiKey',
            query: { apiKey },
          },
          mockResponses.searchParams
        );

        sdk.auth(apiKey);

        await sdk.getAnythingApikey().then(({ data }) => {
          expect(data).to.equal('/anything/apiKey?apiKey=123457890');
        });
      });

      it('should throw if you supply multiple auth keys', async function () {
        sdk.auth(apiKey, apiKey);

        await sdk
          .getAnythingApikey()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/only a single token is needed/i);
          });
      });
    });

    describe('in: header', function () {
      it('should allow you to supply auth', async function () {
        fetchMock.put('https://httpbin.org/anything/apiKey', mockResponses.headers);

        sdk.auth(apiKey);
        await sdk.putAnythingApikey().then(({ data }) => {
          expect(data).to.have.deep.property('x-api-key', '123457890');
        });
      });

      it('should throw if you supply multiple auth keys', async function () {
        sdk.auth(apiKey, apiKey);

        await sdk
          .putAnythingApikey()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/only a single token is needed/i);
          });
      });
    });
  });

  describe('HTTP', function () {
    describe('scheme: basic', function () {
      it('should allow you to supply auth', async function () {
        const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

        fetchMock.post('https://httpbin.org/anything/basic', mockResponses.headers);

        sdk.auth(user, pass);

        await sdk.postAnythingBasic().then(({ data }) => {
          expect(data).to.have.deep.property('authorization', authHeader);
        });
      });

      it('should allow you to not pass in a password', async function () {
        fetchMock.post('https://httpbin.org/anything/basic', mockResponses.headers);

        sdk.auth(user);

        await sdk.postAnythingBasic().then(({ data }) => {
          expect(data).to.have.deep.property('authorization', `Basic ${Buffer.from(`${user}:`).toString('base64')}`);
        });
      });
    });

    describe('scheme: bearer', function () {
      it('should allow you to supply auth', async function () {
        fetchMock.post('https://httpbin.org/anything/bearer', mockResponses.headers);

        sdk.auth(apiKey);

        await sdk.postAnythingBearer().then(({ data }) => {
          expect(data).to.have.deep.property('authorization', `Bearer ${apiKey}`);
        });
      });

      it('should throw if you pass in multiple bearer tokens', async function () {
        sdk.auth(apiKey, apiKey);
        await sdk
          .postAnythingBearer()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/only a single token is needed/i);
          });
      });
    });
  });

  describe('OAuth 2', function () {
    it('should allow you to supply auth', async function () {
      fetchMock.post('https://httpbin.org/anything/oauth2', mockResponses.headers);

      sdk.auth(apiKey);

      await sdk.postAnythingOauth2().then(({ data }) => {
        expect(data).to.have.deep.property('authorization', `Bearer ${apiKey}`);
      });
    });

    it('should throw if you pass in multiple bearer tokens', async function () {
      sdk.auth(apiKey, apiKey);
      await sdk
        .postAnythingOauth2()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.match(/only a single token is needed/i);
        });
    });
  });

  it('should allow multiple calls to share an API key', async function () {
    let calls = 0;
    fetchMock.get(
      {
        url: 'https://httpbin.org/anything/apiKey',
        query: { apiKey },
      },
      () => {
        calls += 1;
        return { calls };
      }
    );

    sdk.auth(apiKey);

    await sdk.getAnythingApikey().then(({ data }) => expect(data.calls).to.equal(1));
    await sdk.getAnythingApikey().then(({ data }) => expect(data.calls).to.equal(2));
  });

  it('should allow auth to be called again to change the key', async function () {
    const apiKey1 = '12345';
    const apiKey2 = '67890';

    fetchMock.get(
      {
        name: `fetch ${apiKey1}`,
        url: 'https://httpbin.org/anything/apiKey',
        query: { apiKey: apiKey1 },
      },
      mockResponses.searchParams
    );

    fetchMock.get(
      {
        name: `fetch ${apiKey2}`,
        url: 'https://httpbin.org/anything/apiKey',
        query: { apiKey: apiKey2 },
      },
      mockResponses.searchParams
    );

    sdk.auth(apiKey1);
    await sdk.getAnythingApikey().then(({ data }) => expect(data).to.equal('/anything/apiKey?apiKey=12345'));

    sdk.auth(apiKey2);
    await sdk.getAnythingApikey().then(({ data }) => expect(data).to.equal('/anything/apiKey?apiKey=67890'));
  });

  describe('quirks', function () {
    let quirks;

    before(async function () {
      const authQuirksOas = await loadSpec(require.resolve('./__fixtures__/definitions/auth-quirks.json'));
      quirks = api(authQuirksOas as unknown as OASDocument);

      // Because the `POST /anything` operation allows either an OAuth2 token or Basic Auth the
      // quirks case we're testing is that you should be able to supply either a single OAuth2 token
      // or a username+password and it should be able to intelligently handle both.
      expect(authQuirksOas.paths['/anything'].post.security).to.deep.equal([
        { oauth2: ['write:things'] },
        { basicAuth: [] },
      ]);
    });

    it('should support an operation that has OR auth requirements (supplying Basic Auth)', async function () {
      const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

      fetchMock.post('https://httpbin.org/anything', mockResponses.headers);

      quirks.auth(user, pass);
      await quirks.postAnything().then(({ data }) => {
        expect(data).to.have.deep.property('authorization', authHeader);
      });
    });

    it('should support an operation that has OR auth requirements (supplying an OAuth2 token)', async function () {
      fetchMock.post('https://httpbin.org/anything', mockResponses.headers);

      quirks.auth(apiKey);
      await quirks.postAnything().then(({ data }) => {
        expect(data).to.have.deep.property('authorization', `Bearer ${apiKey}`);
      });
    });
  });
});
