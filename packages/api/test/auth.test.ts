import type { OASDocument } from 'oas/rmoas.types';

import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeAll, beforeEach, afterEach, it, expect, vi } from 'vitest';

import api from '../src';
import Cache from '../src/cache';

import { responses as mockResponses } from './helpers/fetch-mock';
import loadSpec from './helpers/load-spec';

let sdk;

const apiKey = '123457890';
const user = 'buster';
const pass = 'hunter1';

describe('#auth()', () => {
  beforeAll(() => {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  beforeEach(async () => {
    const securityOas = await loadSpec('@readme/oas-examples/3.0/json/security.json');
    sdk = api(securityOas as unknown as OASDocument);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('API keys', () => {
    describe('in: query', () => {
      it('should allow you to supply auth', async () => {
        fetchMock.get(
          {
            url: 'https://httpbin.org/anything/apiKey',
            query: { apiKey },
          },
          mockResponses.searchParams,
        );

        sdk.auth(apiKey);

        await sdk.getAnythingApikey().then(({ data }) => {
          expect(data).toBe('/anything/apiKey?apiKey=123457890');
        });
      });

      it('should throw if you supply multiple auth keys', async () => {
        sdk.auth(apiKey, apiKey);

        await expect(sdk.getAnythingApikey()).rejects.toThrow(/only a single token is needed/i);
      });
    });

    describe('in: header', () => {
      it('should allow you to supply auth', async () => {
        fetchMock.put('https://httpbin.org/anything/apiKey', mockResponses.headers);

        sdk.auth(apiKey);
        await sdk.putAnythingApikey().then(({ data }) => {
          expect(data).toHaveProperty('x-api-key', '123457890');
        });
      });

      it('should throw if you supply multiple auth keys', async () => {
        sdk.auth(apiKey, apiKey);

        await expect(sdk.putAnythingApikey()).rejects.toThrow(/only a single token is needed/i);
      });
    });
  });

  describe('HTTP', () => {
    describe('scheme: basic', () => {
      it('should allow you to supply auth', async () => {
        const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

        fetchMock.post('https://httpbin.org/anything/basic', mockResponses.headers);

        sdk.auth(user, pass);

        await sdk.postAnythingBasic().then(({ data }) => {
          expect(data).toHaveProperty('authorization', authHeader);
        });
      });

      it('should allow you to not pass in a password', async () => {
        fetchMock.post('https://httpbin.org/anything/basic', mockResponses.headers);

        sdk.auth(user);

        await sdk.postAnythingBasic().then(({ data }) => {
          expect(data).toHaveProperty('authorization', `Basic ${Buffer.from(`${user}:`).toString('base64')}`);
        });
      });
    });

    describe('scheme: bearer', () => {
      it('should allow you to supply auth', async () => {
        fetchMock.post('https://httpbin.org/anything/bearer', mockResponses.headers);

        sdk.auth(apiKey);

        await sdk.postAnythingBearer().then(({ data }) => {
          expect(data).toHaveProperty('authorization', `Bearer ${apiKey}`);
        });
      });

      it('should throw if you pass in multiple bearer tokens', async () => {
        sdk.auth(apiKey, apiKey);
        await expect(sdk.postAnythingBearer()).rejects.toThrow(/only a single token is needed/i);
      });
    });
  });

  describe('OAuth 2', () => {
    it('should allow you to supply auth', async () => {
      fetchMock.post('https://httpbin.org/anything/oauth2', mockResponses.headers);

      sdk.auth(apiKey);

      await sdk.postAnythingOauth2().then(({ data }) => {
        expect(data).toHaveProperty('authorization', `Bearer ${apiKey}`);
      });
    });

    it('should throw if you pass in multiple bearer tokens', async () => {
      sdk.auth(apiKey, apiKey);
      await expect(sdk.postAnythingOauth2()).rejects.toThrow(/only a single token is needed/i);
    });
  });

  it('should allow multiple calls to share an API key', async () => {
    const endpointCall = vi.fn();
    fetchMock.get(
      {
        url: 'https://httpbin.org/anything/apiKey',
        query: { apiKey },
      },
      () => {
        endpointCall();
        return {};
      },
    );

    sdk.auth(apiKey);

    await sdk.getAnythingApikey().then(() => expect(endpointCall).toHaveBeenCalledTimes(1));
    await sdk.getAnythingApikey().then(() => expect(endpointCall).toHaveBeenCalledTimes(2));
  });

  it('should allow auth to be called again to change the key', async () => {
    const apiKey1 = '12345';
    const apiKey2 = '67890';

    fetchMock.get(
      {
        name: `fetch ${apiKey1}`,
        url: 'https://httpbin.org/anything/apiKey',
        query: { apiKey: apiKey1 },
      },
      mockResponses.searchParams,
    );

    fetchMock.get(
      {
        name: `fetch ${apiKey2}`,
        url: 'https://httpbin.org/anything/apiKey',
        query: { apiKey: apiKey2 },
      },
      mockResponses.searchParams,
    );

    sdk.auth(apiKey1);
    await sdk.getAnythingApikey().then(({ data }) => expect(data).toBe('/anything/apiKey?apiKey=12345'));

    sdk.auth(apiKey2);
    await sdk.getAnythingApikey().then(({ data }) => expect(data).toBe('/anything/apiKey?apiKey=67890'));
  });

  describe('quirks', () => {
    let authQuirksOas;
    let quirks;

    beforeAll(async () => {
      authQuirksOas = await loadSpec(require.resolve('./__fixtures__/definitions/auth-quirks.json'));
      quirks = api(authQuirksOas as unknown as OASDocument);
    });

    // Because the `POST /anything` operation allows either an OAuth2 token or Basic Auth the
    // quirks case we're testing is that you should be able to supply either a single OAuth2 token
    // or a username+password and it should be able to intelligently handle both.
    it('should have an expected security setting definition for this quirks case', () => {
      expect(authQuirksOas.paths['/anything'].post.security).toStrictEqual([
        { oauth2: ['write:things'] },
        { basicAuth: [] },
      ]);
    });

    it('should support an operation that has OR auth requirements (supplying Basic Auth)', async () => {
      const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;

      fetchMock.post('https://httpbin.org/anything', mockResponses.headers);

      quirks.auth(user, pass);
      await quirks.postAnything().then(({ data }) => {
        expect(data).toHaveProperty('authorization', authHeader);
      });
    });

    it('should support an operation that has OR auth requirements (supplying an OAuth2 token)', async () => {
      fetchMock.post('https://httpbin.org/anything', mockResponses.headers);

      quirks.auth(apiKey);
      await quirks.postAnything().then(({ data }) => {
        expect(data).toHaveProperty('authorization', `Bearer ${apiKey}`);
      });
    });
  });
});
