/* eslint-disable mocha/no-setup-in-describe */
import type { OASDocument } from 'oas/@types/rmoas.types';

import { assert, expect } from 'chai';
import nock from 'nock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../src';
import Cache from '../src/cache';

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

  describe('API Keys', function () {
    describe('in: query', function () {
      it('should allow you to supply auth', async function () {
        const mock = nock('https://httpbin.org')
          .get(/\/anything\/apiKey/)
          .reply(200, uri => uri);

        sdk.auth(apiKey);
        expect(await sdk.get('/anything/apiKey')).to.equal('/anything/apiKey?apiKey=123457890');
        mock.done();
      });

      it.skip('should allow you to supply auth when chained with an operation', async function () {
        const mock = nock('https://httpbin.org')
          .get(/\/anything\/apiKey/)
          .reply(200, uri => uri);

        expect(await sdk.auth(apiKey).get('/anything/apiKey')).to.equal('/anything/apiKey?apiKey=123457890');
        mock.done();
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
        const mock = nock('https://httpbin.org')
          .put('/anything/apiKey')
          .reply(200, function () {
            return this.req.headers;
          });

        sdk.auth(apiKey);
        expect(await sdk.put('/anything/apiKey')).to.have.deep.property('x-api-key', ['123457890']);
        mock.done();
      });

      it.skip('should allow you to supply auth when chained with an operation', async function () {
        const mock = nock('https://httpbin.org')
          .put('/anything/apiKey')
          .reply(200, function () {
            return this.req.headers;
          });

        expect(await sdk.auth(apiKey).put('/anything/apiKey')).to.have.deep.property('x-api-key', ['123457890']);
        mock.done();
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

        const mock = nock('https://httpbin.org')
          .post('/anything/basic')
          .reply(200, function () {
            return this.req.headers;
          });

        sdk.auth(user, pass);
        expect(await sdk.post('/anything/basic')).to.have.deep.property('authorization', [authHeader]);
        mock.done();
      });

      it.skip('should allow you to supply auth when chained with an operation', async function () {
        const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

        const mock = nock('https://httpbin.org')
          .post('/anything/basic')
          .reply(200, function () {
            return this.req.headers;
          });

        expect(await sdk.auth(user, pass).post('/anything/basic')).to.have.deep.property('authorization', [authHeader]);
        mock.done();
      });

      it('should allow you to not pass in a password', async function () {
        const mock = nock('https://httpbin.org')
          .post('/anything/basic')
          .reply(200, function () {
            return this.req.headers;
          });

        sdk.auth(user);

        expect(await sdk.post('/anything/basic')).to.have.deep.property('authorization', [
          `Basic ${Buffer.from(`${user}:`).toString('base64')}`,
        ]);
        mock.done();
      });
    });

    describe('scheme: bearer', function () {
      it('should allow you to supply auth', async function () {
        const mock = nock('https://httpbin.org')
          .post('/anything/bearer')
          .reply(200, function () {
            return this.req.headers;
          });

        sdk.auth(apiKey);
        expect(await sdk.post('/anything/bearer')).to.have.deep.property('authorization', [`Bearer ${apiKey}`]);
        mock.done();
      });

      it.skip('should allow you to supply auth when chained with an operation', async function () {
        const mock = nock('https://httpbin.org')
          .post('/anything/bearer')
          .reply(200, function () {
            return this.req.headers;
          });

        expect(await sdk.auth(apiKey).post('/anything/bearer')).to.have.deep.property('authorization', [
          `Bearer ${apiKey}`,
        ]);
        mock.done();
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
      const mock = nock('https://httpbin.org')
        .post('/anything/oauth2')
        .reply(200, function () {
          return this.req.headers;
        });

      sdk.auth(apiKey);

      expect(await sdk.post('/anything/oauth2')).to.have.deep.property('authorization', [`Bearer ${apiKey}`]);
      mock.done();
    });

    it.skip('should allow you to supply auth when chained with an operation', async function () {
      const mock = nock('https://httpbin.org')
        .post('/anything/oauth2')
        .reply(200, function () {
          return this.req.headers;
        });

      expect(await sdk.auth(apiKey).post('/anything/oauth2')).to.have.deep.property('authorization', [
        `Bearer ${apiKey}`,
      ]);
      mock.done();
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
    const mock1 = nock('https://httpbin.org').get('/anything/apiKey').query({ apiKey }).reply(200, {});
    const mock2 = nock('https://httpbin.org').get('/anything/apiKey').query({ apiKey }).reply(200, {});

    sdk.auth(apiKey);

    await sdk.get('/anything/apiKey').then(() => mock1.done());
    await sdk.get('/anything/apiKey').then(() => mock2.done());
  });

  it('should allow auth to be called again to change the key', async function () {
    const apiKey1 = '12345';
    const apiKey2 = '67890';
    const mock1 = nock('https://httpbin.org').get('/anything/apiKey').query({ apiKey: apiKey1 }).reply(200, {});
    const mock2 = nock('https://httpbin.org').get('/anything/apiKey').query({ apiKey: apiKey2 }).reply(200, {});

    sdk.auth(apiKey1);
    await sdk.get('/anything/apiKey').then(() => mock1.done());

    sdk.auth(apiKey2);
    await sdk.get('/anything/apiKey').then(() => mock2.done());
  });

  // TODO: in future add support for modifying auth for each call
  // https://github.com/readmeio/api/issues/102
  // https://github.com/readmeio/api/commit/56ce53e08d590d4a532a494e86e46a50efc4d891
  it.skip('should allow multiple calls to have different keys', async function () {
    const apiKey1 = '12345';
    const apiKey2 = '67890';
    const mock1 = nock('https://httpbin.org').get('/anything/apiKey').query({ apiKey: apiKey1 }).reply(200, {});
    const mock2 = nock('https://httpbin.org').get('/anything/apiKey').query({ apiKey: apiKey2 }).reply(200, {});

    await sdk
      .auth(apiKey1)
      .get('/anything/apiKey')
      .then(() => mock1.done());

    await sdk
      .auth(apiKey2)
      .get('/anything/apiKey')
      .then(() => mock2.done());
  });
});
