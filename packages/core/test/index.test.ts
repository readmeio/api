import { assert, expect } from 'chai';
import APICore from '../src';
import Oas from 'oas';
import nock from 'nock';

describe('APICore', function () {
  let petstore: APICore;
  let readme: APICore;
  let security: APICore;
  let serverVariables: APICore;

  const petId = 123;

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

  describe('#fetch', function () {
    describe('error handling', function () {
      it('should reject for error-level status codes', async function () {
        const mock = nock('http://petstore.swagger.io/api').delete(`/pets/${petId}`).reply(404, 'Not Found');

        await petstore
          .fetch('/pets/{id}', 'delete', undefined, { id: petId })
          .then(() => assert.fail())
          .catch(async err => {
            expect(err.status).to.equal(404);

            const res = await err.text();
            expect(res).to.equal('Not Found');
          });

        mock.done();
      });
    });

    describe('payload delivery', function () {
      it('should pass through body for method + path', async function () {
        const body = { name: 'Buster' };

        const mock = nock('http://petstore.swagger.io/api')
          .post('/pets', body)
          .reply(200, (uri, requestBody) => requestBody);

        expect(await petstore.fetch('/pets', 'post', body)).to.deep.equal(body);
        mock.done();
      });

      it('should pass through parameters for method + path', async function () {
        const slug = 'new-release';
        const mock = nock('https://dash.readme.com/api/v1')
          .put(`/changelogs/${slug}`)
          .reply(200, uri => uri);

        expect(await readme.fetch('/changelogs/{slug}', 'put', undefined, { slug })).to.equal(
          '/api/v1/changelogs/new-release'
        );
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

        expect(await readme.fetch('/changelogs/{slug}', 'put', body, { slug })).to.deep.equal({
          uri: '/api/v1/changelogs/new-release',
          requestBody: body,
        });
        mock.done();
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

          const mock = nock('https://httpbin.org/')
            .get('/anything')
            .query(true)
            .reply(200, function () {
              return { path: this.req.path };
            });

          expect(await queryEncoding.fetch('/anything', 'get', undefined, params)).to.deep.equal({
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

          expect(await queryEncoding.fetch('/anything', 'get', undefined, params)).to.deep.equal({
            path: '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item',
          });

          mock.done();
        });
      });
    });
  });

  describe('#setUserAgent()', function () {
    it('should contain a custom user agent for the library in requests', async function () {
      const userAgent = 'customUserAgent 1.0';

      const mock = nock('http://petstore.swagger.io/api', {
        reqheaders: {
          'User-Agent': userAgent,
        },
      })
        .delete(`/pets/${petId}`)
        .reply(200, function () {
          return this.req.headers['user-agent'];
        });

      expect(
        await petstore.setUserAgent(userAgent).fetch('/pets/{id}', 'delete', undefined, { id: petId })
      ).to.deep.equal([userAgent]);
      mock.done();
    });
  });

  describe('#setAuth()', function () {
    it('should pass along auth in the request', async function () {
      const user = 'username';
      const pass = 'changeme';

      const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
      const mock = nock('https://httpbin.org')
        .post('/basic')
        .reply(200, function () {
          return this.req.headers;
        });

      expect(await security.setAuth(user, pass).fetch('/basic', 'post')).to.have.deep.property('authorization', [
        authHeader,
      ]);
      mock.done();
    });
  });

  describe('#setServer()', function () {
    const response = {
      id: petId,
      name: 'Buster',
    };

    it('should support supplying a full server url', async function () {
      const mock = nock('https://buster.example.com:3000').post('/v14/').reply(200, response);

      serverVariables.setServer('https://buster.example.com:3000/v14');

      expect(await serverVariables.fetch('/', 'post')).to.deep.equal(response);
      mock.done();
    });

    it('should support supplying a server url with server variables', async function () {
      const mock = nock('http://dev.local/v14').post('/').reply(200, response);

      serverVariables.setServer('http://{name}.local/{basePath}', {
        name: 'dev',
        basePath: 'v14',
      });

      expect(await serverVariables.fetch('/', 'post')).to.deep.equal(response);
      mock.done();
    });

    it.skip('should be able to supply a url on an OAS that has no servers defined');

    it.skip("should be able to supply a url that doesn't match any defined server");
  });
});
