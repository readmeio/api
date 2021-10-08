const nock = require('nock');
const path = require('path');
const { vol } = require('memfs');

const realFs = jest.requireActual('fs').promises;

// eslint-disable-next-line global-require
jest.mock('fs', () => require('memfs').fs);

const Cache = require('../src/cache');
const pkg = require('../package.json');

let readmeExampleJson;
let readmeExampleYaml;
const examplesDir = path.join(__dirname, 'examples');

expect.extend({
  // Custom matcher so we can easily test that dereferencing of OpenAPI files is working as expected.
  toBeDereferenced(received) {
    const pass = !received.filter(obj => '$ref' in obj).length;
    if (pass) {
      return {
        message: () => `expected supplied array not to be dereferenced`,
        pass: true,
      };
    }

    return {
      message: () => `expected supplied array to be dereferenced`,
      pass: false,
    };
  },
});

beforeEach(async () => {
  readmeExampleJson = await realFs.readFile(require.resolve('@readme/oas-examples/3.0/json/readme.json'), 'utf8');
  readmeExampleYaml = await realFs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');

  vol.fromJSON({
    [`${[examplesDir]}/circular.json`]: await realFs.readFile(
      require.resolve('./__fixtures__/circular.oas.json'),
      'utf8'
    ),
    [`${[examplesDir]}/invalid-openapi.json`]: JSON.stringify(pkg),
    [`${[examplesDir]}/readme.json`]: readmeExampleJson,
    [`${[examplesDir]}/readme.yaml`]: readmeExampleYaml,
    [`${[examplesDir]}/swagger.json`]: await realFs.readFile(
      require.resolve('@readme/oas-examples/2.0/json/petstore.json'),
      'utf8'
    ),
    '../examples/readme.json': readmeExampleJson,
  });
});

afterEach(() => {
  vol.reset();
});

describe('#load', () => {
  it('should return a raw object if a JSON object was initially supplied', async () => {
    const obj = JSON.parse(readmeExampleJson);

    await new Cache(obj).load().then(res => {
      expect(res).toStrictEqual(obj);
    });
  });

  describe('shorthand accessors', () => {
    it('should resolve the shorthand `@petstore/v1.0#uuid` syntax to the ReadMe API', () => {
      return expect(new Cache('@petstore/v1.0#n6kvf10vakpemvplx').uri).toBe(
        'https://dash.readme.io/api/v1/api-registry/n6kvf10vakpemvplx'
      );
    });

    it('should resolve the shorthand `@petstore#uuid` syntax to the ReadMe API', () => {
      return expect(new Cache('@petstore#n6kvf10vakpemvplx').uri).toBe(
        'https://dash.readme.io/api/v1/api-registry/n6kvf10vakpemvplx'
      );
    });

    it("shouldn't try to resolve improperly formatted shorthand accessors to the ReadMe API", () => {
      return expect(new Cache('n6kvf10vakpemvplx').uri).toBe('n6kvf10vakpemvplx');
    });
  });

  it('should throw an error when a non-HTTP(S) url is supplied', () => {
    return expect(new Cache('htt://example.com/openapi.json').load()).rejects.toThrow(
      'Only HTTP(S) protocols are supported'
    );
  });

  it('should throw an error if neither a url or file are detected', () => {
    return expect(new Cache('/this/is/not/a/real/path.json').load()).rejects.toThrow(
      /supply a URL or a path on your filesystem/
    );
  });
});

describe('#saveUrl()', () => {
  it('should be able to save a definition', () => {
    const mock = nock('http://example.com').get('/readme.json').reply(200, readmeExampleJson);
    const cacheStore = new Cache('http://example.com/readme.json');

    expect(cacheStore.isCached()).toBe(false);

    return cacheStore.saveUrl().then(() => {
      expect(cacheStore.get().paths['/api-specification'].get.parameters).toBeDereferenced();
      expect(cacheStore.isCached()).toBe(true);
      mock.done();
    });
  });

  it('should error if the url cannot be reached', async () => {
    const mock = nock('http://example.com').get('/unknown.json').reply(404);

    await expect(() => new Cache('http://example.com/unknown.json').saveUrl()).rejects.toThrow(
      'Unable to retrieve URL. Reason: Not Found'
    );

    mock.done();
  });

  it('should convert yaml to json', async () => {
    const mock = nock('http://example.com').get('/readme.yaml').reply(200, readmeExampleYaml);

    const definition = 'http://example.com/readme.yaml';
    const cacheStore = new Cache(definition);
    const hash = Cache.getCacheHash(definition);

    expect(cacheStore.isCached()).toBe(false);

    await cacheStore.saveUrl().then(() => {
      expect(cacheStore.get().paths['/api-specification'].get.parameters).toBeDereferenced();
      expect(cacheStore.isCached()).toBe(true);
      mock.done();
    });

    const cached = cacheStore.getCache();
    expect(cached).toHaveProperty(hash);
    expect(cached[hash].path).toMatch(/\.json$/);
  });
});

describe('#saveFile()', () => {
  it('should be able to save a definition', () => {
    const cacheStore = new Cache(path.join(examplesDir, 'readme.json'));

    expect(cacheStore.isCached()).toBe(false);

    return cacheStore.saveFile().then(() => {
      expect(cacheStore.get().paths['/api-specification'].get.parameters).toBeDereferenced();
      expect(cacheStore.isCached()).toBe(true);
    });
  });

  it('should be able handle a relative path', () => {
    const cacheStore = new Cache('../examples/readme.json');

    expect(cacheStore.isCached()).toBe(false);

    return cacheStore.saveFile().then(() => {
      expect(cacheStore.get().paths['/api-specification'].get.parameters).toBeDereferenced();
      expect(cacheStore.isCached()).toBe(true);
    });
  });

  it('should convert yaml to json', async () => {
    const file = path.join(examplesDir, 'readme.yaml');
    const cacheStore = new Cache(file);
    const hash = Cache.getCacheHash(file);

    expect(cacheStore.isCached()).toBe(false);

    await cacheStore.saveFile().then(() => {
      expect(cacheStore.get().paths['/api-specification'].get.parameters).toBeDereferenced();
      expect(cacheStore.isCached()).toBe(true);
    });

    const cached = cacheStore.getCache();
    expect(cached).toHaveProperty(hash);
    expect(cached[hash].path).toMatch(/\.json$/);
  });
});

describe('#save()', () => {
  it('should error if definition is a swagger file', () => {
    return expect(new Cache(path.join(examplesDir, 'swagger.json')).saveFile()).rejects.toThrow(
      'Sorry, this module only supports OpenAPI definitions.'
    );
  });

  it('should error if definition is not a valid openapi file', () => {
    return expect(new Cache(path.join(examplesDir, 'invalid-openapi.json')).saveFile()).rejects.toThrow(
      "Sorry, that doesn't look like a valid OpenAPI definition."
    );
  });

  it('should cache a new file', async () => {
    const file = path.join(examplesDir, 'readme.json');
    const cacheStore = new Cache(file);

    expect(cacheStore.isCached()).toBe(false);

    await cacheStore.saveFile();

    expect(cacheStore.isCached()).toBe(true);
  });

  it('should be able to cache a definition that contains a circular reference', async () => {
    const file = path.join(examplesDir, 'circular.json');
    const cacheStore = new Cache(file);

    expect(cacheStore.isCached()).toBe(false);

    await cacheStore.saveFile();

    expect(cacheStore.isCached()).toBe(true);
  });
});

describe('#get', () => {
  let cacheStore;

  beforeEach(() => {
    const file = path.join(examplesDir, 'readme.json');
    cacheStore = new Cache(file);
  });

  it('should return an object if the current uri is an object (used for unit testing)', () => {
    const obj = JSON.parse(readmeExampleJson);
    const loaded = new Cache(obj).get();

    expect(loaded).toStrictEqual(obj);
  });

  it('should load a file out of cache', async () => {
    await cacheStore.saveFile();

    const loaded = cacheStore.get();
    expect(loaded).toHaveProperty('components');
    expect(loaded).toHaveProperty('info');
    expect(loaded).toHaveProperty('paths');
    expect(loaded).toHaveProperty('servers');
  });

  it('should error if the file is not cached', () => {
    expect(() => {
      return cacheStore.get();
    }).toThrow(/has not been cached yet/);
  });
});
