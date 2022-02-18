import { expect } from 'chai';
import api from '../src';

import fileUploads from '@readme/oas-examples/3.0/json/file-uploads.json';
import parametersStyle from '@readme/oas-examples/3.1/json/parameters-style.json';

describe('integration tests', function () {
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
      const body = {
        criteria: 'propertyName:value',
      };

      const metadata = {
        dataset: 'v1',
        version: 'oa_citations',
      };

      const res = await api(usptoSpec).post('/{dataset}/{version}/records', body, metadata);
      expect(res.args).to.deep.equal({});
      expect(res.data).to.equal('');
      expect(res.files).to.deep.equal({});
      expect(res.form).to.deep.equal({
        criteria: 'propertyName:value',
      });
      expect(res.headers).to.have.property('Content-Type', 'application/x-www-form-urlencoded');
      expect(res.headers)
        .to.have.property('User-Agent')
        .and.match(/api \(node\)\/\d+.\d+.\d+/);
      expect(res.json).to.be.null;
      expect(res.method).to.equal('POST');
      expect(res.origin).to.be.a('string');
      expect(res.url).to.equal('https://httpbin.org/anything/v1/oa_citations/records');
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
    const body = `${__dirname}/__fixtures__/owlbert.png`;

    const res = await api(fileUploads).post('/anything/image-png', body);

    expect(res.args).to.deep.equal({});
    expect(res.data).to.match(/data:application\/octet-stream;base64/);
    expect(res.files).to.deep.equal({});
    expect(res.form).to.deep.equal({});
    expect(res.headers).to.have.property('Content-Type', 'image/png');
    expect(res.headers)
      .to.have.property('User-Agent')
      .and.match(/api \(node\)\/\d+.\d+.\d+/);
    expect(res.json).to.be.null;
    expect(res.method).to.equal('POST');
    expect(res.origin).to.be.a('string');
    expect(res.url).to.equal('https://httpbin.org/anything/image-png');
  });

  describe('multipart/form-data', function () {
    it('should support `multipart/form-data` requests', async function () {
      const body = {
        primitive: 'string',
        array: ['string'],
        object: {
          foo: 'foo-string',
          bar: 'bar-string',
        },
      };

      const res = await api(parametersStyle).post('/anything/form-data/form', body);
      expect(res.args).to.deep.equal({});
      expect(res.data).to.equal('');
      expect(res.files).to.deep.equal({});
      expect(res.form).to.deep.equal({
        array: 'string',
        object: 'foo,foo-string,bar,bar-string',
        primitive: 'string',
      });
      expect(res.headers)
        .to.have.property('Content-Type')
        .and.match(/^multipart\/form-data; boundary=form-data-boundary-(.*)$/);
      expect(res.headers)
        .to.have.property('User-Agent')
        .and.match(/api \(node\)\/\d+.\d+.\d+/);
      expect(res.json).to.be.null;
      expect(res.method).to.equal('POST');
      expect(res.origin).to.be.a('string');
      expect(res.url).to.equal('https://httpbin.org/anything/form-data/form');
    });

    describe('files', function () {
      it('should support plaintext files', async function () {
        const body = {
          orderId: 1234,
          userId: 5678,
          documentFile: `${__dirname}/__fixtures__/hello.txt`,
        };

        const res = await api(fileUploads).post('/anything/multipart-formdata', body);
        expect(res.args).to.deep.equal({});
        expect(res.data).to.equal('');
        expect(res.files).to.deep.equal({
          documentFile: `Hello world!
`,
        });
        expect(res.form).to.deep.equal({ orderId: '1234', userId: '5678' });
        expect(res.headers)
          .to.have.property('Content-Type')
          .and.match(/^multipart\/form-data; boundary=form-data-boundary-(.*)$/);
        expect(res.headers)
          .to.have.property('User-Agent')
          .and.match(/api \(node\)\/\d+.\d+.\d+/);
        expect(res.json).to.be.null;
        expect(res.method).to.equal('POST');
        expect(res.origin).to.be.a('string');
        expect(res.url).to.equal('https://httpbin.org/anything/multipart-formdata');
      });

      it('should support plaintext files containing unicode characters', async function () {
        const body = {
          documentFile: `${__dirname}/__fixtures__/hello.jp.txt`,
        };

        const res = await api(fileUploads).post('/anything/multipart-formdata', body);
        expect(res.files).to.deep.equal({
          documentFile: `速い茶色のキツネは怠惰な犬を飛び越えます
`,
        });
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
