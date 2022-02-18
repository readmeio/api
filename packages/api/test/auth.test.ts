/* eslint-disable mocha/no-setup-in-describe */
import { assert, expect } from 'chai';
import nock from 'nock';
import api from '../src';

import securityOas from '@readme/oas-examples/3.0/json/security.json';

let sdk;

const apiKey = '123457890';
const user = 'username';
const pass = 'changeme';

describe('#auth()', function () {
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
            .get(/\/apiKey/)
            .reply(200, uri => uri);

          if (isChained) {
            expect(await sdk.auth(apiKey).get('/apiKey')).to.equal('/apiKey?apiKey=123457890');
            mock.done();
            return;
          }

          sdk.auth(apiKey);
          expect(await sdk.get('/apiKey')).to.equal('/apiKey?apiKey=123457890');
          mock.done();
        });
      });

      it('should throw if you supply multiple auth keys', async function () {
        await sdk
          .auth(apiKey, apiKey)
          .get('/apiKey')
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
            .put('/apiKey')
            .reply(200, function () {
              return this.req.headers;
            });

          if (isChained) {
            expect(await sdk.auth(apiKey).put('/apiKey')).to.have.deep.property('x-api-key', ['123457890']);
            mock.done();
            return;
          }

          sdk.auth(apiKey);
          expect(await sdk.put('/apiKey')).to.have.deep.property('x-api-key', ['123457890']);
        });
      });

      it('should throw if you supply multiple auth keys', async function () {
        await sdk
          .auth(apiKey, apiKey)
          .put('/apiKey')
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
            .post('/basic')
            .reply(200, function () {
              return this.req.headers;
            });

          if (isChained) {
            expect(await sdk.auth(user, pass).post('/basic')).to.have.deep.property('authorization', [authHeader]);
            mock.done();
            return;
          }

          sdk.auth(user, pass);
          expect(await sdk.post('/basic')).to.have.deep.property('authorization', [authHeader]);
          mock.done();
        });
      });

      it('should allow you to not pass in a password', async function () {
        const mock = nock('https://httpbin.org')
          .post('/basic')
          .reply(200, function () {
            return this.req.headers;
          });

        expect(await sdk.auth(user).post('/basic')).to.have.deep.property('authorization', [
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
            .post('/bearer')
            .reply(200, function () {
              return this.req.headers;
            });

          if (isChained) {
            expect(await sdk.auth(apiKey).post('/bearer')).to.have.deep.property('authorization', [`Bearer ${apiKey}`]);
            mock.done();
            return;
          }

          sdk.auth(apiKey);
          expect(await sdk.post('/bearer')).to.have.deep.property('authorization', [`Bearer ${apiKey}`]);
          mock.done();
        });
      });

      it('should throw if you pass in multiple bearer tokens', async function () {
        await sdk
          .auth(apiKey, apiKey)
          .post('/bearer')
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
          .post('/oauth2')
          .reply(200, function () {
            return this.req.headers;
          });

        if (isChained) {
          expect(await sdk.auth(apiKey).post('/oauth2')).to.have.deep.property('authorization', [`Bearer ${apiKey}`]);
          mock.done();
          return;
        }

        sdk.auth(apiKey);
        expect(await sdk.post('/oauth2')).to.have.deep.property('authorization', [`Bearer ${apiKey}`]);
        mock.done();
      });
    });

    it('should throw if you pass in multiple bearer tokens', async function () {
      await sdk
        .auth(apiKey, apiKey)
        .post('/oauth2')
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.match(/only a single token is needed/i);
        });
    });
  });
});
