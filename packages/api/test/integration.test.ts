import chai, { expect } from 'chai';
import nock from 'nock';
import uniqueTempDir from 'unique-temp-dir';
import datauri from 'datauri';
import DatauriParser from 'datauri/parser';
import chaiPlugins from './helpers/chai-plugins';

import api from '../src';
import Cache from '../src/cache';

import fileUploads from '@readme/oas-examples/3.0/json/file-uploads.json';
import parametersStyle from '@readme/oas-examples/3.1/json/parameters-style.json';

chai.use(chaiPlugins);

describe('integration tests', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  this.beforeAll(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  describe('`application/x-www-form-urlencoded`', function () {
    let usptoSpec;

    beforeEach(async function () {
      usptoSpec = await import('@readme/oas-examples/3.0/json/uspto.json')
        .then(({ default: spec }) => JSON.stringify(spec))
        .then(JSON.parse)
        .then(spec => {
          // eslint-disable-next-line no-param-reassign
          spec.servers[0].url = '{scheme}://httpbin.org/anything';
          return spec;
        });
    });

    it('should support `application/x-www-form-urlencoded` requests', async function () {
      const mock = nock('https://httpbin.org')
        .post('/anything/v1/oa_citations/records')
        .reply(200, function (uri, requestBody) {
          return {
            uri,
            requestBody,
            headers: this.req.headers,
          };
        });

      const body = {
        criteria: 'propertyName:value',
      };

      const metadata = {
        dataset: 'v1',
        version: 'oa_citations',
      };

      const res = await api(usptoSpec).post('/{dataset}/{version}/records', body, metadata);
      expect(res.uri).to.equal('/anything/v1/oa_citations/records');
      expect(res.requestBody).to.equal('criteria=propertyName%3Avalue');
      expect(res.headers).to.have.deep.property('content-type', ['application/x-www-form-urlencoded']);
      expect(res.headers).to.have.a.customUserAgent;

      mock.done();
    });

    // it.skip('should send along required parameters if not supplied', async function () {
    //   const metadata = {
    //     dataset: 'v1',
    //     version: 'oa_citations',
    //   };

    //   await expect(api(usptoSpec).post('/{dataset}/{version}/records', metadata)).resolves.toStrictEqual({
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
    const mock = nock('https://httpbin.org')
      .post('/anything/image-png')
      .reply(200, function (uri, requestBody) {
        const buffer = Buffer.from(requestBody as string, 'hex');
        const parser = new DatauriParser();

        return {
          uri,
          requestBody: parser.format('.png', buffer).content,
          headers: this.req.headers,
        };
      });

    const file = `${__dirname}/__fixtures__/owlbert.png`;

    const res = await api(fileUploads).post('/anything/image-png', file);
    expect(res.uri).to.equal('/anything/image-png');
    expect(res.requestBody).to.equal(await datauri(file));
    expect(res.headers).to.have.deep.property('content-type', ['image/png']);
    expect(res.headers).to.have.deep.property('content-length', ['400']);
    expect(res.headers).to.have.a.customUserAgent;

    mock.done();
  });

  describe('multipart/form-data', function () {
    it('should support `multipart/form-data` requests', async function () {
      const mock = nock('https://httpbin.org')
        .post('/anything/form-data/form')
        .reply(200, function (uri, requestBody) {
          return {
            uri,
            requestBody,
            boundary: this.req.headers['content-type'][0].split('boundary=')[1],
            headers: this.req.headers,
          };
        });

      const body = {
        primitive: 'string',
        array: ['string'],
        object: {
          foo: 'foo-string',
          bar: 'bar-string',
        },
      };

      const res = await api(parametersStyle).post('/anything/form-data/form', body);
      expect(res.uri).to.equal('/anything/form-data/form');
      expect(res.requestBody.split(`--${res.boundary}`).filter(Boolean)).to.deep.equal([
        '\r\nContent-Disposition: form-data; name="primitive"\r\n\r\nstring\r\n',
        '\r\nContent-Disposition: form-data; name="array"\r\n\r\nstring\r\n',
        '\r\nContent-Disposition: form-data; name="object"\r\n\r\nfoo,foo-string,bar,bar-string\r\n',
        '--\r\n\r\n',
      ]);

      expect(res.headers).to.have.deep.property('content-type', [`multipart/form-data; boundary=${res.boundary}`]);
      expect(res.headers).to.have.deep.property('content-length', ['356']);
      expect(res.headers).to.have.a.customUserAgent;

      mock.done();
    });

    describe('files', function () {
      it('should support plaintext files', async function () {
        const mock = nock('https://httpbin.org')
          .post('/anything/multipart-formdata')
          .reply(200, function (uri, requestBody) {
            return {
              uri,
              requestBody,
              boundary: this.req.headers['content-type'][0].split('boundary=')[1],
              headers: this.req.headers,
            };
          });

        const body = {
          orderId: 1234,
          userId: 5678,
          documentFile: `${__dirname}/__fixtures__/hello.txt`,
        };

        const res = await api(fileUploads).post('/anything/multipart-formdata', body);
        expect(res.uri).to.equal('/anything/multipart-formdata');
        expect(res.requestBody.split(`--${res.boundary}`).filter(Boolean)).to.deep.equal([
          '\r\nContent-Disposition: form-data; name="orderId"\r\n\r\n1234\r\n',
          '\r\nContent-Disposition: form-data; name="userId"\r\n\r\n5678\r\n',
          '\r\nContent-Disposition: form-data; name="documentFile"; filename="hello.txt"\r\nContent-Type: text/plain\r\n\r\nHello world!\n\r\n',
          '--\r\n\r\n',
        ]);

        expect(res.headers).to.have.deep.property('content-type', [`multipart/form-data; boundary=${res.boundary}`]);
        expect(res.headers).to.have.deep.property('content-length', ['389']);
        expect(res.headers).to.have.a.customUserAgent;

        mock.done();
      });

      it('should support plaintext files containing unicode characters', async function () {
        const mock = nock('https://httpbin.org')
          .post('/anything/multipart-formdata')
          .reply(200, function (uri, requestBody) {
            return {
              uri,
              requestBody,
              boundary: this.req.headers['content-type'][0].split('boundary=')[1],
              headers: this.req.headers,
            };
          });

        const body = {
          documentFile: `${__dirname}/__fixtures__/hello.jp.txt`,
        };

        const res = await api(fileUploads).post('/anything/multipart-formdata', body);
        expect(res.uri).to.equal('/anything/multipart-formdata');
        expect(res.requestBody.split(`--${res.boundary}`).filter(Boolean)).to.deep.equal([
          '\r\nContent-Disposition: form-data; name="documentFile"; filename="hello.jp.txt"\r\nContent-Type: text/plain\r\n\r\n速い茶色のキツネは怠惰な犬を飛び越えます\n\r\n',
          '--\r\n\r\n',
        ]);

        expect(res.headers).to.have.deep.property('content-type', [`multipart/form-data; boundary=${res.boundary}`]);
        expect(res.headers).to.have.deep.property('content-length', ['251']);
        expect(res.headers).to.have.a.customUserAgent;

        mock.done();
      });
    });

    // it.only('should support `multipart/form-data` requests with an array of files', async function () {
    //   const body = [
    //     `${__dirname}/__fixtures__/owlbert.png`,
    //     `${__dirname}/__fixtures__/owlbert-shrub.png`,
    //   ];

    //   await api(fileUploads).post('/anything/form-data', body).then(res => {
    //     console.logx(res)
    //   })
    // });
  });
});