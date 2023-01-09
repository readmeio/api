import type { OASDocument } from 'oas/dist/rmoas.types';

import chai, { expect } from 'chai';
import datauri from 'datauri';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../src';
import Cache from '../src/cache';

import chaiPlugins from './helpers/chai-plugins';
import { responses as mockResponse } from './helpers/fetch-mock';
import loadSpec from './helpers/load-spec';

chai.use(chaiPlugins);

let fileUploads;
let parametersStyle;
let petstore;
let security;

describe('integration tests', function () {
  before(async function () {
    fileUploads = await loadSpec('@readme/oas-examples/3.0/json/file-uploads.json');
    parametersStyle = await loadSpec('@readme/oas-examples/3.1/json/parameters-style.json');
    petstore = await loadSpec('@readme/oas-examples/3.0/json/petstore.json');
    security = await loadSpec('@readme/oas-examples/3.0/json/security.json');

    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe('`application/x-www-form-urlencoded`', function () {
    let usptoSpec;

    beforeEach(async function () {
      usptoSpec = await loadSpec('@readme/oas-examples/3.0/json/uspto.json').then(spec => {
        // eslint-disable-next-line no-param-reassign
        spec.servers[0].url = '{scheme}://httpbin.org/anything';
        return spec;
      });
    });

    it('should support `application/x-www-form-urlencoded` requests', async function () {
      fetchMock.post('https://httpbin.org/anything/v1/oa_citations/records', mockResponse.all);

      const body = {
        criteria: 'propertyName:value',
      };

      const metadata = {
        dataset: 'v1',
        version: 'oa_citations',
      };

      const { data } = await api(usptoSpec).performSearch(body, metadata);
      expect(data.uri).to.equal('/anything/v1/oa_citations/records');
      expect(data.requestBody).to.equal('criteria=propertyName%3Avalue');
      expect(data.headers).to.have.deep.property('content-type', 'application/x-www-form-urlencoded');
      expect(data.headers).to.have.be.a.customUserAgent;
    });

    // it.skip('should send along required parameters if not supplied', async function () {
    //   const metadata = {
    //     dataset: 'v1',
    //     version: 'oa_citations',
    //   };

    //   const { data } = await api(usptoSpec).post('/{dataset}/{version}/records', metadata);
    //   await expect(data).resolves.toStrictEqual({
    //     args: {},
    //     data: '',
    //     files: {},
    //     form: {
    //       criteria: '*/*', // @todo should include this because it's a default
    //     },
    //     headers: expect.objectContaining({
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'User-Agent': expect.stringMatching(/api \(node\)\/\d+.\d+.\d+/),
    //     }),
    //     json: null,
    //     method: 'POST',
    //     origin: expect.any(String),
    //     url: 'https://httpbin.org/anything/v1/oa_citations/records',
    //   });
    // });
  });

  it('should support `image/png` requests', async function () {
    fetchMock.post('https://httpbin.org/anything/image-png', mockResponse.datauri);

    const file = `${__dirname}/__fixtures__/owlbert.png`;

    const { data } = await api(fileUploads as unknown as OASDocument).postAnythingImagePng(file);
    expect(data.uri).to.equal('/anything/image-png');
    expect(data.requestBody).to.equal(await datauri(file));
    expect(data.headers).to.have.deep.property('content-type', 'image/png');
    expect(data.headers).to.have.a.customUserAgent;
  });

  describe('header handling', function () {
    describe('`authorization`', function () {
      it('should support supplying an `authorization` header', async function () {
        fetchMock.post('http://petstore.swagger.io/v2/pet', mockResponse.all);

        const body = {
          id: 1234,
          name: 'buster',
        };

        const metadata = {
          authorization: 'bearer 12345',
        };

        const sdk = api(petstore as unknown as OASDocument);

        sdk.auth('buster');

        const { data } = await sdk.addPet(body, metadata);
        expect(data.uri).to.equal('/v2/pet');
        expect(data.requestBody).to.equal('{"id":1234,"name":"buster"}');
        expect(data.headers).to.have.deep.property('authorization', 'bearer 12345');
        expect(data.headers).to.have.a.customUserAgent;
      });

      it('should support supplying an `authorization` header (on an operation that has no params)', async function () {
        fetchMock.post('https://httpbin.org/anything/bearer', mockResponse.headers);

        const metadata = {
          authorization: 'bearer 12345',
        };

        const securityApi = api(security as unknown as OASDocument);

        securityApi.auth('buster');

        await securityApi.postAnythingBearer(metadata).then(({ data }) => {
          // `authorization: bearer buster` should not be here because we manually supplied
          // `authorization: bearer 12345` to the metadata.
          expect(data).to.have.deep.property('authorization', 'bearer 12345');
        });
      });
    });

    describe('`accept`', function () {
      it('should support supplying an `accept` header', async function () {
        fetchMock.post('http://petstore.swagger.io/v2/pet', mockResponse.all);

        const body = {
          id: 1234,
          name: 'buster',
        };

        const metadata = {
          accept: 'text/xml',
        };

        const { data } = await api(petstore as unknown as OASDocument).addPet(body, metadata);
        expect(data.uri).to.equal('/v2/pet');
        expect(data.requestBody).to.equal('{"id":1234,"name":"buster"}');
        expect(data.headers).to.have.deep.property('accept', 'text/xml');
        expect(data.headers).to.have.a.customUserAgent;
      });

      it('should support supplying **only** an `accept` header', async function () {
        fetchMock.post('http://petstore.swagger.io/v2/pet', mockResponse.all);

        const metadata = {
          accept: 'text/xml',
        };

        const { data } = await api(petstore as unknown as OASDocument).addPet(metadata);
        expect(data.uri).to.equal('/v2/pet');
        expect(data.requestBody).to.be.undefined;
        expect(data.headers).to.have.deep.property('accept', 'text/xml');
        expect(data.headers).to.have.a.customUserAgent;
      });

      it('should support supplying an `authorization` header (on an operation that has no params)', async function () {
        fetchMock.post('https://httpbin.org/anything/bearer', mockResponse.headers);

        const metadata = {
          accept: 'application/buster+json',
        };

        const { data } = await api(security as unknown as OASDocument).postAnythingBearer(metadata);
        expect(data).to.have.deep.property('accept', 'application/buster+json');
      });
    });
  });

  describe('multipart/form-data', function () {
    it('should support `multipart/form-data` requests', async function () {
      fetchMock.post('https://httpbin.org/anything/form-data/form', mockResponse.multipart);

      const body = {
        primitive: 'string',
        array: ['string'],
        object: {
          foo: 'foo-string',
          bar: 'bar-string',
        },
      };

      const { data } = await api(parametersStyle as unknown as OASDocument).formData_form_nonExploded(body);
      expect(data.uri).to.equal('/anything/form-data/form');
      expect(data.requestBody.split(`--${data.boundary}`).filter(Boolean)).to.deep.equal([
        '\r\nContent-Disposition: form-data; name="primitive"\r\n\r\nstring\r\n',
        '\r\nContent-Disposition: form-data; name="array"\r\n\r\nstring\r\n',
        '\r\nContent-Disposition: form-data; name="object"\r\n\r\nfoo,foo-string,bar,bar-string\r\n',
        '--\r\n\r\n',
      ]);

      expect(data.headers).to.have.deep.property('content-type', `multipart/form-data; boundary=${data.boundary}`);
      expect(data.headers).to.have.deep.property('content-length', '356');
      expect(data.headers).to.have.a.customUserAgent;
    });

    describe('files', function () {
      it('should support plaintext files', async function () {
        fetchMock.post('https://httpbin.org/anything/multipart-formdata', mockResponse.multipart);

        const body = {
          orderId: 1234,
          userId: 5678,
          documentFile: `${__dirname}/__fixtures__/hello.txt`,
        };

        const { data } = await api(fileUploads as unknown as OASDocument).postAnythingMultipartFormdata(body);
        expect(data.uri).to.equal('/anything/multipart-formdata');
        expect(data.requestBody.split(`--${data.boundary}`).filter(Boolean)).to.deep.equal([
          '\r\nContent-Disposition: form-data; name="orderId"\r\n\r\n1234\r\n',
          '\r\nContent-Disposition: form-data; name="userId"\r\n\r\n5678\r\n',
          '\r\nContent-Disposition: form-data; name="documentFile"; filename="hello.txt"\r\nContent-Type: text/plain\r\n\r\nHello world!\n\r\n',
          '--\r\n\r\n',
        ]);

        expect(data.headers).to.have.deep.property('content-type', `multipart/form-data; boundary=${data.boundary}`);
        expect(data.headers).to.have.deep.property('content-length', '389');
        expect(data.headers).to.have.a.customUserAgent;
      });

      it('should support plaintext files containing unicode characters', async function () {
        fetchMock.post('https://httpbin.org/anything/multipart-formdata', mockResponse.multipart);

        const body = {
          documentFile: `${__dirname}/__fixtures__/hello.jp.txt`,
        };

        const { data } = await api(fileUploads as unknown as OASDocument).postAnythingMultipartFormdata(body);
        expect(data.uri).to.equal('/anything/multipart-formdata');
        expect(data.requestBody.split(`--${data.boundary}`).filter(Boolean)).to.deep.equal([
          '\r\nContent-Disposition: form-data; name="documentFile"; filename="hello.jp.txt"\r\nContent-Type: text/plain\r\n\r\n速い茶色のキツネは怠惰な犬を飛び越えます\n\r\n',
          '--\r\n\r\n',
        ]);

        expect(data.headers).to.have.deep.property('content-type', `multipart/form-data; boundary=${data.boundary}`);
        expect(data.headers).to.have.deep.property('content-length', '251');
        expect(data.headers).to.have.a.customUserAgent;
      });
    });

    // it.skip('should support `multipart/form-data` requests with an array of files', async function () {
    //   const body = [
    //     `${__dirname}/__fixtures__/owlbert.png`,
    //     `${__dirname}/__fixtures__/owlbert-shrub.png`,
    //   ];

    //   await api(fileUploads).post('/anything/form-data', body).then({ data } => {
    //     console.log(data)
    //   })
    // });
  });
});
