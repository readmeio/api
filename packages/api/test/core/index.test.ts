import { assert, expect } from 'chai';
import APICore from '../../src/core';
import Oas from 'oas';
import fetchMock from 'fetch-mock';

import { responses as mockResponse } from '../helpers/fetch-mock';

describe('APICore', function () {
  let petstore: APICore;
  let readme: APICore;
  let security: APICore;
  let serverVariables: APICore;

  const petId = 123;
  const response = {
    id: petId,
    name: 'Buster',
  };

  beforeEach(async function () {
    petstore = await import('@readme/oas-examples/3.0/json/petstore-expanded.json')
      .then(Oas.init)
      .then(oas => new APICore(oas));

    readme = await import('@readme/oas-examples/3.0/json/readme.json').then(Oas.init).then(oas => new APICore(oas));

    security = await import('@readme/oas-examples/3.0/json/security.json').then(Oas.init).then(oas => new APICore(oas));

    serverVariables = await import('@readme/oas-examples/3.0/json/server-variables.json')
      .then(Oas.init)
      .then(oas => new APICore(oas));
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe('#fetchOperation', function () {
    it('should make a request for a given operation with body + metadata parameters', async function () {
      const slug = 'new-release';
      const body = {
        title: 'revised title',
        body: 'updated body',
      };

      fetchMock.put(`https://dash.readme.com/api/v1/changelogs/${slug}`, mockResponse.requestBody);

      const operation = readme.spec.operation('/changelogs/{slug}', 'put');

      readme.setServer('https://dash.readme.com/api/v1');
      expect(await readme.fetchOperation(operation, body, { slug })).to.deep.equal({
        uri: '/api/v1/changelogs/new-release',
        requestBody: body,
      });
    });
  });

  describe('#fetch', function () {
    describe('error handling', function () {
      it('should reject for error-level status codes', async function () {
        fetchMock.delete(`http://petstore.swagger.io/api/pets/${petId}`, { body: 'Not Found', status: 404 });

        await petstore
          .fetch('/pets/{id}', 'delete', undefined, { id: petId })
          .then(() => assert.fail())
          .catch(async err => {
            expect(err.status).to.equal(404);

            const res = await err.text();
            expect(res).to.equal('Not Found');
          });
      });
    });

    describe('payload delivery', function () {
      it('should pass through body for method + path', async function () {
        const body = { name: 'Buster' };

        fetchMock.post('http://petstore.swagger.io/api/pets', mockResponse.real(body));

        expect(await petstore.fetch('/pets', 'post', body)).to.deep.equal(body);
      });

      it('should pass through parameters for method + path', async function () {
        const slug = 'new-release';
        fetchMock.put(`https://dash.readme.com/api/v1/changelogs/${slug}`, mockResponse.url('pathname'));

        readme.setServer('https://dash.readme.com/api/v1');
        expect(await readme.fetch('/changelogs/{slug}', 'put', undefined, { slug })).to.equal(
          '/api/v1/changelogs/new-release'
        );
      });

      it('should pass through parameters and body for method + path', async function () {
        const slug = 'new-release';
        const body = {
          title: 'revised title',
          body: 'updated body',
        };

        fetchMock.put(`https://dash.readme.com/api/v1/changelogs/${slug}`, mockResponse.requestBody);

        readme.setServer('https://dash.readme.com/api/v1');
        expect(await readme.fetch('/changelogs/{slug}', 'put', body, { slug })).to.deep.equal({
          uri: '/api/v1/changelogs/new-release',
          requestBody: body,
        });
      });

      describe('query parameter encoding', function () {
        let queryEncoding: APICore;

        beforeEach(function () {
          queryEncoding = new APICore(
            Oas.init({
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
            })
          );
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

          fetchMock.get('glob:https://*.*', mockResponse.searchParams);

          expect(await queryEncoding.fetch('/anything', 'get', undefined, params)).to.deep.equal(
            '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item'
          );
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

          fetchMock.get('glob:https://*.*', mockResponse.searchParams);

          expect(await queryEncoding.fetch('/anything', 'get', undefined, params)).to.deep.equal(
            '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item'
          );
        });
      });
    });
  });

  describe('#setUserAgent()', function () {
    it('should contain a custom user agent for the library in requests', async function () {
      const userAgent = 'customUserAgent 1.0';

      fetchMock.delete(`http://petstore.swagger.io/api/pets/${petId}`, mockResponse.headers);

      expect(
        await petstore.setUserAgent(userAgent).fetch('/pets/{id}', 'delete', undefined, { id: petId })
      ).to.have.deep.property('user-agent', userAgent);
    });
  });

  describe('#setAuth()', function () {
    it('should pass along auth in the request', async function () {
      const user = 'username';
      const pass = 'changeme';

      const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
      fetchMock.post('https://httpbin.org/anything/basic', mockResponse.headers);

      expect(await security.setAuth(user, pass).fetch('/anything/basic', 'post')).to.have.deep.property(
        'authorization',
        authHeader
      );
    });
  });

  describe('#setServer()', function () {
    it('should support supplying a full server url', async function () {
      fetchMock.post('https://buster.example.com:3000/v14/', mockResponse.real(response));

      serverVariables.setServer('https://buster.example.com:3000/v14');

      expect(await serverVariables.fetch('/', 'post')).to.deep.equal(response);
    });

    it('should support supplying a server url with server variables', async function () {
      fetchMock.post('http://dev.local/v14/', mockResponse.real(response));

      serverVariables.setServer('http://{name}.local/{basePath}', {
        name: 'dev',
        basePath: 'v14',
      });

      expect(await serverVariables.fetch('/', 'post')).to.deep.equal(response);
    });

    it.skip('should be able to supply a url on an OAS that has no servers defined');

    it.skip("should be able to supply a url that doesn't match any defined server");
  });

  describe('#setConfig', function () {
    describe('parseResponse', function () {
      it('should parse the response by default', async function () {
        fetchMock.delete(`http://petstore.swagger.io/api/pets/${petId}`, mockResponse.real(response));

        petstore.setConfig({ parseResponse: true });

        const res = await petstore.fetch('/pets/{id}', 'delete', undefined, { id: petId });
        expect(res.constructor.name).to.equal('Object');
        expect(res).to.deep.equal(response);
      });

      it('should give access to the Response object if `parseResponse` is `false`', async function () {
        fetchMock.delete(`http://petstore.swagger.io/api/pets/${petId}`, mockResponse.real(response));

        petstore.setConfig({ parseResponse: false });

        const res = await petstore.fetch('/pets/{id}', 'delete', undefined, { id: petId });

        // We can't do an `instanceOf` check on `res` because on Node 18 the `Response` object we
        // have here apparently isn't the same one that is being used in Node 18's native `fetch`
        // implementation.
        expect(res.constructor.name).to.equal('Response');
        expect(res.status).to.equal(200);

        expect(await res.json()).to.deep.equal(response);
      });
    });
  });
});
