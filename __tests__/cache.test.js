const nock = require('nock');
const fsMock = require('mock-fs');
const findCacheDir = require('find-cache-dir');
const { join } = require('path');
const fs = require('fs').promises;

const Cache = require('../src/cache');
const pkg = require('../package.json');

let readmeExampleJson;
let readmeExampleYaml;
const originalLog = console.log;
const examplesDir = join(__dirname, 'examples');

beforeEach(async () => {
  readmeExampleJson = await fs.readFile(
    join(__dirname, '../node_modules/@readme/oas-examples/3.0/json/readme.json'),
    'utf8'
  );

  readmeExampleYaml = await fs.readFile(
    join(__dirname, '../node_modules/@readme/oas-examples/3.0/yaml/readme.yaml'),
    'utf8'
  );

  console.log = jest.fn().mockImplementation(() => {});

  fsMock({
    [examplesDir]: {
      'invalid-openapi.json': JSON.stringify(pkg),
      'readme.json': readmeExampleJson,
      'readme.yaml': readmeExampleYaml,
      'swagger.json': await fs.readFile(
        join(__dirname, '../node_modules/@readme/oas-examples/2.0/json/petstore.json'),
        'utf8'
      ),
    },
    [findCacheDir({ name: pkg.name })]: {},
  });
});

afterEach(() => {
  console.log = originalLog;
  fsMock.restore();
});

describe('#saveUrl()', () => {
  it('should be able to save a definition', () => {
    const mock = nock('http://example.com').get('/readme.json').reply(200, readmeExampleJson);

    return new Cache('http://example.com/readme.json').saveUrl().then(() => {
      expect(console.log).toHaveBeenNthCalledWith(1, expect.stringMatching(/dereferencing so it can/i));
      expect(console.log).toHaveBeenNthCalledWith(2, expect.stringMatching(/installation complete/i));
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

    await cacheStore.saveUrl().then(() => {
      expect(console.log).toHaveBeenNthCalledWith(1, expect.stringMatching(/converting yaml to json/i));
      expect(console.log).toHaveBeenNthCalledWith(2, expect.stringMatching(/dereferencing so it can/i));
      expect(console.log).toHaveBeenNthCalledWith(3, expect.stringMatching(/installation complete/i));
      mock.done();
    });

    const cached = cacheStore.getCache();
    expect(cached).toHaveProperty(hash);
    expect(cached[hash].path).toMatch(/\.json$/);
  });
});

describe('#saveFile()', () => {
  it('should be able to save a definition', () => {
    return new Cache(join(examplesDir, 'readme.json')).saveFile().then(() => {
      expect(console.log).toHaveBeenNthCalledWith(1, expect.stringMatching(/dereferencing so it can/i));
      expect(console.log).toHaveBeenNthCalledWith(2, expect.stringMatching(/installation complete/i));
    });
  });

  it('should convert yaml to json', async () => {
    const file = join(examplesDir, 'readme.yaml');
    const cacheStore = new Cache(file);
    const hash = Cache.getCacheHash(file);

    await cacheStore.saveFile().then(() => {
      expect(console.log).toHaveBeenNthCalledWith(1, expect.stringMatching(/converting yaml to json/i));
      expect(console.log).toHaveBeenNthCalledWith(2, expect.stringMatching(/dereferencing so it can/i));
      expect(console.log).toHaveBeenNthCalledWith(3, expect.stringMatching(/installation complete/i));
    });

    const cached = cacheStore.getCache();
    expect(cached).toHaveProperty(hash);
    expect(cached[hash].path).toMatch(/\.json$/);
  });
});

describe('#save()', () => {
  it('should error if definition is a swagger file', async () => {
    await expect(() => new Cache(join(examplesDir, 'swagger.json')).saveFile()).rejects.toThrow(
      'Sorry, this module only supports OpenAPI documents.'
    );
  });

  it('should error if definition is not a valid openapi file', async () => {
    await expect(() => new Cache(join(examplesDir, 'invalid-openapi.json')).saveFile()).rejects.toThrow(
      "Sorry, it doesn't look like that is a valid OpenAPI document"
    );
  });

  it('should cache a new file', async () => {
    const file = join(examplesDir, 'readme.json');
    const cacheStore = new Cache(file);
    const hash = Cache.getCacheHash(file);

    expect(cacheStore.getCache()).not.toHaveProperty(hash);

    await cacheStore.saveFile();

    expect(cacheStore.getCache()).toHaveProperty(hash);
  });
});

describe('#load', () => {
  let cacheStore;

  beforeEach(() => {
    const file = join(examplesDir, 'readme.json');
    cacheStore = new Cache(file);
  });

  it('should return an object if the current uri is an object (used for unit testing)', async () => {
    const obj = JSON.parse(readmeExampleJson);
    const loaded = new Cache(obj).load();

    expect(loaded).toStrictEqual(obj);
  });

  it('should load a file out of cache', async () => {
    await cacheStore.saveFile();

    const loaded = cacheStore.load();
    expect(loaded).toHaveProperty('components');
    expect(loaded).toHaveProperty('info');
    expect(loaded).toHaveProperty('paths');
    expect(loaded).toHaveProperty('servers');
  });

  it('should error if the file is not cached', () => {
    expect(() => {
      return cacheStore.load();
    }).toThrow(/to install this SDK's OpenAPI document/);
  });
});
