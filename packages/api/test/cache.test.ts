import type { OASDocument } from 'oas/dist/rmoas.types';

import fs from 'fs/promises';
import path from 'path';

import chai, { assert, expect } from 'chai';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';

import Cache from '../src/cache';

import chaiPlugins from './helpers/chai-plugins';
import loadSpec from './helpers/load-spec';

chai.use(chaiPlugins);

let petstoreSpec;
let readmeSpec;

describe('cache', function () {
  before(async function () {
    petstoreSpec = await loadSpec('@readme/oas-examples/3.0/json/petstore.json');
    readmeSpec = await loadSpec('@readme/oas-examples/3.0/json/readme.json');

    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  describe('#load', function () {
    describe('raw object', function () {
      it('should return a raw object if a JSON object was initially supplied', async function () {
        const res = await new Cache(readmeSpec as unknown as OASDocument).load();
        expect(res).to.deep.equal(readmeSpec);
      });

      it('should return a raw object if supplied, but still validate and dereference it', async function () {
        const res = await new Cache(petstoreSpec as unknown as OASDocument).load();
        expect(Object.keys((res.paths['/pet'].post as any).requestBody.content)).to.deep.equal([
          'application/json',
          'application/xml',
        ]);
      });
    });

    describe('ReadMe registry UUID', function () {
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

      it('should be able to load a definition', async function () {
        fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplxn', readmeSpec);

        const cacheStore = new Cache('@readme/v1.0#n6kvf10vakpemvplxn');

        expect(cacheStore.isCached()).to.be.false;

        expect(await cacheStore.load()).to.have.deep.property('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '2.0.0',
          title: 'API Endpoints',
          contact: {
            email: 'support@readme.io',
            name: 'API Support',
            url: 'https://docs.readme.com/docs/contact-support',
          },
        });

        expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(cacheStore.isCached()).to.be.true;
        fetchMock.restore();
      });
    });

    describe('URL', function () {
      it('should be able to load a definition', async function () {
        fetchMock.get('http://example.com/readme.json', readmeSpec);
        const cacheStore = new Cache('http://example.com/readme.json');

        expect(cacheStore.isCached()).to.be.false;

        expect(await cacheStore.load()).to.have.deep.property('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '2.0.0',
          title: 'API Endpoints',
          contact: {
            email: 'support@readme.io',
            name: 'API Support',
            url: 'https://docs.readme.com/docs/contact-support',
          },
        });

        expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(cacheStore.isCached()).to.be.true;
        fetchMock.restore();
      });

      it('should error if the url cannot be reached', async function () {
        fetchMock.get('https://example.com/unknown.json', { status: 404 });

        await new Cache('https://example.com/unknown.json')
          .load()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.equal(
              'Unable to retrieve URL (https://example.com/unknown.json). Reason: Not Found'
            );
          });

        fetchMock.restore();
      });

      it('should convert yaml to json', async function () {
        const spec = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');
        fetchMock.get('https://example.com/readme.yaml', spec);

        const definition = 'https://example.com/readme.yaml';
        const cacheStore = new Cache(definition);
        const hash = Cache.getCacheHash(definition);

        expect(cacheStore.isCached()).to.be.false;

        await cacheStore.load();
        expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(cacheStore.isCached()).to.be.true;
        fetchMock.restore();

        const cached = cacheStore.getCache();
        expect(cached).to.have.property(hash);
      });
    });

    describe('file', function () {
      it('should be able to load a definition', async function () {
        const cacheStore = new Cache(require.resolve('@readme/oas-examples/3.0/json/readme.json'));

        expect(cacheStore.isCached()).to.be.false;

        await cacheStore.load();
        expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(cacheStore.isCached()).to.be.true;
      });

      it('should be able to handle a relative path', async function () {
        const cacheStore = new Cache('../api/test/__fixtures__/oas.json');

        expect(cacheStore.isCached()).to.be.false;

        await cacheStore.load();
        expect(cacheStore.isCached()).to.be.true;
      });

      it('should convert yaml to json', async function () {
        const file = require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml');
        const cacheStore = new Cache(file);
        const hash = Cache.getCacheHash(file);

        expect(cacheStore.isCached()).to.be.false;

        await cacheStore.load();
        expect(cacheStore.get().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(cacheStore.isCached()).to.be.true;

        const cached = cacheStore.getCache();
        expect(cached).to.have.property(hash);
      });
    });
  });

  describe('#save()', function () {
    it('should error if definition is a swagger file', async function () {
      await new Cache(require.resolve('@readme/oas-examples/2.0/json/petstore.json'))
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal('Sorry, this module only supports OpenAPI definitions.');
        });
    });

    it('should error if definition is not a valid openapi file', async function () {
      await new Cache(require.resolve('../package.json'))
        .load()
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

      await cacheStore.load();

      expect(cacheStore.isCached()).to.be.true;
    });

    it('should be able to cache a definition that contains a circular reference', async function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/circular');
      const cacheStore = new Cache(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.load();

      expect(cacheStore.isCached()).to.be.true;
    });

    it('should be able to load and cache an OpenAPI 3.1 definition', async function () {
      const file = require.resolve('@readme/oas-examples/3.1/json/petstore.json');
      const cacheStore = new Cache(file);

      expect(cacheStore.isCached()).to.be.false;

      await cacheStore.load();

      expect(cacheStore.isCached()).to.be.true;
    });
  });

  describe('#get', function () {
    it('should return an object if the current uri is an object (used for unit testing)', function () {
      const loaded = new Cache(readmeSpec as unknown as OASDocument).get();

      expect(loaded).to.deep.equal(readmeSpec);
    });

    it('should load a file out of cache', async function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/readme.json');
      const cacheStore = new Cache(file);
      await cacheStore.load();

      const loaded = cacheStore.get();
      expect(loaded).to.have.property('components');
      expect(loaded).to.have.property('info');
      expect(loaded).to.have.property('paths');
      expect(loaded).to.have.property('servers');
    });

    it('should support the legacy `path` property in the cache store', async function () {
      await Cache.reset();

      const file = require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml');
      const cacheStore = new Cache(file);
      await cacheStore.load();

      const cache = cacheStore.getCache();
      const cacheKey = Object.keys(cache)[0];
      cache[cacheKey].path = path.join(Cache.specsCache, `${cache[cacheKey].hash}.json`);

      delete cache[cacheKey].hash;

      expect(Object.keys(cache)).to.have.length(1);

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
