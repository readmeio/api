/* eslint-disable mocha/no-setup-in-describe */
import type { OASDocument } from 'oas/dist/rmoas.types';

import { assert, expect } from 'chai';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../src';
import Cache from '../src/cache';

import { responses as mockResponses } from './helpers/fetch-mock';

import securityOas from '@readme/oas-examples/3.0/json/security.json';

let sdk;

const apiKey = '123457890';
const user = 'username';
const pass = 'changeme';

describe('#auth()', function () {
  this.beforeAll(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  beforeEach(function () {
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
        expect(await sdk.get('/anything/apiKey')).to.equal('/anything/apiKey?apiKey=123457890');
      });

      it('should throw if you supply multiple auth keys', async function () {
        sdk.auth(apiKey, apiKey);

        await sdk
          .get('/anything/apiKey')
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/only a single key is needed/i);
          });
      });
    });

    describe('in: header', function () {
      it('should allow you to supply auth', async function () {
        fetchMock.put('https://httpbin.org/anything/apiKey', mockResponses.headers);

        sdk.auth(apiKey);
        expect(await sdk.put('/anything/apiKey')).to.have.deep.property('x-api-key', '123457890');
      });

      it('should throw if you supply multiple auth keys', async function () {
        sdk.auth(apiKey, apiKey);

        await sdk
          .put('/anything/apiKey')
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/only a single key is needed/i);
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
        expect(await sdk.post('/anything/basic')).to.have.deep.property('authorization', authHeader);
      });

      it('should allow you to not pass in a password', async function () {
        fetchMock.post('https://httpbin.org/anything/basic', mockResponses.headers);

        sdk.auth(user);

        expect(await sdk.post('/anything/basic')).to.have.deep.property(
          'authorization',
          `Basic ${Buffer.from(`${user}:`).toString('base64')}`
        );
      });
    });

    describe('scheme: bearer', function () {
      it('should allow you to supply auth', async function () {
        fetchMock.post('https://httpbin.org/anything/bearer', mockResponses.headers);

        sdk.auth(apiKey);
        expect(await sdk.post('/anything/bearer')).to.have.deep.property('authorization', `Bearer ${apiKey}`);
      });

      it('should throw if you pass in multiple bearer tokens', async function () {
        sdk.auth(apiKey, apiKey);
        await sdk
          .post('/anything/bearer')
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

      expect(await sdk.post('/anything/oauth2')).to.have.deep.property('authorization', `Bearer ${apiKey}`);
    });

    it('should throw if you pass in multiple bearer tokens', async function () {
      sdk.auth(apiKey, apiKey);
      await sdk
        .post('/anything/oauth2')
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

    await sdk.get('/anything/apiKey').then(res => expect(res.calls).to.equal(1));
    await sdk.get('/anything/apiKey').then(res => expect(res.calls).to.equal(2));
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
    await sdk.get('/anything/apiKey').then(res => expect(res).to.equal('/anything/apiKey?apiKey=12345'));

    sdk.auth(apiKey2);
    await sdk.get('/anything/apiKey').then(res => expect(res).to.equal('/anything/apiKey?apiKey=67890'));
  });
});
