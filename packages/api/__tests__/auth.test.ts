import nock from 'nock';
import api from '../src';

import securityOas from '@readme/oas-examples/3.0/json/security.json';

let sdk;

const apiKey = '123457890';
const user = 'username';
const pass = 'changeme';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.restore();
});

beforeEach(() => {
  // `openapi-types` is throwing nonsensical errors on the `apiKey_cookie` security scheme.
  sdk = api(securityOas as any);
});

describe('#auth()', () => {
  describe('API Keys', () => {
    describe('in: query', () => {
      it.each([
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ])('%s', async (_, chained) => {
        const mock = nock('https://httpbin.org')
          .get(/\/apiKey/)
          .reply(200, uri => uri);

        if (chained) {
          // eslint-disable-next-line jest/no-conditional-expect
          await expect(sdk.auth(apiKey).get('/apiKey')).resolves.toBe('/apiKey?apiKey=123457890');
          mock.done();
          return;
        }

        sdk.auth(apiKey);
        await expect(sdk.get('/apiKey')).resolves.toBe('/apiKey?apiKey=123457890');
        mock.done();
      });

      it('should throw if you supply multiple auth keys', () => {
        return expect(sdk.auth(apiKey, apiKey).get('/apiKey')).rejects.toThrow(/only a single key is needed/i);
      });
    });

    describe('in: header', () => {
      it.each([
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ])('%s', async (_, chained) => {
        const mock = nock('https://httpbin.org')
          .put('/apiKey')
          .reply(200, function () {
            return this.req.headers;
          });

        if (chained) {
          // eslint-disable-next-line jest/no-conditional-expect
          await expect(sdk.auth(apiKey).put('/apiKey')).resolves.toStrictEqual(
            expect.objectContaining({
              'x-api-key': ['123457890'],
            })
          );
          mock.done();
          return;
        }

        sdk.auth(apiKey);
        await expect(sdk.put('/apiKey')).resolves.toStrictEqual(
          expect.objectContaining({
            'x-api-key': ['123457890'],
          })
        );
      });

      it('should throw if you supply multiple auth keys', () => {
        return expect(sdk.auth(apiKey, apiKey).put('/apiKey')).rejects.toThrow(/only a single key is needed/i);
      });
    });
  });

  describe('HTTP', () => {
    describe('scheme: basic', () => {
      it.each([
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ])('%s', async (_, chained) => {
        const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
        const mock = nock('https://httpbin.org')
          .post('/basic')
          .reply(200, function () {
            return this.req.headers;
          });

        if (chained) {
          // eslint-disable-next-line jest/no-conditional-expect
          await expect(sdk.auth(user, pass).post('/basic')).resolves.toStrictEqual(
            expect.objectContaining({
              authorization: [authHeader],
            })
          );
          mock.done();
          return;
        }

        sdk.auth(user, pass);
        await expect(sdk.post('/basic')).resolves.toStrictEqual(
          expect.objectContaining({
            authorization: [authHeader],
          })
        );
        mock.done();
      });

      it('should allow you to not pass in a password', async () => {
        const mock = nock('https://httpbin.org')
          .post('/basic')
          .reply(200, function () {
            return this.req.headers;
          });

        await expect(sdk.auth(user).post('/basic')).resolves.toStrictEqual(
          expect.objectContaining({
            authorization: [`Basic ${Buffer.from(`${user}:`).toString('base64')}`],
          })
        );
        mock.done();
      });
    });

    describe('scheme: bearer', () => {
      it.each([
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ])('%s', async (_, chained) => {
        const mock = nock('https://httpbin.org')
          .post('/bearer')
          .reply(200, function () {
            return this.req.headers;
          });

        if (chained) {
          // eslint-disable-next-line jest/no-conditional-expect
          await expect(sdk.auth(apiKey).post('/bearer')).resolves.toStrictEqual(
            expect.objectContaining({
              authorization: [`Bearer ${apiKey}`],
            })
          );
          mock.done();
          return;
        }

        sdk.auth(apiKey);
        await expect(sdk.post('/bearer')).resolves.toStrictEqual(
          expect.objectContaining({
            authorization: [`Bearer ${apiKey}`],
          })
        );
        mock.done();
      });

      it('should throw if you pass in multiple bearer tokens', () => {
        return expect(sdk.auth(apiKey, apiKey).post('/bearer')).rejects.toThrow(/only a single token is needed/i);
      });
    });
  });

  describe('OAuth 2', () => {
    it.each([
      ['should allow you to supply auth', false],
      ['should allow you to supply auth when unchained from an operation', true],
    ])('%s', async (_, chained) => {
      const mock = nock('https://httpbin.org')
        .post('/oauth2')
        .reply(200, function () {
          return this.req.headers;
        });

      if (chained) {
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(sdk.auth(apiKey).post('/oauth2')).resolves.toStrictEqual(
          expect.objectContaining({
            authorization: [`Bearer ${apiKey}`],
          })
        );
        mock.done();
        return;
      }

      sdk.auth(apiKey);
      await expect(sdk.post('/oauth2')).resolves.toStrictEqual(
        expect.objectContaining({
          authorization: [`Bearer ${apiKey}`],
        })
      );
      mock.done();
    });

    it('should throw if you pass in multiple bearer tokens', () => {
      return expect(sdk.auth(apiKey, apiKey).post('/oauth2')).rejects.toThrow(/only a single token is needed/i);
    });
  });
});
