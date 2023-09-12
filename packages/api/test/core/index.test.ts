import assert from 'assert';

import datauri from 'datauri';
import fetchMock from 'fetch-mock';
import Oas from 'oas';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';

import APICore from '../../src/core';
import FetchError from '../../src/core/errors/fetchError';
import { responses as mockResponse } from '../helpers/fetch-mock';
import loadSpec from '../helpers/load-spec';

describe('APICore', () => {
  let fileUploads: APICore;
  let parametersStyle: APICore;
  let petstore: APICore;
  let readme: APICore;
  let security: APICore;
  let serverVariables: APICore;

  const petId = 123;
  const response = {
    id: petId,
    name: 'Buster',
  };

  beforeEach(async () => {
    fileUploads = await loadSpec('@readme/oas-examples/3.0/json/file-uploads.json')
      .then(Oas.init)
      .then(oas => new APICore(oas));

    parametersStyle = await loadSpec('@readme/oas-examples/3.1/json/parameters-style.json')
      .then(Oas.init)
      .then(oas => new APICore(oas));

    petstore = await loadSpec('@readme/oas-examples/3.0/json/petstore-expanded.json')
      .then(Oas.init)
      .then(oas => new APICore(oas));

    readme = await loadSpec('@readme/oas-examples/3.0/json/readme.json')
      .then(Oas.init)
      .then(oas => new APICore(oas));

    security = await loadSpec('@readme/oas-examples/3.0/json/security.json')
      .then(Oas.init)
      .then(oas => new APICore(oas));

    serverVariables = await loadSpec('@readme/oas-examples/3.0/json/server-variables.json')
      .then(Oas.init)
      .then(oas => new APICore(oas));
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#fetchOperation', () => {
    it('should make a request for a given operation with body + metadata parameters', async () => {
      const slug = 'new-release';
      const body = {
        title: 'revised title',
        body: 'updated body',
      };

      fetchMock.put(`https://dash.readme.com/api/v1/changelogs/${slug}`, mockResponse.requestBody);

      const operation = readme.spec.operation('/changelogs/{slug}', 'put');

      readme.setServer('https://dash.readme.com/api/v1');
      await readme.fetchOperation(operation, body, { slug }).then(({ data }) => {
        expect(data).toStrictEqual({
          uri: '/api/v1/changelogs/new-release',
          requestBody: body,
        });
      });
    });
  });

  describe('#fetch', () => {
    describe('error handling', () => {
      it('should reject for error-level status codes', async () => {
        fetchMock.delete(`http://petstore.swagger.io/api/pets/${petId}`, {
          body: 'Could not find that pet.',
          status: 404,
        });

        await petstore
          .fetch('/pets/{id}', 'delete', undefined, { id: petId })
          .then(() => assert.fail())
          .catch(err => {
            expect(err).toBeInstanceOf(FetchError);
            expect(err.status).toBe(404);
            expect(err.data).toBe('Could not find that pet.');
            expect(err.headers).toHaveHeader('content-type', /text\/plain/);
            expect(err.res.constructor.name).toBe('Response');
          });
      });
    });

    describe('payload delivery', () => {
      it('should pass through body for method + path', async () => {
        const body = { name: 'Buster' };

        fetchMock.post('http://petstore.swagger.io/api/pets', mockResponse.real(body));

        await petstore.fetch('/pets', 'post', body).then(({ data }) => expect(data).toStrictEqual(body));
      });

      it('should pass through parameters for method + path', async () => {
        const slug = 'new-release';
        fetchMock.put(`https://dash.readme.com/api/v1/changelogs/${slug}`, mockResponse.url('pathname'));

        readme.setServer('https://dash.readme.com/api/v1');
        await readme.fetch('/changelogs/{slug}', 'put', undefined, { slug }).then(({ data }) => {
          expect(data).toBe('/api/v1/changelogs/new-release');
        });
      });

      it('should pass through parameters and body for method + path', async () => {
        const slug = 'new-release';
        const body = {
          title: 'revised title',
          body: 'updated body',
        };

        fetchMock.put(`https://dash.readme.com/api/v1/changelogs/${slug}`, mockResponse.requestBody);

        readme.setServer('https://dash.readme.com/api/v1');
        await readme.fetch('/changelogs/{slug}', 'put', body, { slug }).then(({ data }) => {
          expect(data).toStrictEqual({
            uri: '/api/v1/changelogs/new-release',
            requestBody: body,
          });
        });
      });

      describe('query parameter encoding', () => {
        let queryEncoding: APICore;

        beforeEach(() => {
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
            }),
          );
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

          fetchMock.get('glob:https://*.*', mockResponse.searchParams);

          await queryEncoding.fetch('/anything', 'get', undefined, params).then(({ data }) => {
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

          fetchMock.get('glob:https://*.*', mockResponse.searchParams);

          await queryEncoding.fetch('/anything', 'get', undefined, params).then(({ data }) => {
            expect(data).toBe(
              '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item',
            );
          });
        });
      });

      describe('application/x-www-form-urlencoded', () => {
        it('should support `application/x-www-form-urlencoded` requests', async () => {
          const usptoSpec = await loadSpec('@readme/oas-examples/3.0/json/uspto.json')
            .then(spec => {
              // eslint-disable-next-line no-param-reassign
              spec.servers[0].url = '{scheme}://httpbin.org/anything';
              return spec;
            })
            .then(Oas.init)
            .then(oas => new APICore(oas));

          fetchMock.post('https://httpbin.org/anything/v1/oa_citations/records', mockResponse.all);

          const body = {
            criteria: 'propertyName:value',
          };

          const metadata = {
            dataset: 'v1',
            version: 'oa_citations',
          };

          const { data } = await usptoSpec.fetch('/{dataset}/{version}/records', 'post', body, metadata);
          expect(data.uri).toBe('/anything/v1/oa_citations/records');
          expect(data.requestBody).toBe('criteria=propertyName%3Avalue');
          expect(data.headers).toHaveProperty('content-type', 'application/x-www-form-urlencoded');
        });
      });

      describe('multipart/form-data', () => {
        it('should support `image/png` requests', async () => {
          fetchMock.post('https://httpbin.org/anything/image-png', mockResponse.datauri);

          const file = `${__dirname}/../__fixtures__/owlbert.png`;

          const { data } = await fileUploads.fetch('/anything/image-png', 'post', file);

          expect(data.uri).toBe('/anything/image-png');
          expect(data.requestBody).toBe(await datauri(file));
          expect(data.headers).toHaveProperty('content-type', 'image/png');
        });

        it('should support `multipart/form-data` requests', async () => {
          fetchMock.post('https://httpbin.org/anything/form-data/form', mockResponse.multipart);

          const body = {
            primitive: 'string',
            array: ['string'],
            object: {
              foo: 'foo-string',
              bar: 'bar-string',
            },
          };

          const { data } = await parametersStyle.fetch('/anything/form-data/form', 'post', body);
          expect(data.uri).toBe('/anything/form-data/form');
          expect(data.requestBody.split(`${data.boundary}`).filter(Boolean)).toStrictEqual([
            '\r\nContent-Disposition: form-data; name="primitive"\r\n\r\nstring\r\n',
            '\r\nContent-Disposition: form-data; name="array"\r\n\r\nstring\r\n',
            '\r\nContent-Disposition: form-data; name="object"\r\n\r\nfoo,foo-string,bar,bar-string\r\n',
            '--',
          ]);
        });

        describe('files', () => {
          it('should support plaintext files', async () => {
            fetchMock.post('https://httpbin.org/anything/multipart-formdata', mockResponse.multipart);

            const body = {
              orderId: 1234,
              userId: 5678,
              documentFile: `${__dirname}/../__fixtures__/hello.txt`,
            };

            const { data } = await fileUploads.fetch('/anything/multipart-formdata', 'post', body);
            expect(data.uri).toBe('/anything/multipart-formdata');
            expect(data.requestBody.split(`${data.boundary}`).filter(Boolean)).toStrictEqual([
              '\r\nContent-Disposition: form-data; name="orderId"\r\n\r\n1234\r\n',
              '\r\nContent-Disposition: form-data; name="userId"\r\n\r\n5678\r\n',
              '\r\nContent-Disposition: form-data; name="documentFile"; filename="hello.txt"\r\nContent-Type: text/plain\r\n\r\nHello world!\n\r\n',
              '--',
            ]);
          });

          it('should support plaintext files containing unicode characters', async () => {
            fetchMock.post('https://httpbin.org/anything/multipart-formdata', mockResponse.multipart);

            const body = {
              documentFile: `${__dirname}/../__fixtures__/hello.jp.txt`,
            };

            const { data } = await fileUploads.fetch('/anything/multipart-formdata', 'post', body);
            expect(data.uri).toBe('/anything/multipart-formdata');
            expect(data.requestBody.split(`${data.boundary}`).filter(Boolean)).toStrictEqual([
              '\r\nContent-Disposition: form-data; name="documentFile"; filename="hello.jp.txt"\r\nContent-Type: text/plain\r\n\r\n速い茶色のキツネは怠惰な犬を飛び越えます\n\r\n',
              '--',
            ]);
          });
        });
      });
    });
  });

  describe('#setUserAgent()', () => {
    it('should contain a custom user agent for the library in requests', async () => {
      const userAgent = 'customUserAgent 1.0';

      fetchMock.delete(`http://petstore.swagger.io/api/pets/${petId}`, mockResponse.headers);

      await petstore
        .setUserAgent(userAgent)
        .fetch('/pets/{id}', 'delete', undefined, { id: petId })
        .then(({ data }) => {
          expect(data).toHaveProperty('user-agent', userAgent);
        });
    });
  });

  describe('#setAuth()', () => {
    it('should pass along auth in the request', async () => {
      const user = 'buster';
      const pass = 'hunter1';

      const authHeader = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
      fetchMock.post('https://httpbin.org/anything/basic', mockResponse.headers);

      await security
        .setAuth(user, pass)
        .fetch('/anything/basic', 'post')
        .then(({ data }) => {
          expect(data).toHaveProperty('authorization', authHeader);
        });
    });
  });

  describe('#setServer()', () => {
    it('should support supplying a full server url', async () => {
      fetchMock.post('https://buster.example.com:3000/v14/', mockResponse.real(response));

      serverVariables.setServer('https://buster.example.com:3000/v14');

      await serverVariables.fetch('/', 'post').then(({ data }) => expect(data).toStrictEqual(response));
    });

    it('should support supplying a server url with server variables', async () => {
      fetchMock.post('http://dev.local/v14/', mockResponse.real(response));

      serverVariables.setServer('http://{name}.local/{basePath}', {
        name: 'dev',
        basePath: 'v14',
      });

      await serverVariables.fetch('/', 'post').then(({ data }) => expect(data).toStrictEqual(response));
    });

    it.todo('should be able to supply a url on an OAS that has no servers defined');

    it.todo("should be able to supply a url that doesn't match any defined server");
  });

  describe('#setConfig()', () => {
    describe('timeout', () => {
      let petstoreTimeout: APICore;

      beforeEach(async () => {
        petstoreTimeout = await loadSpec('@readme/oas-examples/3.0/json/petstore.json')
          .then(Oas.init)
          .then(oas => new APICore(oas));
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should override the default `fetch` timeout if present and fail if request takes too long', async () => {
        fetchMock.delete(`http://petstore.swagger.io/v2/pet/${petId}`, mockResponse.delay(response, 500));

        petstoreTimeout.setConfig({ timeout: 100 });

        await expect(petstoreTimeout.fetch(`/pet/${petId}`, 'delete')).rejects.toThrow('The operation was aborted.');
      });

      it('should override the default `fetch` timeout and return if request is quick', async () => {
        fetchMock.delete(`http://petstore.swagger.io/v2/pet/${petId}`, mockResponse.delay(response, 100));

        petstoreTimeout.setConfig({ timeout: 500 });

        await petstoreTimeout.fetch(`/pet/${petId}`, 'delete').then(({ data }) => {
          expect(data).toStrictEqual(response);
        });
      });
    });
  });
});
