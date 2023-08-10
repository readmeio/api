import type { OASDocument } from 'oas/dist/rmoas.types';

import assert from 'assert';

import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeAll, beforeEach, afterEach, it, expect, expectTypeOf } from 'vitest';

import pkg from '../package.json';
import api from '../src';
import Cache from '../src/cache';

import { responses as mockResponses } from './helpers/fetch-mock';
import loadSpec from './helpers/load-spec';

let petstoreSDK;
let readmeSDK;
let operationIDQuirksSDK;
const petstoreServerURL = 'http://petstore.swagger.io/api';

describe('api', () => {
  beforeAll(() => {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  beforeEach(async () => {
    const petstore = require.resolve('@readme/oas-examples/3.0/json/petstore-expanded.json');
    await new Cache(petstore).load();
    petstoreSDK = api(petstore);

    const readme = require.resolve('@readme/oas-examples/3.0/json/readme.json');
    await new Cache(readme).load();
    readmeSDK = api(readme);

    const operationIDQuirks = require.resolve('./__fixtures__/definitions/operationid-quirks.json');
    await new Cache(readme).load();
    operationIDQuirksSDK = api(operationIDQuirks);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#preloading', () => {
    let uspto;

    beforeEach(() => {
      uspto = require.resolve('@readme/oas-examples/3.0/json/uspto.json');
    });

    it('should proxy an sdk for the first time', async () => {
      fetchMock.get('https://developer.uspto.gov/ds-api/', mockResponses.url('pathname'));
      fetchMock.get('https://developer.uspto.gov/ds-api/two', mockResponses.url('pathname'));

      // Asserting that we have not previously loaded this API.
      expect(new Cache(uspto).isCached()).toBe(false);

      const sdk = api(uspto);

      // SDK should still not be loaded since we haven't officially called it yet.
      expect(new Cache(uspto).isCached()).toBe(false);
      expect(Object.keys(sdk)).toStrictEqual(['auth', 'config', 'server']);

      await sdk.listDataSets().then(({ data }) => expect(data).toBe('/ds-api/'));

      // Now that we've called something on the SDK, it should now be fully loaded.
      expect(new Cache(uspto).isCached()).toBe(true);
      expect(Object.keys(sdk)).toStrictEqual([
        'auth',
        'config',
        'server',
        'listDataSets',
        'list-data-sets',
        'listSearchableFields',
        'list-searchable-fields',
        'performSearch',
        'perform-search',
      ]);

      // Calling the same method again should also work as expected.
      await sdk.listDataSets().then(({ data }) => expect(data).toBe('/ds-api/'));
    });
  });

  describe('#accessors', () => {
    it('should have a function for each http method', () => {
      ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].forEach(method => {
        expectTypeOf(petstoreSDK[method]).toBeFunction();
      });
    });

    describe('#operationId()', () => {
      it('should work for operationId', async () => {
        fetchMock.get(`${petstoreServerURL}/pets`, mockResponses.real('it worked!'));

        await petstoreSDK.findPets().then(({ data }) => expect(data).toBe('it worked!'));
      });

      it('should work with operationIds that have contain spaces', async () => {
        fetchMock.get(`${petstoreServerURL}/pets/1234`, mockResponses.real('it worked!'));

        await petstoreSDK['find pet by id']({ id: 1234 }).then(({ data }) => expect(data).toBe('it worked!'));

        // Because we don't want people using ugly `operationID` accessors like the above we
        // transform them into JS-friendly method accessors also.
        await petstoreSDK.findPetById({ id: 1234 }).then(({ data }) => expect(data).toBe('it worked!'));
      });

      it('should work with operationIds that contain hyphens', async () => {
        fetchMock.get('https://httpbin.org/anything/hyphenated-operation-id', mockResponses.real('it worked!'));

        await operationIDQuirksSDK['hyphenated-operation-id']().then(({ data }) => expect(data).toBe('it worked!'));
        await operationIDQuirksSDK.hyphenatedOperationId().then(({ data }) => expect(data).toBe('it worked!'));
      });

      it('should support an operationId that was dynamically cleaned up within `Operation.getOperationId', async () => {
        const petstore = await loadSpec('@readme/oas-examples/3.0/json/petstore-expanded.json');

        // `GET /pets/{id}` in this petstore SDK has an operationID of `find pet by id` but the
        // `camelCase` option on `Operation.getOperationId()` should transform it into
        // `findPetById`.
        expect(petstore.paths['/pets/{id}'].get.operationId).toBe('find pet by id');
        expectTypeOf(petstoreSDK.findPetById).toBeFunction();
      });

      it('should work for other methods', async () => {
        fetchMock.post(`${petstoreServerURL}/pets`, mockResponses.real('it worked!'));

        await petstoreSDK.addPet().then(({ data }) => expect(data).toBe('it worked!'));
      });

      it.todo('should allow operationId to be the same as a http method');

      it('should error if an operationId does not exist', async () => {
        await expect(petstoreSDK.findPetz()).rejects.toThrow(/does not appear to be a valid operation/);
      });
    });
  });

  describe('#fetch', () => {
    const petId = 123;

    it('should reject for error-level status codes', async () => {
      const response = {
        error: 'ENDPOINT_NOTFOUND',
        message: `The endpoint you called (GET /pets/${petId}) doesn't exist`,
      };

      fetchMock.delete(`${petstoreServerURL}/pets/${petId}`, { body: response, status: 404 });

      await petstoreSDK
        .deletePet({ id: petId })
        .then(() => assert.fail())
        .catch(({ data, status }) => {
          expect(status).toBe(404);
          expect(data).toStrictEqual(response);
        });
    });

    it('should contain a custom user agent for the library in requests', async () => {
      const userAgent = `${pkg.name} (node)/${pkg.version}`;
      fetchMock.delete(`${petstoreServerURL}/pets/${petId}`, mockResponses.headers, {
        headers: {
          'User-Agent': userAgent,
        },
      });

      await petstoreSDK.deletePet({ id: petId }).then(({ data }) => {
        expect(data).toHaveProperty('user-agent', userAgent);
      });
    });

    describe('operationId', () => {
      it('should pass through parameters for operationId', async () => {
        const response = {
          id: petId,
          name: 'Buster',
        };

        fetchMock.delete(`${petstoreServerURL}/pets/${petId}`, response);

        await petstoreSDK.deletePet({ id: petId }).then(({ data }) => expect(data).toStrictEqual(response));
      });

      it('should pass through body for operationId', async () => {
        const body = { name: 'Buster' };
        fetchMock.post(`${petstoreServerURL}/pets`, body, { body });

        await petstoreSDK.addPet(body).then(({ data }) => expect(data).toStrictEqual(body));
      });

      it('should pass through parameters and body for operationId', async () => {
        const slug = 'new-release';
        const body = {
          title: 'revised title',
          body: 'updated body',
        };

        fetchMock.put(`https://dash.readme.com/api/v1/changelogs/${slug}`, mockResponses.requestBody, { body });

        readmeSDK.server('https://dash.readme.com/api/v1');
        await readmeSDK.updateChangelog(body, { slug }).then(({ data }) => {
          expect(data).toStrictEqual({
            requestBody: body,
            uri: '/api/v1/changelogs/new-release',
          });
        });
      });
    });

    describe('query parameter encoding', () => {
      let queryEncoding;

      beforeEach(() => {
        queryEncoding = api({
          openapi: '3.1.0',
          info: {
            version: '1.0.0',
            title: '',
          },
          servers: [{ url: 'https://httpbin.org/' }],
          paths: {
            '/anything': {
              get: {
                operationId: 'getAnything',
                parameters: [
                  { name: 'stringPound', in: 'query', schema: { type: 'string' } },
                  { name: 'stringPound2', in: 'query', schema: { type: 'string' } },
                  { name: 'stringHash', in: 'query', schema: { type: 'string' } },
                  { name: 'stringArray', in: 'query', schema: { type: 'string' } },
                  { name: 'stringWeird', in: 'query', schema: { type: 'string' } },
                  { name: 'array', in: 'query', schema: { type: 'array', items: { type: 'string' } } },
                ],
              },
            },
          },
        } as unknown as OASDocument);
      });

      it('should encode query parameters', async () => {
        const params = {
          stringPound: 'something&nothing=true',
          stringHash: 'hash#data',
          stringArray: 'where[4]=10',
          stringWeird: 'properties["$email"] == "testing"',
          array: [
            encodeURIComponent('something&nothing=true'), // This is already encoded so it shouldn't be double encoded.
            'nothing&something=false',
            'another item',
          ],
        };

        fetchMock.get('glob:https://*.*', mockResponses.searchParams);

        await queryEncoding.getAnything(params).then(({ data }) => {
          expect(data).toBe(
            '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item',
          );
        });
      });

      it("should not double encode query params if they're already encoded", async () => {
        const params = {
          stringPound: encodeURIComponent('something&nothing=true'),
          stringHash: encodeURIComponent('hash#data'),
          stringArray: encodeURIComponent('where[4]=10'),
          stringWeird: encodeURIComponent('properties["$email"] == "testing"'),
          array: [
            'something&nothing=true', // Should still encode this one eventhrough the others are already encoded.
            encodeURIComponent('nothing&something=false'),
            encodeURIComponent('another item'),
          ],
        };

        fetchMock.get('glob:https://*.*', mockResponses.searchParams);

        await queryEncoding.getAnything(params).then(({ data }) => {
          expect(data).toBe(
            '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item',
          );
        });
      });
    });
  });
});
