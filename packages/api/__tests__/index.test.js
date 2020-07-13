const nock = require('nock');
const { join } = require('path');
const findCacheDir = require('find-cache-dir');
const fsMock = require('mock-fs');
const fs = require('fs').promises;
const api = require('../src');
const Cache = require('../src/cache');
const pkg = require('../package.json');

const serverUrl = 'https://api.example.com';
const createOas = require('./__fixtures__/createOas')(serverUrl);

const examplesDir = join(__dirname, 'examples');

let petstoreSdk;
let readmeSdk;
const petstoreServerUrl = 'http://petstore.swagger.io/api';

beforeEach(async () => {
  fsMock({
    [examplesDir]: {
      'petstore.json': await fs.readFile(
        require.resolve('@readme/oas-examples/3.0/json/petstore-expanded.json'),
        'utf8'
      ),
      'readme.json': await fs.readFile(require.resolve('@readme/oas-examples/3.0/json/readme.json'), 'utf8'),
      'uspto.json': await fs.readFile(require.resolve('@readme/oas-examples/3.0/json/uspto.json'), 'utf8'),
    },
    [findCacheDir({ name: pkg.name })]: {},
  });

  const petstore = join(examplesDir, 'petstore.json');
  await new Cache(petstore).saveFile();
  petstoreSdk = api(petstore);

  const readme = join(examplesDir, 'readme.json');
  await new Cache(readme).saveFile();
  readmeSdk = api(readme);
});

afterEach(() => {
  fsMock.restore();
});

describe('#preloading', () => {
  const uspto = join(examplesDir, 'uspto.json');

  it('should proxy an sdk for the first time', async () => {
    const mock = nock('https://developer.uspto.gov/ds-api').get('/').reply(200);
    const mock2 = nock('https://developer.uspto.gov/ds-api').get('/two').reply(200);

    // Asserting that we have not previously loaded this API.
    expect(new Cache(uspto).isCached()).toBe(false);

    const sdk = api(uspto);

    // SDK should still not be loaded since we haven't officially called it yet.
    expect(new Cache(uspto).isCached()).toBe(false);
    expect(Object.keys(sdk)).toStrictEqual(['auth']);

    await sdk.get('/').then(() => {
      mock.done();
    });

    // Now that we've called something on the SDK, it should now be fully loaded.
    expect(new Cache(uspto).isCached()).toBe(true);
    expect(Object.keys(sdk)).toStrictEqual([
      'auth',
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
    await sdk.get('/two').then(() => {
      mock2.done();
    });
  });

  it('should support supplying a raw JSON OAS object', () => {
    const sdk = api(createOas());
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
    it('should work for operationId', () => {
      const mock = nock(petstoreServerUrl).get('/pets').reply(200);

      expect(async () => {
        await petstoreSdk.findPets();
        mock.done();
      }).not.toThrow();
    });

    it('should work with operationIds that have contain spaces', () => {
      expect(typeof petstoreSdk['find pet by id']).toBe('function');
    });

    it('should work for other methods', () => {
      const mock = nock(petstoreServerUrl).post('/pets').reply(200, {});

      expect(async () => {
        await petstoreSdk.addPet();
        mock.done();
      }).not.toThrow();
    });

    it.todo('should allow operationId to be the same as a http method');

    it('should error if an operationId does not exist', () => {
      return expect(petstoreSdk.findPetz()).rejects.toThrow(/does not appear to be a valid operation/);
    });
  });

  describe('#method(path)', () => {
    it('should work for method and path', () => {
      const mock = nock(petstoreServerUrl).get('/pets').reply(200);

      expect(async () => {
        await petstoreSdk.get('/pets');
        mock.done();
      }).not.toThrow();
    });

    it('should error if method does not exist', () => {
      return expect(petstoreSdk.fetch('/pets')).rejects.toThrow(/does not appear to be a valid operation/);
    });
  });
});

describe('#fetch', () => {
  const petId = 123;

  it('should contain a custom user agent for the library in requests', () => {
    expect.assertions(2);

    const userAgent = `${pkg.name}/${pkg.version}`;
    const mock = nock(petstoreServerUrl, {
      reqheaders: {
        'User-Agent': userAgent,
      },
    })
      .delete(`/pets/${petId}`)
      .reply(200, function () {
        expect(this.req.headers['user-agent']).toStrictEqual([userAgent]);
      });

    return petstoreSdk.deletePet({ id: petId }).then(res => {
      expect(res.status).toBe(200);
      mock.done();
    });
  });

  describe('operationId', () => {
    it('should pass through parameters for operationId', () => {
      const response = {
        id: petId,
        name: 'Buster',
      };

      const mock = nock(petstoreServerUrl).delete(`/pets/${petId}`).reply(200, response);

      return petstoreSdk
        .deletePet({ id: petId })
        .then(res => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then(res => {
          expect(res).toStrictEqual(response);
          mock.done();
        });
    });

    it('should pass through body for operationId', () => {
      const body = { name: 'Buster' };
      const mock = nock(petstoreServerUrl).post('/pets', body).reply(200);

      return petstoreSdk.addPet(body).then(res => {
        expect(res.status).toBe(200);
        mock.done();
      });
    });

    it('should pass through parameters and body for operationId', () => {
      const slug = 'new-release';
      const body = {
        title: 'revised title',
        body: 'updated body',
      };

      const mock = nock('https://dash.readme.io/api/v1').put(`/changelogs/${slug}`, body).reply(200);

      return readmeSdk.updateChangelog(body, { slug }).then(res => {
        expect(res.status).toBe(200);
        mock.done();
      });
    });
  });

  describe('method + path', () => {
    it('should pass through body for method + path', () => {
      const body = { name: 'Buster' };

      const mock = nock(petstoreServerUrl)
        .post('/pets', body)
        .reply(200, (uri, requestBody) => {
          return {
            id: 100,
            name: requestBody.name,
          };
        });

      return petstoreSdk
        .post('/pets', body)
        .then(res => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then(res => {
          expect(res).toStrictEqual({ id: 100, name: body.name });
          mock.done();
        });
    });

    it('should pass through parameters for method + path', () => {
      const slug = 'new-release';
      const mock = nock('https://dash.readme.io/api/v1').put(`/changelogs/${slug}`).reply(200);
      return readmeSdk.put('/changelogs/{slug}', { slug }).then(res => {
        expect(res.status).toBe(200);
        expect(res.url).toBe(`https://dash.readme.io/api/v1/changelogs/${slug}`);
        mock.done();
      });
    });

    it('should pass through parameters and body for method + path', () => {
      const slug = 'new-release';
      const body = {
        title: 'revised title',
        body: 'updated body',
      };

      const mock = nock('https://dash.readme.io/api/v1')
        .put(`/changelogs/${slug}`, body)
        .reply(200, (uri, requestBody) => {
          return {
            ...requestBody,
            slug,
          };
        });

      return readmeSdk
        .put('/changelogs/{slug}', body, { slug })
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.url).toBe(`https://dash.readme.io/api/v1/changelogs/${slug}`);
          return res.json();
        })
        .then(res => {
          expect(res).toStrictEqual({ ...body, slug });
          mock.done();
        });
    });
  });
});
