/* eslint-disable jest-formatting/padding-around-test-blocks */
const nock = require('nock');
const fsMock = require('mock-fs');
const findCacheDir = require('find-cache-dir');
const { join } = require('path');
const fs = require('fs').promises;

const Cache = require('../src/cache');
const pkg = require('../package.json');

let readmeExampleJson;
let readmeExampleYaml;
const examplesDir = join(__dirname, 'examples');

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
  readmeExampleJson = await fs.readFile(require.resolve('@readme/oas-examples/3.0/json/readme.json'), 'utf8');
  readmeExampleYaml = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');

  fsMock({
    [examplesDir]: {
      'invalid-openapi.json': JSON.stringify(pkg),
      'readme.json': readmeExampleJson,
      'readme.yaml': readmeExampleYaml,
      'swagger.json': await fs.readFile(require.resolve('@readme/oas-examples/2.0/json/petstore.json'), 'utf8'),
    },
    [findCacheDir({ name: pkg.name })]: {},
  });
});

afterEach(() => {
  fsMock.restore();
});

describe('#load', () => {
  it.todo('should be able to load a url');
  it.todo('should be able to load a file');
  it.todo('should throw an error if neither a url or file are detected');
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
    const cacheStore = new Cache(join(examplesDir, 'readme.json'));

    expect(cacheStore.isCached()).toBe(false);

    return cacheStore.saveFile().then(() => {
      expect(cacheStore.get().paths['/api-specification'].get.parameters).toBeDereferenced();
      expect(cacheStore.isCached()).toBe(true);
    });
  });

  it('should convert yaml to json', async () => {
    const file = join(examplesDir, 'readme.yaml');
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
    return expect(new Cache(join(examplesDir, 'swagger.json')).saveFile()).rejects.toThrow(
      'Sorry, this module only supports OpenAPI documents.'
    );
  });

  it('should error if definition is not a valid openapi file', () => {
    return expect(new Cache(join(examplesDir, 'invalid-openapi.json')).saveFile()).rejects.toThrow(
      "Sorry, it doesn't look like that is a valid OpenAPI document"
    );
  });

  it('should cache a new file', async () => {
    const file = join(examplesDir, 'readme.json');
    const cacheStore = new Cache(file);

    expect(cacheStore.isCached()).toBe(false);

    await cacheStore.saveFile();

    expect(cacheStore.isCached()).toBe(true);
  });
});

describe('#get', () => {
  let cacheStore;

  beforeEach(() => {
    const file = join(examplesDir, 'readme.json');
    cacheStore = new Cache(file);
  });

  it('should return an object if the current uri is an object (used for unit testing)', async () => {
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
