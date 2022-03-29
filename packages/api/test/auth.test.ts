/* eslint-disable mocha/no-setup-in-describe */
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
    sdk = api(securityOas);
  });

  describe('API Keys', function () {
    describe('in: query', function () {
      [
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ].forEach(([_, isChained]) => {
        it(`${_}`, async function () {
          const mock = nock('https://httpbin.org')
            .get(/\/anything\/apiKey/)
            .reply(200, uri => uri);

          if (isChained) {
            expect(await sdk.auth(apiKey).get('/anything/apiKey')).to.equal('/anything/apiKey?apiKey=123457890');
            mock.done();
            return;
          }

          sdk.auth(apiKey);
          expect(await sdk.get('/anything/apiKey')).to.equal('/anything/apiKey?apiKey=123457890');
          mock.done();
        });
      });

      it('should throw if you supply multiple auth keys', async function () {
        await sdk
          .auth(apiKey, apiKey)
          .get('/anything/apiKey')
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/only a single key is needed/i);
          });
      });
    });

    describe('in: header', function () {
      [
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ].forEach(([_, isChained]) => {
        it(`${_}`, async function () {
          const mock = nock('https://httpbin.org')
            .put('/anything/apiKey')
            .reply(200, function () {
              return this.req.headers;
            });

          if (isChained) {
            expect(await sdk.auth(apiKey).put('/anything/apiKey')).to.have.deep.property('x-api-key', ['123457890']);
            mock.done();
            return;
          }

          sdk.auth(apiKey);
          expect(await sdk.put('/anything/apiKey')).to.have.deep.property('x-api-key', ['123457890']);
        });
      });

      it('should throw if you supply multiple auth keys', async function () {
        await sdk
          .auth(apiKey, apiKey)
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
      [
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ].forEach(([_, isChained]) => {
        it(`${_}`, async function () {
          const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
          const mock = nock('https://httpbin.org')
            .post('/anything/basic')
            .reply(200, function () {
              return this.req.headers;
            });

          if (isChained) {
            expect(await sdk.auth(user, pass).post('/anything/basic')).to.have.deep.property('authorization', [
              authHeader,
            ]);
            mock.done();
            return;
          }

          sdk.auth(user, pass);
          expect(await sdk.post('/anything/basic')).to.have.deep.property('authorization', [authHeader]);
          mock.done();
        });
      });

      it('should allow you to not pass in a password', async function () {
        const mock = nock('https://httpbin.org')
          .post('/anything/basic')
          .reply(200, function () {
            return this.req.headers;
          });

        expect(await sdk.auth(user).post('/anything/basic')).to.have.deep.property('authorization', [
          `Basic ${Buffer.from(`${user}:`).toString('base64')}`,
        ]);
        mock.done();
      });
    });

    describe('scheme: bearer', function () {
      [
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ].forEach(([_, isChained]) => {
        it(`${_}`, async function () {
          const mock = nock('https://httpbin.org')
            .post('/anything/bearer')
            .reply(200, function () {
              return this.req.headers;
            });

          if (isChained) {
            expect(await sdk.auth(apiKey).post('/anything/bearer')).to.have.deep.property('authorization', [
              `Bearer ${apiKey}`,
            ]);
            mock.done();
            return;
          }

          sdk.auth(apiKey);
          expect(await sdk.post('/anything/bearer')).to.have.deep.property('authorization', [`Bearer ${apiKey}`]);
          mock.done();
        });
      });

      it('should throw if you pass in multiple bearer tokens', async function () {
        await sdk
          .auth(apiKey, apiKey)
          .post('/anything/bearer')
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/only a single token is needed/i);
          });
      });
    });
  });

  describe('OAuth 2', function () {
    [
      ['should allow you to supply auth', false],
      ['should allow you to supply auth when unchained from an operation', true],
    ].forEach(([_, isChained]) => {
      it(`${_}`, async function () {
        const mock = nock('https://httpbin.org')
          .post('/anything/oauth2')
          .reply(200, function () {
            return this.req.headers;
          });

        if (isChained) {
          expect(await sdk.auth(apiKey).post('/anything/oauth2')).to.have.deep.property('authorization', [
            `Bearer ${apiKey}`,
          ]);
          mock.done();
          return;
        }

        sdk.auth(apiKey);
        expect(await sdk.post('/anything/oauth2')).to.have.deep.property('authorization', [`Bearer ${apiKey}`]);
        mock.done();
      });
    });

    it('should throw if you pass in multiple bearer tokens', async function () {
      await sdk
        .auth(apiKey, apiKey)
        .post('/anything/oauth2')
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.match(/only a single token is needed/i);
        });
    });
  });
});
