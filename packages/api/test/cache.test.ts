import chai, { assert, expect } from 'chai';
import uniqueTempDir from 'unique-temp-dir';
import nock from 'nock';
import chaiPlugins from './helpers/chai-plugins';
import fs from 'fs/promises';
import Cache from '../src/cache';

import readmeSpec from '@readme/oas-examples/3.0/json/readme.json';

chai.use(chaiPlugins);

describe('cache', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  this.beforeAll(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  describe('#load', function () {
    it('should return a raw object if a JSON object was initially supplied', async function () {
      const res = await new Cache(readmeSpec).load();
      expect(res).to.deep.equal(readmeSpec);
    });

    describe('shorthand accessors', function () {
      it('should resolve the shorthand `@petstore/v1.0#uuid` syntax to the ReadMe API', function () {
        expect(new Cache('@petstore/v1.0#n6kvf10vakpemvplx').uri).to.equal(
          'https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx'
        );
      });

      it('should resolve the shorthand `@petstore#uuid` syntax to the ReadMe API', function () {
        expect(new Cache('@petstore#n6kvf10vakpemvplx').uri).to.equal(
          'https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx'
        );
      });

      it("shouldn't try to resolve improperly formatted shorthand accessors to the ReadMe API", function () {
        expect(new Cache('n6kvf10vakpemvplx').uri).to.equal('n6kvf10vakpemvplx');
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
      const mock = nock('http://example.com').get('/readme.json').reply(200, readmeSpec);
      const cacheStore = new Cache('http://example.com/readme.json');

      expect(cacheStore.isCached()).to.be.false;

      expect(await cacheStore.saveUrl()).to.have.deep.property('info', {
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
          expect(err.message).to.equal('Unable to retrieve URL (http://example.com/unknown.json). Reason: Not Found');
        });

      mock.done();
    });

    it('should convert yaml to json', async function () {
      const spec = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');
      const mock = nock('http://example.com').get('/readme.yaml').reply(200, spec);

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

    it('should be able handle a relative path', async function () {
      const cacheStore = new Cache('../api/test/__fixtures__/oas.json');

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();
      expect(cacheStore.isCached()).to.be.true;
    });

    it('should convert yaml to json', async function () {
      const file = require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml');
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
      await new Cache(require.resolve('@readme/oas-examples/2.0/json/petstore.json'))
        .saveFile()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal('Sorry, this module only supports OpenAPI definitions.');
        });
    });

    it('should error if definition is not a valid openapi file', async function () {
      await new Cache(require.resolve('../package.json'))
        .saveFile()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal("Sorry, that doesn't look like a valid OpenAPI definition.");
        });
    });

    it('should cache a new file', async function () {
      await Cache.reset();

      const file = require.resolve('@readme/oas-examples/3.0/json/readme.json');
      const cacheStore = new Cache(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();

      expect(cacheStore.isCached()).to.be.true;
    });

    it('should be able to cache a definition that contains a circular reference', async function () {
      const file = require.resolve('./__fixtures__/circular.oas.json');
      const cacheStore = new Cache(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();

      expect(cacheStore.isCached()).to.be.true;
    });

    it('should be able to load and cache an OpenAPI 3.1 definition', async function () {
      const file = require.resolve('@readme/oas-examples/3.1/json/petstore.json');
      const cacheStore = new Cache(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.saveFile();

      expect(cacheStore.isCached()).to.be.true;
    });
  });

  describe('#get', function () {
    it('should return an object if the current uri is an object (used for unit testing)', function () {
      // const obj = JSON.parse(readmeExampleJson);
      const loaded = new Cache(readmeSpec).get();

      expect(loaded).to.deep.equal(readmeSpec);
    });

    it('should load a file out of cache', async function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/readme.json');
      const cacheStore = new Cache(file);
      await cacheStore.saveFile();

      const loaded = cacheStore.get();
      expect(loaded).to.have.property('components');
      expect(loaded).to.have.property('info');
      expect(loaded).to.have.property('paths');
      expect(loaded).to.have.property('servers');
    });

    it('should error if the file is not cached', function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/security.json');
      const cacheStore = new Cache(file);

      expect(() => {
        return cacheStore.get();
      }).to.throw(`${file} has not been cached yet and must do so before being retrieved.`);
    });
  });
});
