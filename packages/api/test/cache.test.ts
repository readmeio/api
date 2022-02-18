/* eslint-disable import/first */
import chai, { assert, expect } from 'chai';
// import mockRequire from 'mock-require';
import nock from 'nock';
import path from 'path';
// import { vol } from 'memfs';

import fs from 'fs/promises';
// import realFs from 'fs/promises';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// mockRequire('fs', require('memfs').fs); // This has to be loaded before `src/cache` for it to fully mock.

import Cache from '../src/cache';
import chaiPlugins from './helpers/chai-plugins';

import pkg from '../package.json';

let readmeExampleJson;
let readmeExampleYaml;
const examplesDir = path.join(__dirname, 'examples');

chai.use(chaiPlugins);

describe('cache', function () {
  beforeEach(async function () {
    readmeExampleJson = await fs.readFile(require.resolve('@readme/oas-examples/3.0/json/readme.json'), 'utf8');
    readmeExampleYaml = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');

    // vol.fromJSON({
    //   [`${[examplesDir]}/circular.json`]: await realFs.readFile(
    //     require.resolve('./__fixtures__/circular.oas.json'),
    //     'utf8'
    //   ),
    //   [`${[examplesDir]}/invalid-openapi.json`]: JSON.stringify(pkg),
    //   [`${[examplesDir]}/openapi_3.1.json`]: await realFs.readFile(
    //     require.resolve('@readme/oas-examples/3.1/json/petstore.json'),
    //     'utf8'
    //   ),
    //   [`${[examplesDir]}/readme.json`]: readmeExampleJson,
    //   [`${[examplesDir]}/readme.yaml`]: readmeExampleYaml,
    //   [`${[examplesDir]}/swagger.json`]: await realFs.readFile(
    //     require.resolve('@readme/oas-examples/2.0/json/petstore.json'),
    //     'utf8'
    //   ),
    //   '../examples/readme.json': readmeExampleJson,
    // });
  });

  afterEach(function (done) {
    Cache.wipe(err => {
      if (err) throw err;
      done();
    });
  });

  describe('#load', function () {
    it('should return a raw object if a JSON object was initially supplied', async function () {
      const obj = JSON.parse(readmeExampleJson);

      const res = await new Cache(obj).load();
      expect(res).to.deep.equal(obj);
    });

    describe('shorthand accessors', function () {
      it('should resolve the shorthand `@petstore/v1.0#uuid` syntax to the ReadMe API', function () {
        return expect(new Cache('@petstore/v1.0#n6kvf10vakpemvplx').uri).to.equal(
          'https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx'
        );
      });

      it('should resolve the shorthand `@petstore#uuid` syntax to the ReadMe API', function () {
        return expect(new Cache('@petstore#n6kvf10vakpemvplx').uri).to.equal(
          'https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx'
        );
      });

      it("shouldn't try to resolve improperly formatted shorthand accessors to the ReadMe API", function () {
        return expect(new Cache('n6kvf10vakpemvplx').uri).to.equal('n6kvf10vakpemvplx');
      });
    });

    it('should throw an error when a non-HTTP(S) url is supplied', async function () {
      await new Cache('htt://example.com/openapi.json')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal('Only HTTP(S) protocols are supported');
        });
    });

    it('should throw an error if neither a url or file are detected', async function () {
      await new Cache('/this/is/not/a/real/path.json')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.match(/supply a URL or a path on your filesystem/);
        });
    });
  });

  describe('#saveUrl()', function () {
    it('should be able to save a definition', async function () {
      const mock = nock('http://example.com').get('/readme.json').reply(200, readmeExampleJson);
      const cacheStore = new Cache('http://example.com/readme.json');

      expect(cacheStore.isCached()).to.be.false;

      expect(await cacheStore.saveUrl())
        .to.have.deep.property('info')
        .and.deep.equal({
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '2.0.0',
          title: 'API Endpoints',
        });

      expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
      expect(cacheStore.isCached()).to.be.true;
      mock.done();
    });

    it('should error if the url cannot be reached', async function () {
      const mock = nock('http://example.com').get('/unknown.json').reply(404);

      await new Cache('http://example.com/unknown.json')
        .saveUrl()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal('Unable to retrieve URL. Reason: Not Found');
        });

      mock.done();
    });

    it('should convert yaml to json', async function () {
      const mock = nock('http://example.com').get('/readme.yaml').reply(200, readmeExampleYaml);

      const definition = 'http://example.com/readme.yaml';
      const cacheStore = new Cache(definition);
      const hash = Cache.getCacheHash(definition);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveUrl();
      expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
      expect(cacheStore.isCached()).to.be.true;
      mock.done();

      const cached = cacheStore.getCache();
      expect(cached).to.have.property(hash);
      expect(cached[hash].path).to.match(/\.json$/);
    });
  });

  describe('#saveFile()', function () {
    it('should be able to save a definition', async function () {
      const cacheStore = new Cache(require.resolve('@readme/oas-examples/3.0/json/readme.json'));

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();
      expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
      expect(cacheStore.isCached()).to.be.true;
    });

    it.only('should be able handle a relative path', async function () {
      const cacheStore = new Cache('../api/test/__fixtures__/simple.json');

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();
      expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
      expect(cacheStore.isCached()).to.be.true;
    });

    it('should convert yaml to json', async function () {
      const file = path.join(examplesDir, 'readme.yaml');
      const cacheStore = new Cache(file);
      const hash = Cache.getCacheHash(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();
      expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
      expect(cacheStore.isCached()).to.be.true;

      const cached = cacheStore.getCache();
      expect(cached).to.have.property(hash);
      expect(cached[hash].path).to.match(/\.json$/);
    });
  });

  describe('#save()', function () {
    it('should error if definition is a swagger file', async function () {
      await new Cache(path.join(examplesDir, 'swagger.json'))
        .saveFile()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal('Sorry, this module only supports OpenAPI definitions.');
        });
    });

    it('should error if definition is not a valid openapi file', async function () {
      await new Cache(path.join(examplesDir, 'invalid-openapi.json'))
        .saveFile()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal("Sorry, that doesn't look like a valid OpenAPI definition.");
        });
    });

    it('should cache a new file', async function () {
      const file = path.join(examplesDir, 'readme.json');
      const cacheStore = new Cache(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();

      expect(cacheStore.isCached()).to.be.true;
    });

    it('should be able to cache a definition that contains a circular reference', async function () {
      const file = path.join(examplesDir, 'circular.json');
      const cacheStore = new Cache(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();

      expect(cacheStore.isCached()).to.be.true;
    });

    it('should be able to load and cache an OpenAPI 3.1 definition', async function () {
      const file = path.join(examplesDir, 'openapi_3.1.json');
      const cacheStore = new Cache(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();

      expect(cacheStore.isCached()).to.be.true;
    });
  });

  describe('#get', function () {
    let cacheStore;

    beforeEach(function () {
      const file = path.join(examplesDir, 'readme.json');
      cacheStore = new Cache(file);
    });

    it('should return an object if the current uri is an object (used for unit testing)', function () {
      const obj = JSON.parse(readmeExampleJson);
      const loaded = new Cache(obj).get();

      expect(loaded).to.deep.equal(obj);
    });

    it('should load a file out of cache', async function () {
      await cacheStore.saveFile();

      const loaded = cacheStore.get();
      expect(loaded).to.have.property('components');
      expect(loaded).to.have.property('info');
      expect(loaded).to.have.property('paths');
      expect(loaded).to.have.property('servers');
    });

    it('should error if the file is not cached', function () {
      expect(() => {
        return cacheStore.get();
      }).to.throw(/has not been cached yet/);
    });
  });
});
