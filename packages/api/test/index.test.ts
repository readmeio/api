import type { OASDocument } from 'oas/dist/rmoas.types';

import { assert, expect } from 'chai';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';

import pkg from '../package.json';
import api from '../src';
import Cache from '../src/cache';

import { responses as mockResponses } from './helpers/fetch-mock';
import loadSpec from './helpers/load-spec';

let petstoreSDK;
let readmeSDK;
let operationIDQuirksSDK;
const petstoreServerUrl = 'http://petstore.swagger.io/api';

describe('api', function () {
  before(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  beforeEach(async function () {
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

  afterEach(function () {
    fetchMock.restore();
  });

  describe('#preloading', function () {
    let uspto;

    beforeEach(function () {
      uspto = require.resolve('@readme/oas-examples/3.0/json/uspto.json');
    });

    it('should proxy an sdk for the first time', async function () {
      fetchMock.get('https://developer.uspto.gov/ds-api/', mockResponses.url('pathname'));
      fetchMock.get('https://developer.uspto.gov/ds-api/two', mockResponses.url('pathname'));

      // Asserting that we have not previously loaded this API.
      expect(new Cache(uspto).isCached()).to.be.false;

      const sdk = api(uspto);

      // SDK should still not be loaded since we haven't officially called it yet.
      expect(new Cache(uspto).isCached()).to.be.false;
      expect(Object.keys(sdk)).to.deep.equal(['auth', 'config', 'server']);

      await sdk.listDataSets().then(({ data }) => expect(data).to.equal('/ds-api/'));

      // Now that we've called something on the SDK, it should now be fully loaded.
      expect(new Cache(uspto).isCached()).to.be.true;
      expect(Object.keys(sdk)).to.deep.equal([
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
      await sdk.listDataSets().then(({ data }) => expect(data).to.equal('/ds-api/'));
    });
  });

  describe('#accessors', function () {
    it('should have a function for each http method', function () {
      ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].forEach(method => {
        expect(petstoreSDK[method]).to.be.a('function');
      });
    });

    describe('#operationId()', function () {
      it('should work for operationId', async function () {
        fetchMock.get(`${petstoreServerUrl}/pets`, mockResponses.real('it worked!'));

        await petstoreSDK.findPets().then(({ data }) => expect(data).to.equal('it worked!'));
      });

      it('should work with operationIds that have contain spaces', async function () {
        fetchMock.get(`${petstoreServerUrl}/pets/1234`, mockResponses.real('it worked!'));

        await petstoreSDK['find pet by id']({ id: 1234 }).then(({ data }) => expect(data).to.equal('it worked!'));

        // Because we don't want people using ugly `operationID` accessors like the above we
        // transform them into JS-friendly method accessors also.
        await petstoreSDK.findPetById({ id: 1234 }).then(({ data }) => expect(data).to.equal('it worked!'));
      });

      it('should work with operationIds that contain hyphens', async function () {
        fetchMock.get('https://httpbin.org/anything/hyphenated-operation-id', mockResponses.real('it worked!'));

        await operationIDQuirksSDK['hyphenated-operation-id']().then(({ data }) => expect(data).to.equal('it worked!'));
        await operationIDQuirksSDK.hyphenatedOperationId().then(({ data }) => expect(data).to.equal('it worked!'));
      });

      it('should support an operationId that was dynamically cleaned up within `Operation.getOperationId', async function () {
        const petstore = await loadSpec('@readme/oas-examples/3.0/json/petstore-expanded.json');

        // `GET /pets/{id}` in this petstore SDK has an operationID of `find pet by id` but the
        // `camelCase` option on `Operation.getOperationId()` should transform it into
        // `findPetById`.
        expect(petstore.paths['/pets/{id}'].get.operationId).to.equal('find pet by id');
        expect(petstoreSDK.findPetById).to.be.a('function');
      });

      it('should work for other methods', async function () {
        fetchMock.post(`${petstoreServerUrl}/pets`, mockResponses.real('it worked!'));

        await petstoreSDK.addPet().then(({ data }) => expect(data).to.equal('it worked!'));
      });

      it.skip('should allow operationId to be the same as a http method');

      it('should error if an operationId does not exist', async function () {
        await petstoreSDK
          .findPetz()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/does not appear to be a valid operation/);
          });
      });
    });
  });

  describe('#fetch', function () {
    const petId = 123;

    it('should reject for error-level status codes', async function () {
      const response = {
        error: 'ENDPOINT_NOTFOUND',
        message: `The endpoint you called (GET /pets/${petId}) doesn't exist`,
      };

      fetchMock.delete(`${petstoreServerUrl}/pets/${petId}`, { body: response, status: 404 });

      await petstoreSDK
        .deletePet({ id: petId })
        .then(() => assert.fail())
        .catch(({ data, status }) => {
          expect(status).to.equal(404);
          expect(data).to.deep.equal(response);
        });
    });

    it('should contain a custom user agent for the library in requests', async function () {
      const userAgent = `${pkg.name} (node)/${pkg.version}`;
      fetchMock.delete(`${petstoreServerUrl}/pets/${petId}`, mockResponses.headers, {
        headers: {
          'User-Agent': userAgent,
        },
      });

      await petstoreSDK.deletePet({ id: petId }).then(({ data }) => {
        expect(data).to.have.deep.property('user-agent', userAgent);
      });
    });

    describe('operationId', function () {
      it('should pass through parameters for operationId', async function () {
        const response = {
          id: petId,
          name: 'Buster',
        };

        fetchMock.delete(`${petstoreServerUrl}/pets/${petId}`, response);

        await petstoreSDK.deletePet({ id: petId }).then(({ data }) => expect(data).to.deep.equal(response));
      });

      it('should pass through body for operationId', async function () {
        const body = { name: 'Buster' };
        fetchMock.post(`${petstoreServerUrl}/pets`, body, { body });

        await petstoreSDK.addPet(body).then(({ data }) => expect(data).to.deep.equal(body));
      });

      it('should pass through parameters and body for operationId', async function () {
        const slug = 'new-release';
        const body = {
          title: 'revised title',
          body: 'updated body',
        };

        fetchMock.put(`https://dash.readme.com/api/v1/changelogs/${slug}`, mockResponses.requestBody, { body });

        readmeSDK.server('https://dash.readme.com/api/v1');
        await readmeSDK.updateChangelog(body, { slug }).then(({ data }) => {
          expect(data).to.deep.equal({
            requestBody: body,
            uri: '/api/v1/changelogs/new-release',
          });
        });
      });
    });

    describe('query parameter encoding', function () {
      let queryEncoding;

      beforeEach(function () {
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

      it('should encode query parameters', async function () {
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
          expect(data).to.equal(
            '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item'
          );
        });
      });

      it("should not double encode query params if they're already encoded", async function () {
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
          expect(data).to.deep.equal(
            '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item'
          );
        });
      });
    });
  });
});
