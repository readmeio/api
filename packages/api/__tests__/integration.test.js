// const nock = require('nock');
const api = require('../src');

const fileUploads = require('@readme/oas-examples/3.0/json/file-uploads.json');

beforeEach(() => {
  // Though this test doesn't mock anything out because nock is used within every other test in
  // this suite there's an issue where if you run them all together nock will be enabled here and
  // any request that happens will fail because nock reports them as being unmocked.
  // nock.restore();
  // nock.disableNetConnect();
  // nock.enableNetConnect();
});

describe('`application/x-www-form-urlencoded`', () => {
  const usptoSpec = JSON.parse(JSON.stringify(require('@readme/oas-examples/3.0/json/uspto.json')));
  usptoSpec.servers[0].url = '{scheme}://httpbin.org/anything';

  it('should support `application/x-www-form-urlencoded` requests', async () => {
    const body = {
      criteria: 'propertyName:value',
    };

    const metadata = {
      dataset: 'v1',
      version: 'oa_citations',
    };

    await expect(api(usptoSpec).post('/{dataset}/{version}/records', body, metadata)).resolves.toStrictEqual({
      args: {},
      data: '',
      files: {},
      form: {
        criteria: 'propertyName:value',
      },
      headers: expect.objectContaining({
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': expect.stringMatching(/api \(node\)\/\d+.\d+.\d+/),
      }),
      json: null,
      method: 'POST',
      origin: expect.any(String),
      url: 'https://httpbin.org/anything/v1/oa_citations/records',
    });
  });

  // it.skip('should send along required parameters if not supplied', async () => {
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

test('should support `image/png` requests', async () => {
  const body = `${__dirname}/__fixtures__/owlbert.png`;

  await expect(api(fileUploads).post('/anything/image-png', body)).resolves.toStrictEqual({
    args: {},
    data: expect.stringMatching(/data:application\/octet-stream;base64/),
    files: {},
    form: {},
    headers: expect.objectContaining({
      'Content-Type': 'image/png',
      'User-Agent': expect.stringMatching(/api \(node\)\/\d+.\d+.\d+/),
    }),
    json: null,
    method: 'POST',
    origin: expect.any(String),
    url: 'https://httpbin.org/anything/image-png',
  });
});

describe('multipart/form-data', () => {
  it('should support `multipart/form-data` requests', async () => {
    const parametersStyle = require('@readme/oas-examples/3.1/json/parameters-style.json');

    const body = {
      primitive: 'string',
      array: ['string'],
      object: {
        foo: 'foo-string',
        bar: 'bar-string',
      },
    };

    await expect(api(parametersStyle).post('/anything/form-data/form', body)).resolves.toStrictEqual({
      args: {},
      data: '',
      files: {},
      form: {
        array: 'string',
        object: 'foo,foo-string,bar,bar-string',
        primitive: 'string',
      },
      headers: expect.objectContaining({
        'Content-Type': expect.stringMatching(/^multipart\/form-data; boundary=form-data-boundary-(.*)$/),
        'User-Agent': expect.stringMatching(/api \(node\)\/\d+.\d+.\d+/),
      }),
      json: null,
      method: 'POST',
      origin: expect.any(String),
      url: 'https://httpbin.org/anything/form-data/form',
    });
  });

  it('should support `multipart/form-data` requests with files', async () => {
    const body = {
      orderId: 1234,
      userId: 5678,
      documentFile: `${__dirname}/__fixtures__/hello.txt`,
    };

    await expect(api(fileUploads).post('/anything/multipart-formdata', body)).resolves.toStrictEqual({
      args: {},
      data: '',
      files: {
        documentFile: `Hello world!
`,
      },
      form: { orderId: '1234', userId: '5678' },
      headers: expect.objectContaining({
        'Content-Type': expect.stringMatching(/^multipart\/form-data; boundary=form-data-boundary-(.*)$/),
        'User-Agent': expect.stringMatching(/api \(node\)\/\d+.\d+.\d+/),
      }),
      json: null,
      method: 'POST',
      origin: expect.any(String),
      url: 'https://httpbin.org/anything/multipart-formdata',
    });
  });

  // it.only('should support `multipart/form-data` requests with an array of files', async () => {
  //   const body = [
  //     `${__dirname}/__fixtures__/owlbert.png`,
  //     `${__dirname}/__fixtures__/owlbert-shrub.png`,
  //   ];

  //   await api(fileUploads).post('/anything/form-data', body).then(res => {
  //     console.logx(res)
  //   })
  // });
});
