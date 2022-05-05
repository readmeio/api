import type { OASDocument } from 'oas/@types/rmoas.types';

import 'isomorphic-fetch';
import chai, { assert, expect } from 'chai';
import uniqueTempDir from 'unique-temp-dir';
import fetchMock from 'fetch-mock';
import chaiPlugins from '../helpers/chai-plugins';
import fs from 'fs/promises';
import Storage from '../../src/cli/storage';

import { PACKAGE_VERSION } from '../../src/packageInfo';

import readmeSpec from '@readme/oas-examples/3.0/json/readme.json';
import petstoreSimple from '@readme/oas-examples/3.0/json/petstore-simple.json';

chai.use(chaiPlugins);

describe('storage', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  this.beforeAll(function () {
    Storage.setStorageDir(uniqueTempDir());
  });

  describe('#generateIntegrityHash', function () {
    it('should generate an integrity hash for an API definition', function () {
      expect(Storage.generateIntegrityHash(petstoreSimple as OASDocument)).to.equal(
        'sha512-ld+djZk8uRWmzXC+JYla1PTBScg0NjP/8x9vOOKRW+DuJ3NNMRjrpfbY7T77Jgnc87dZZsU49robbQfYe3ukug=='
      );
    });
  });

  describe('#load', function () {
    afterEach(function () {
      Storage.reset();
      fetchMock.restore();
    });

    it('should throw an error when a non-HTTP(S) url is supplied', async function () {
      await new Storage('htt://example.com/openapi.json', 'invalid-url')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          // The native `fetch` implementation in Node 18 returns a different error, with the new
          // `Error.cause` data, so we should make sure that we're catching that case instead of
          // the `node-fetch` error message.
          const isNode18 = Number(process.versions.node.split('.')[0]) >= 18;
          if (isNode18) {
            expect(err.message).to.equal('fetch failed');
            expect(err.cause.message).to.equal('unknown scheme');
          } else {
            expect(err.message).to.equal('Only HTTP(S) protocols are supported');
          }
        });
    });

    it('should throw an error if neither a url or file are detected', async function () {
      await new Storage('/this/is/not/a/real/path.json', 'nonexistent-path')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.match(/supply a URL or a path on your filesystem/);
        });
    });

    describe('ReadMe registry UUID', function () {
      it('should resolve the shorthand `@petstore/v1.0#uuid` syntax to the ReadMe API', async function () {
        fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', readmeSpec);

        const storage = new Storage('@petstore/v1.0#n6kvf10vakpemvplx', 'petstore');

        expect(storage.isInLockfile()).to.be.false;

        expect(await storage.load()).to.have.deep.property('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '2.0.0',
          title: 'API Endpoints',
          contact: {
            email: 'support@readme.io',
            name: 'API Support',
            url: 'https://docs.readme.com/docs/contact-support',
          },
        });

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(storage.isInLockfile()).to.be.true;
        expect(storage.getFromLockfile()).to.deep.equal({
          identifier: 'petstore',
          source: '@petstore/v1.0#n6kvf10vakpemvplx',
          integrity: 'sha512-mRdPk5/kzFb4ru5NJlcedCmAzGvwzOOk29dg6La0FgltEjeUgEfkgfD4ZKXzFvctLNKLI8qVXB7tkZsISV+7ZQ==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it('should resolve the shorthand `@petstore#uuid` syntax to the ReadMe API', async function () {
        fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

        const storage = new Storage('@petstore#n6kvf10vakpemvplx', 'petstore');

        expect(storage.isInLockfile()).to.be.false;

        expect(await storage.load()).to.have.deep.property('info', {
          version: '1.0.0',
          title: 'Single Path',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });

        expect(storage.getAPIDefinition().paths['/pet/:id'].get).to.deep.equal({
          tags: ['pet'],
          summary: 'Find a pet',
          description: 'This operation will find a pet in the database.',
          responses: {
            400: {
              description: 'Invalid status value',
            },
          },
          security: [],
        });

        expect(storage.isInLockfile()).to.be.true;
        expect(storage.getFromLockfile()).to.deep.equal({
          identifier: 'petstore',
          source: '@petstore#n6kvf10vakpemvplx',
          integrity: 'sha512-ld+djZk8uRWmzXC+JYla1PTBScg0NjP/8x9vOOKRW+DuJ3NNMRjrpfbY7T77Jgnc87dZZsU49robbQfYe3ukug==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it("shouldn't try to resolve improperly formatted shorthand accessors to the ReadMe API", async function () {
        const storage = new Storage('n6kvf10vakpemvplx', 'petstore');

        expect(storage.isInLockfile()).to.be.false;

        await storage
          .load()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.contain('n6kvf10vakpemvplx');
            expect(err.message).to.match(
              /Sorry, we were unable to load an API definition from (.*). Please either supply a URL or a path on your filesystem/
            );
          });
      });
    });

    describe('URL', function () {
      it('should be able to load a definition', async function () {
        fetchMock.get('http://example.com/readme.json', readmeSpec);

        const storage = new Storage('http://example.com/readme.json', 'petstore');

        expect(storage.isInLockfile()).to.be.false;

        expect(await storage.load()).to.have.deep.property('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '2.0.0',
          title: 'API Endpoints',
          contact: {
            email: 'support@readme.io',
            name: 'API Support',
            url: 'https://docs.readme.com/docs/contact-support',
          },
        });

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(storage.isInLockfile()).to.be.true;
        expect(storage.getFromLockfile()).to.deep.equal({
          identifier: 'petstore',
          source: 'http://example.com/readme.json',
          integrity: 'sha512-mRdPk5/kzFb4ru5NJlcedCmAzGvwzOOk29dg6La0FgltEjeUgEfkgfD4ZKXzFvctLNKLI8qVXB7tkZsISV+7ZQ==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it('should error if the url cannot be reached', async function () {
        fetchMock.get('http://example.com/unknown.json', { status: 404 });

        await new Storage('http://example.com/unknown.json', '404ing-url')
          .load()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.equal('Unable to retrieve URL (http://example.com/unknown.json). Reason: Not Found');
          });
      });

      it('should convert yaml to json', async function () {
        const spec = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');
        fetchMock.get('http://example.com/readme.yaml', spec);

        const storage = new Storage('http://example.com/readme.yaml', 'readme-yaml');

        expect(storage.isInLockfile()).to.be.false;

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(storage.isInLockfile()).to.be.true;
        expect(storage.getFromLockfile()).to.deep.equal({
          identifier: 'readme-yaml',
          source: 'http://example.com/readme.yaml',
          integrity: 'sha512-mRdPk5/kzFb4ru5NJlcedCmAzGvwzOOk29dg6La0FgltEjeUgEfkgfD4ZKXzFvctLNKLI8qVXB7tkZsISV+7ZQ==',
          installerVersion: PACKAGE_VERSION,
        });
      });
    });

    describe('file', function () {
      it('should be able to load a definition', async function () {
        const file = require.resolve('@readme/oas-examples/3.0/json/readme.json');
        const storage = new Storage(file, 'readme');

        expect(storage.isInLockfile()).to.be.false;

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(storage.isInLockfile()).to.be.true;
        expect(storage.getFromLockfile()).to.deep.equal({
          identifier: 'readme',
          source: file,
          integrity: 'sha512-mRdPk5/kzFb4ru5NJlcedCmAzGvwzOOk29dg6La0FgltEjeUgEfkgfD4ZKXzFvctLNKLI8qVXB7tkZsISV+7ZQ==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it('should be able to handle a relative path', async function () {
        const file = '../api/test/__fixtures__/oas.json';
        const storage = new Storage(file, 'relative-path');

        expect(storage.isInLockfile()).to.be.false;

        await storage.load();

        expect(storage.isInLockfile()).to.be.true;
        expect(storage.getAPIDefinition().info).to.deep.equal({
          version: '1.0.0',
          title: 'Single Path',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });

        expect(storage.getFromLockfile()).to.deep.equal({
          identifier: 'relative-path',
          source: file,
          integrity: 'sha512-Qi5BB9mfzkRqHe0rMvjRmKunNJ21zILF0e4KzYKi2hMw+zLfi2idmmn0lAngdRwqYdGIKTXUWhJNn0i3iDqUUg==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it('should convert yaml to json', async function () {
        const file = require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml');
        const storage = new Storage(file, 'readme-yaml');

        expect(storage.isInLockfile()).to.be.false;

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).to.be.dereferenced;
        expect(storage.isInLockfile()).to.be.true;
        expect(storage.getFromLockfile()).to.deep.equal({
          identifier: 'readme-yaml',
          source: file,
          integrity: 'sha512-mRdPk5/kzFb4ru5NJlcedCmAzGvwzOOk29dg6La0FgltEjeUgEfkgfD4ZKXzFvctLNKLI8qVXB7tkZsISV+7ZQ==',
          installerVersion: PACKAGE_VERSION,
        });
      });
    });
  });

  describe('#save()', function () {
    it('should error if definition is a swagger file', async function () {
      await new Storage(require.resolve('@readme/oas-examples/2.0/json/petstore.json'), 'petstore')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal('Sorry, this module only supports OpenAPI definitions.');
        });
    });

    it('should error if definition is not a valid openapi file', async function () {
      await new Storage(require.resolve('../../package.json'), 'invalid')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal("Sorry, that doesn't look like a valid OpenAPI definition.");
        });
    });

    it('should save a new SDK', async function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/petstore-simple.json');
      const storage = new Storage(file, 'petstore-simple');

      expect(storage.isInLockfile()).to.be.false;

      await storage.load();

      expect(storage.isInLockfile()).to.be.true;
      expect(storage.getFromLockfile()).to.deep.equal({
        identifier: 'petstore-simple',
        source: file,
        integrity: 'sha512-ld+djZk8uRWmzXC+JYla1PTBScg0NjP/8x9vOOKRW+DuJ3NNMRjrpfbY7T77Jgnc87dZZsU49robbQfYe3ukug==',
        installerVersion: PACKAGE_VERSION,
      });
    });

    it('should be able to cache a definition that contains a circular reference', async function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/circular.json');
      const storage = new Storage(file, 'circular');

      expect(storage.isInLockfile()).to.be.false;

      await storage.load();

      expect(storage.isInLockfile()).to.be.true;
      expect(storage.getFromLockfile()).to.deep.equal({
        identifier: 'circular',
        source: file,
        integrity: 'sha512-bxLv3OTzVucsauZih1VCprHQ7/e0iB/yzeuWdp1E1iq8o3MOYFAig+aMUkTqD71BNf/1/6B7NTkyjJXfrXgumA==',
        installerVersion: PACKAGE_VERSION,
      });
    });

    it('should be able to load and cache an OpenAPI 3.1 definition', async function () {
      const file = require.resolve('@readme/oas-examples/3.1/json/petstore.json');
      const storage = new Storage(file, 'petstore');

      expect(storage.isInLockfile()).to.be.false;

      await storage.load();

      expect(storage.isInLockfile()).to.be.true;
      expect(storage.getFromLockfile()).to.deep.equal({
        identifier: 'petstore',
        source: file,
        integrity: 'sha512-P1xkfSiktRFJUZdN90JslLk8FOecNZFypZOnDqh/Xcgw69iiO17dHXwaV6ENqnYGwxd1t4hwXpaXq/4V5AY3NQ==',
        installerVersion: PACKAGE_VERSION,
      });
    });
  });

  describe('#getAPIDefinition', function () {
    it('should load a API definition out of storage', async function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/readme.json');
      const storage = new Storage(file, 'readme');
      await storage.load();

      const spec = storage.getAPIDefinition();
      expect(spec).to.have.property('components');
      expect(spec).to.have.property('info');
      expect(spec).to.have.property('paths');
      expect(spec).to.have.property('servers');
    });

    it('should error if the file is not cached', function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/security.json');
      const storage = new Storage(file, 'security');

      expect(() => {
        return storage.getAPIDefinition();
      }).to.throw(`${file} has not been cached yet and must do so before being retrieved.`);
    });
  });
});