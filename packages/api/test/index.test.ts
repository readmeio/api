import { assert, expect } from 'chai';
import uniqueTempDir from 'unique-temp-dir';
import nock from 'nock';

import api from '../src';
import Cache from '../src/cache';
import pkg from '../package.json';

let petstoreSdk;
let readmeSdk;
const petstoreServerUrl = 'http://petstore.swagger.io/api';

describe('api', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  this.beforeAll(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  beforeEach(async function () {
    const petstore = require.resolve('@readme/oas-examples/3.0/json/petstore-expanded.json');
    await new Cache(petstore).saveFile();
    petstoreSdk = api(petstore);

    const readme = require.resolve('@readme/oas-examples/3.0/json/readme.json');
    await new Cache(readme).saveFile();
    readmeSdk = api(readme);
  });

  describe('#preloading', function () {
    let uspto;

    beforeEach(function () {
      uspto = require.resolve('@readme/oas-examples/3.0/json/uspto.json');
    });

    it('should proxy an sdk for the first time', async function () {
      const mock = nock('https://developer.uspto.gov/ds-api')
        .get('/')
        .reply(200, uri => uri)
        .get('/two')
        .reply(200, uri => uri);

      // Asserting that we have not previously loaded this API.
      expect(new Cache(uspto).isCached()).to.be.false;

      const sdk = api(uspto);

      // SDK should still not be loaded since we haven't officially called it yet.
      expect(new Cache(uspto).isCached()).to.be.false;
      expect(Object.keys(sdk)).to.deep.equal(['auth', 'config', 'server']);

      expect(await sdk.get('/')).to.equal('/ds-api/');

      // Now that we've called something on the SDK, it should now be fully loaded.
      expect(new Cache(uspto).isCached()).to.be.true;
      expect(Object.keys(sdk)).to.deep.equal([
        'auth',
        'config',
        'server',
        'get',
        'put',
        'post',
        'delete',
        'options',
        'head',
        'patch',
        'trace',
        'listDataSets',
        'listSearchableFields',
        'performSearch',
      ]);

      // Calling the same method again should also work as expected.
      expect(await sdk.get('/two')).to.equal('/ds-api/two');

      mock.done();
    });

    it('should support supplying a raw JSON OAS object', function () {
      const sdk = api(uspto);
      expect(sdk.get).to.be.a('function');
    });
  });

  describe('#accessors', function () {
    it('should have a function for each http method', function () {
      ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].forEach(method => {
        expect(petstoreSdk[method]).to.be.a('function');
      });
    });

    describe('#operationId()', function () {
      it('should work for operationId', async function () {
        const mock = nock(petstoreServerUrl).get('/pets').reply(200, 'it worked!');

        expect(await petstoreSdk.findPets()).to.equal('it worked!');
        mock.done();
      });

      it('should work with operationIds that have contain spaces', function () {
        expect(petstoreSdk['find pet by id']).to.be.a('function');
      });

      it('should support an operationId that was dynamically cleaned up within `Operation.getOperationId', async function () {
        const petstore = await import('@readme/oas-examples/3.0/json/petstore-expanded.json');

        // `GET /pets/{id}` in this petstore SDK has an operationID of `find pet by id` but the
        // `camelCase` option on `Operation.getOperationId()` should transform it into
        // `findPetById`.
        expect(petstore.paths['/pets/{id}'].get.operationId).to.equal('find pet by id');
        expect(petstoreSdk.findPetById).to.be.a('function');
      });

      it('should work for other methods', async function () {
        const mock = nock(petstoreServerUrl).post('/pets').reply(200, 'it worked!');

        expect(await petstoreSdk.addPet()).to.equal('it worked!');
        mock.done();
      });

      it.skip('should allow operationId to be the same as a http method');

      it('should error if an operationId does not exist', async function () {
        await petstoreSdk
          .findPetz()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/does not appear to be a valid operation/);
          });
      });
    });

    describe('#method(path)', function () {
      it('should work for method and path', async function () {
        const mock = nock(petstoreServerUrl).get('/pets').reply(200, 'it worked!');

        expect(await petstoreSdk.get('/pets')).to.equal('it worked!');
        mock.done();
      });

      it('should error if method does not exist', async function () {
        await petstoreSdk
          .fetch('/pets')
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.match(/does not appear to be a valid operation/);
          });
      });

      it.skip('should error if a path does not exist on a method');
    });
  });

  describe('#fetch', function () {
    const petId = 123;

    it('should reject for error-level status codes', async function () {
      const response = {
        error: 'ENDPOINT_NOTFOUND',
        message: `The endpoint you called (GET /pets/${petId}) doesn't exist`,
      };

      const mock = nock(petstoreServerUrl).delete(`/pets/${petId}`).reply(404, response);

      await petstoreSdk
        .deletePet({ id: petId })
        .then(() => assert.fail())
        .catch(async err => {
          expect(err.status).to.equal(404);

          const json = await err.json();
          expect(json).to.deep.equal(response);
        });

      mock.done();
    });

    it('should contain a custom user agent for the library in requests', async function () {
      const userAgent = `${pkg.name} (node)/${pkg.version}`;
      const mock = nock(petstoreServerUrl, {
        reqheaders: {
          'User-Agent': userAgent,
        },
      })
        .delete(`/pets/${petId}`)
        .reply(200, function () {
          return this.req.headers['user-agent'];
        });

      expect(await petstoreSdk.deletePet({ id: petId })).to.deep.equal([userAgent]);
      mock.done();
    });

    describe('operationId', function () {
      it('should pass through parameters for operationId', async function () {
        const response = {
          id: petId,
          name: 'Buster',
        };

        const mock = nock(petstoreServerUrl).delete(`/pets/${petId}`).reply(200, response);

        expect(await petstoreSdk.deletePet({ id: petId })).to.deep.equal(response);
        mock.done();
      });

      it('should pass through body for operationId', async function () {
        const body = { name: 'Buster' };
        const mock = nock(petstoreServerUrl)
          .post('/pets', body)
          .reply(200, (uri, requestBody) => requestBody);

        expect(await petstoreSdk.addPet(body)).to.deep.equal(body);
        mock.done();
      });

      it('should pass through parameters and body for operationId', async function () {
        const slug = 'new-release';
        const body = {
          title: 'revised title',
          body: 'updated body',
        };

        const mock = nock('https://dash.readme.com/api/v1')
          .put(`/changelogs/${slug}`, body)
          .reply(200, (uri, requestBody) => ({ uri, requestBody }));

        readmeSdk.server('https://dash.readme.com/api/v1');
        expect(await readmeSdk.updateChangelog(body, { slug })).to.deep.equal({
          requestBody: body,
          uri: '/api/v1/changelogs/new-release',
        });
        mock.done();
      });
    });

    describe('method + path', function () {
      it('should pass through body for method + path', async function () {
        const body = { name: 'Buster' };

        const mock = nock(petstoreServerUrl)
          .post('/pets', body)
          .reply(200, (uri, requestBody) => requestBody);

        expect(await petstoreSdk.post('/pets', body)).to.deep.equal(body);
        mock.done();
      });

      it('should pass through parameters for method + path', async function () {
        const slug = 'new-release';
        const mock = nock('https://dash.readme.com/api/v1')
          .put(`/changelogs/${slug}`)
          .reply(200, uri => uri);

        readmeSdk.server('https://dash.readme.com/api/v1');
        expect(await readmeSdk.put('/changelogs/{slug}', { slug })).to.equal('/api/v1/changelogs/new-release');
        mock.done();
      });

      it('should pass through parameters and body for method + path', async function () {
        const slug = 'new-release';
        const body = {
          title: 'revised title',
          body: 'updated body',
        };

        const mock = nock('https://dash.readme.com/api/v1')
          .put(`/changelogs/${slug}`, body)
          .reply(200, function (uri, requestBody) {
            return {
              uri,
              requestBody,
            };
          });

        readmeSdk.server('https://dash.readme.com/api/v1');
        expect(await readmeSdk.put('/changelogs/{slug}', body, { slug })).to.deep.equal({
          uri: '/api/v1/changelogs/new-release',
          requestBody: body,
        });
        mock.done();
      });
    });

    describe('query parameter encoding', function () {
      let queryEncoding;

      beforeEach(function () {
        queryEncoding = api({
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
        });
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

        const mock = nock('https://httpbin.org/')
          .get('/anything')
          .query(true)
          .reply(200, function () {
            return { path: this.req.path };
          });

        expect(await queryEncoding.getAnything(params)).to.deep.equal({
          path: '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item',
        });

        mock.done();
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

        const mock = nock('https://httpbin.org/')
          .get('/anything')
          .query(true)
          .reply(200, function () {
            return { path: this.req.path };
          });

        expect(await queryEncoding.getAnything(params)).to.deep.equal({
          path: '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item',
        });

        mock.done();
      });
    });
  });
});
