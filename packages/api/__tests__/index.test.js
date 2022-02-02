const nock = require('nock');
const path = require('path');
const api = require('../src');
const Cache = require('../src/cache');
const pkg = require('../package.json');
const { vol } = require('memfs');

const realFs = jest.requireActual('fs/promises');

jest.mock('fs', () => require('memfs').fs);

const examplesDir = path.join(__dirname, 'examples');

let petstoreSdk;
let readmeSdk;
const petstoreServerUrl = 'http://petstore.swagger.io/api';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
});

beforeEach(async () => {
  vol.fromJSON({
    [`${[examplesDir]}/petstore.json`]: await realFs.readFile(
      require.resolve('@readme/oas-examples/3.0/json/petstore-expanded.json'),
      'utf8'
    ),
    [`${[examplesDir]}/readme.json`]: await realFs.readFile(
      require.resolve('@readme/oas-examples/3.0/json/readme.json'),
      'utf8'
    ),
    [`${[examplesDir]}/uspto.json`]: await realFs.readFile(
      require.resolve('@readme/oas-examples/3.0/json/uspto.json'),
      'utf8'
    ),
  });

  const petstore = path.join(examplesDir, 'petstore.json');
  await new Cache(petstore).saveFile();
  petstoreSdk = api(petstore);

  const readme = path.join(examplesDir, 'readme.json');
  await new Cache(readme).saveFile();
  readmeSdk = api(readme);
});

afterEach(() => {
  vol.reset();
});

describe('#preloading', () => {
  const uspto = path.join(examplesDir, 'uspto.json');

  it('should proxy an sdk for the first time', async () => {
    const mock = nock('https://developer.uspto.gov/ds-api')
      .get('/')
      .reply(200, function () {
        return { href: this.req.options.href };
      })
      .get('/two')
      .reply(200, function () {
        return { href: this.req.options.href };
      });

    // Asserting that we have not previously loaded this API.
    expect(new Cache(uspto).isCached()).toBe(false);

    const sdk = api(uspto);

    // SDK should still not be loaded since we haven't officially called it yet.
    expect(new Cache(uspto).isCached()).toBe(false);
    expect(Object.keys(sdk)).toStrictEqual(['auth', 'config', 'server']);

    await expect(sdk.get('/')).resolves.toStrictEqual({
      href: 'https://developer.uspto.gov/ds-api/',
    });

    // Now that we've called something on the SDK, it should now be fully loaded.
    expect(new Cache(uspto).isCached()).toBe(true);
    expect(Object.keys(sdk)).toStrictEqual([
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
      'list-data-sets',
      'list-searchable-fields',
      'perform-search',
    ]);

    // Calling the same method again should also work as expected.
    await expect(sdk.get('/two')).resolves.toStrictEqual({
      href: 'https://developer.uspto.gov/ds-api/two',
    });

    mock.done();
  });

  it('should support supplying a raw JSON OAS object', () => {
    const sdk = api(uspto);
    expect(typeof sdk.get).toBe('function');
  });
});

describe('#accessors', () => {
  it('should have a function for each http method', () => {
    ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].forEach(method => {
      expect(typeof petstoreSdk[method]).toBe('function');
    });
  });

  describe('#operationId()', () => {
    it('should work for operationId', async () => {
      const mock = nock(petstoreServerUrl).get('/pets').reply(200, 'it worked!');

      await expect(petstoreSdk.findPets()).resolves.toBe('it worked!');
      mock.done();
    });

    it('should work with operationIds that have contain spaces', () => {
      expect(typeof petstoreSdk['find pet by id']).toBe('function');
    });

    it('should work for other methods', async () => {
      const mock = nock(petstoreServerUrl).post('/pets').reply(200, 'it worked!');

      await expect(petstoreSdk.addPet()).resolves.toBe('it worked!');
      mock.done();
    });

    it.todo('should allow operationId to be the same as a http method');

    it('should error if an operationId does not exist', () => {
      return expect(petstoreSdk.findPetz()).rejects.toThrow(/does not appear to be a valid operation/);
    });
  });

  describe('#method(path)', () => {
    it('should work for method and path', async () => {
      const mock = nock(petstoreServerUrl).get('/pets').reply(200, 'it worked!');

      await expect(petstoreSdk.get('/pets')).resolves.toBe('it worked!');
      mock.done();
    });

    it('should error if method does not exist', () => {
      return expect(petstoreSdk.fetch('/pets')).rejects.toThrow(/does not appear to be a valid operation/);
    });
  });
});

describe('#fetch', () => {
  const petId = 123;

  it('should reject for error-level status codes', async () => {
    expect.assertions(2);

    const response = {
      error: 'ENDPOINT_NOTFOUND',
      message: `The endpoint you called (GET /pets/${petId}) doesn't exist`,
    };

    const mock = nock(petstoreServerUrl).delete(`/pets/${petId}`).reply(404, response);

    await petstoreSdk.deletePet({ id: petId }).catch(async err => {
      expect(err.status).toBe(404); // eslint-disable-line jest/no-conditional-expect

      const json = await err.json();
      expect(json).toStrictEqual(response); // eslint-disable-line jest/no-conditional-expect
    });
    mock.done();
  });

  it('should contain a custom user agent for the library in requests', async () => {
    expect.assertions(1);

    const userAgent = `${pkg.name} (node)/${pkg.version}`;
    const mock = nock(petstoreServerUrl, {
      reqheaders: {
        'User-Agent': userAgent,
      },
    })
      .delete(`/pets/${petId}`)
      .reply(200, function () {
        return this.req.headers['user-agent'].shift();
      });

    await expect(petstoreSdk.deletePet({ id: petId })).resolves.toBe(userAgent);
    mock.done();
  });

  describe('operationId', () => {
    it('should pass through parameters for operationId', async () => {
      const response = {
        id: petId,
        name: 'Buster',
      };

      const mock = nock(petstoreServerUrl).delete(`/pets/${petId}`).reply(200, response);

      await expect(petstoreSdk.deletePet({ id: petId })).resolves.toStrictEqual(response);
      mock.done();
    });

    it('should pass through body for operationId', async () => {
      const body = { name: 'Buster' };
      const mock = nock(petstoreServerUrl)
        .post('/pets', body)
        .reply(200, function (uri, requestBody) {
          return requestBody;
        });

      await expect(petstoreSdk.addPet(body)).resolves.toStrictEqual(body);
      mock.done();
    });

    it('should pass through parameters and body for operationId', async () => {
      const slug = 'new-release';
      const body = {
        title: 'revised title',
        body: 'updated body',
      };

      const mock = nock('https://dash.readme.com/api/v1')
        .put(`/changelogs/${slug}`, body)
        .reply(200, function (uri, requestBody) {
          return {
            url: this.req.options.href,
            body: requestBody,
          };
        });

      await expect(readmeSdk.updateChangelog(body, { slug })).resolves.toStrictEqual({
        url: 'https://dash.readme.com/api/v1/changelogs/new-release',
        body,
      });
      mock.done();
    });
  });

  describe('method + path', () => {
    it('should pass through body for method + path', async () => {
      const body = { name: 'Buster' };

      const mock = nock(petstoreServerUrl)
        .post('/pets', body)
        .reply(200, (uri, requestBody) => {
          return requestBody;
        });

      await expect(petstoreSdk.post('/pets', body)).resolves.toStrictEqual(body);
      mock.done();
    });

    it('should pass through parameters for method + path', async () => {
      const slug = 'new-release';
      const mock = nock('https://dash.readme.com/api/v1')
        .put(`/changelogs/${slug}`)
        .reply(200, function () {
          return this.req.options.href;
        });

      await expect(readmeSdk.put('/changelogs/{slug}', { slug })).resolves.toBe(
        'https://dash.readme.com/api/v1/changelogs/new-release'
      );
      mock.done();
    });

    it('should pass through parameters and body for method + path', async () => {
      const slug = 'new-release';
      const body = {
        title: 'revised title',
        body: 'updated body',
      };

      const mock = nock('https://dash.readme.com/api/v1')
        .put(`/changelogs/${slug}`, body)
        .reply(200, function (uri, requestBody) {
          return {
            url: this.req.options.href,
            body: requestBody,
          };
        });

      await expect(readmeSdk.put('/changelogs/{slug}', body, { slug })).resolves.toStrictEqual({
        url: 'https://dash.readme.com/api/v1/changelogs/new-release',
        body,
      });
      mock.done();
    });
  });

  describe('query parameter encoding', () => {
    const queryEncoding = api({
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

      const mock = nock('https://httpbin.org/')
        .get('/anything')
        .query(true)
        .reply(200, function () {
          return { path: this.req.path };
        });

      await expect(queryEncoding.getAnything(params)).resolves.toStrictEqual({
        path: '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item',
      });

      mock.done();
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

      const mock = nock('https://httpbin.org/')
        .get('/anything')
        .query(true)
        .reply(200, function () {
          return { path: this.req.path };
        });

      await expect(queryEncoding.getAnything(params)).resolves.toStrictEqual({
        path: '/anything?stringPound=something%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item',
      });

      mock.done();
    });
  });
});
