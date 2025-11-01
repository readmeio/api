import type { OASDocument } from 'oas/types';

import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';

import petstore from '@readme/oas-examples/3.0/json/petstore-simple.json' with { type: 'json' };
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import nock from 'nock';
import uniqueTempDir from 'unique-temp-dir';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import lockfileSchema from '../schema.json' with { type: 'json' };
import { SupportedLanguages } from '../src/codegen/factory.js';
import { PACKAGE_VERSION } from '../src/packageInfo.js';
import Storage from '../src/storage.js';

describe('storage', () => {
  let petstoreSimple: OASDocument;
  let resetStorage: boolean;

  beforeAll(async () => {
    petstoreSimple = structuredClone(petstore) as OASDocument;
  });

  beforeEach(() => {
    resetStorage = true;
    Storage.setStorageDir(uniqueTempDir());
  });

  afterEach(async () => {
    if (resetStorage) {
      await Storage.reset().catch(() => {
        // We can do our best to try to clean up after ourselves here but if removing any of the
        // storage directories fails it's likely because the OS already cleaned them up, in which
        // case we shouldn't fail these tests.
      });
    }
  });

  describe('#setStorageDir', () => {
    /**
     * Because we're testing the case where we want to set a storage directory if we don't have
     * one this test has an annoying quirk where if there exists an `.api/` directory in
     * `packages/api` the `Storage.reset()` call after this test finishes will blow it away and
     * delete any generated SDK that was in there. Because the `fs.mkdirSync` calls that
     * `setStorageDir()` invoke don't throw errors if that directory already exists we can safely
     * just ignore those calls.
     */
    it('should create and set a storage dir if one is neither supplied or already exists', async () => {
      resetStorage = false;

      Storage.dir = '';

      Storage.setStorageDir();

      expect(Storage.dir).toContain('/.api');
      expect(Storage.getAPIsDir()).toContain('/.api/api');

      await expect(fs.stat(Storage.dir)).resolves.toHaveProperty('uid');
      await expect(fs.stat(Storage.getAPIsDir())).resolves.toHaveProperty('uid');
    });
  });

  describe('#getProjectDir', () => {
    it('should return the parent directory of the storage directory', () => {
      Storage.setStorageDir(uniqueTempDir());
      const projectDir = Storage.getProjectDir();
      expect(projectDir).toBe(path.dirname(Storage.dir));
    });

    it('should set and return default storage directory if none is set', () => {
      Storage.dir = '';
      const projectDir = Storage.getProjectDir();
      expect(Storage.dir).toBe(path.join(process.cwd(), '.api'));
      expect(projectDir).toBe(path.dirname(Storage.dir));
      expect(projectDir).toBe(process.cwd());
    });
  });

  describe('#generateIntegrityHash', () => {
    it('should generate an integrity hash for an API definition', () => {
      expect(Storage.generateIntegrityHash(petstoreSimple)).toBe(
        'sha512-RyezDd7FHtKDkFMZYMHstZ2ZkvBT4IojYcA/3WCw+ItFXLEO4RT/cY6qurqpqOLt6HF+zBEg7YygYzh2Aqf3rA==',
      );
    });
  });

  describe('#setIdentifier', () => {
    it('should be able to update the identifier', () => {
      const storage = new Storage('@petstore#n6kvf10vakpemvplx');

      expect(storage.identifier).toBeUndefined();

      storage.setIdentifier('petstore');

      expect(storage.identifier).toBe('petstore');
    });
  });

  describe('#isIdentifierValid', () => {
    it('should allow an identifier that is valid', () => {
      expect(Storage.isIdentifierValid('buster')).toBe(true);
      expect(Storage.isIdentifierValid('buster', true)).toBe(true);
    });

    it('should throw an error for when an identifier is already being used', async () => {
      nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, SupportedLanguages.JS, 'petstore');

      expect(Storage.isInLockFile({ source })).toBe(false);

      await storage.load();

      expect(() => {
        Storage.isIdentifierValid('petstore');
      }).toThrow('"petstore" is already taken in your `.api/` directory. Please try another identifier.');
    });

    it("should throw an error when an identifier can't be used on npm", () => {
      expect(() => {
        Storage.isIdentifierValid('.buster');
      }).toThrow('Identifier cannot be used for an NPM package: name cannot start with a period');

      expect(() => {
        // `true` here will try to check it as `@api/  buster`, `@api/.buster` is valid apparently!
        Storage.isIdentifierValid('  buster', true);
      }).toThrow('Identifier cannot be used for an NPM package: name can only contain URL-friendly characters');
    });
  });

  describe('#getLockfile', () => {
    it('should retrieve a lockfiles that match our schema', async () => {
      nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

      // `ajv` has funky types in ESM environments. https://github.com/ajv-validator/ajv/issues/2047
      const ajv = new Ajv.default();
      addFormats.default(ajv);

      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, SupportedLanguages.JS, 'petstore');

      let valid = ajv.validate(lockfileSchema, Storage.getLockfile());
      expect(ajv.errors).toBeNull();
      expect(valid).toBe(true);

      // After loading the petstore into storage the lockfile should have also been updated and
      // still be valid.
      await storage.load();

      valid = ajv.validate(lockfileSchema, Storage.getLockfile());
      expect(ajv.errors).toBeNull();
      expect(valid).toBe(true);
    });
  });

  describe('#getFromLockfile (static)', () => {
    it('should retrieve an entry in the lockfile if it exists', async () => {
      nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, SupportedLanguages.JS, 'petstore');

      await storage.load();

      expect(Storage.getFromLockfile('petstore')).toStrictEqual({
        private: true,
        identifier: 'petstore',
        source,
        integrity: 'sha512-RyezDd7FHtKDkFMZYMHstZ2ZkvBT4IojYcA/3WCw+ItFXLEO4RT/cY6qurqpqOLt6HF+zBEg7YygYzh2Aqf3rA==',
        installerVersion: PACKAGE_VERSION,
        language: 'js',
        createdAt: expect.any(String),
      });
    });
  });

  describe('#isInLockFile', () => {
    it('should be able to look up in the lockfile by a given source', async () => {
      nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, SupportedLanguages.JS, 'petstore');

      expect(Storage.isInLockFile({ source })).toBe(false);

      await storage.load();

      expect(Storage.isInLockFile({ source })).toStrictEqual({
        private: true,
        identifier: 'petstore',
        source,
        integrity: 'sha512-RyezDd7FHtKDkFMZYMHstZ2ZkvBT4IojYcA/3WCw+ItFXLEO4RT/cY6qurqpqOLt6HF+zBEg7YygYzh2Aqf3rA==',
        installerVersion: PACKAGE_VERSION,
        language: 'js',
        createdAt: expect.any(String),
      });
    });

    it('should be able to look up in the lockfile by a given identifier', async () => {
      nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, SupportedLanguages.JS, 'petstore');

      expect(Storage.isInLockFile({ identifier: 'petstore' })).toBe(false);

      await storage.load();

      expect(Storage.isInLockFile({ identifier: 'petstore' })).toStrictEqual({
        private: true,
        identifier: 'petstore',
        source,
        integrity: 'sha512-RyezDd7FHtKDkFMZYMHstZ2ZkvBT4IojYcA/3WCw+ItFXLEO4RT/cY6qurqpqOLt6HF+zBEg7YygYzh2Aqf3rA==',
        installerVersion: PACKAGE_VERSION,
        language: 'js',
        createdAt: expect.any(String),
      });
    });
  });

  describe('#load', () => {
    describe('and the URL is non-HTTP(s)', () => {
      beforeEach(() => {
        // If we don't enable outbound traffic for this test then the exception that will be thrown
        // will be from Nock not having a mocked request for this bad URL, not the `fetch`
        // exception we're testing against.
        nock.enableNetConnect();
      });

      afterEach(() => {
        nock.disableNetConnect();
      });

      it('should throw an error', async () => {
        await new Storage('htt://example.com/openapi.json', SupportedLanguages.JS, 'invalid-url')
          .load()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).toBe('fetch failed');
            expect(err.cause.message).toBe('unknown scheme');
          });
      });
    });

    it('should throw an error if neither a url or file are detected', async () => {
      await expect(
        new Storage('/this/is/not/a/real/path.json', SupportedLanguages.JS, 'nonexistent-path').load(),
      ).rejects.toThrow(/supply a URL or a path on your filesystem/);
    });

    describe('ReadMe registry UUID', () => {
      it('should resolve the shorthand `@petstore/v1.0#uuid` syntax to the ReadMe API', async () => {
        nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

        const storage = new Storage('@petstore/v1.0#n6kvf10vakpemvplx', SupportedLanguages.JS, 'petstore');

        expect(storage.isInLockfile()).toBe(false);

        await expect(storage.load()).resolves.toHaveProperty('info', {
          version: '1.0.0',
          title: 'Simple Petstore',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });

        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          private: true,
          identifier: 'petstore',
          source: '@petstore/v1.0#n6kvf10vakpemvplx',
          integrity: 'sha512-RyezDd7FHtKDkFMZYMHstZ2ZkvBT4IojYcA/3WCw+ItFXLEO4RT/cY6qurqpqOLt6HF+zBEg7YygYzh2Aqf3rA==',
          installerVersion: PACKAGE_VERSION,
          language: 'js',
          createdAt: expect.any(String),
        });
      });

      it('should resolve the shorthand `@petstore#uuid` syntax to the ReadMe API', async () => {
        nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

        const storage = new Storage('@petstore#n6kvf10vakpemvplx', SupportedLanguages.JS, 'petstore');

        expect(storage.isInLockfile()).toBe(false);

        await expect(storage.load()).resolves.toHaveProperty('info', {
          version: '1.0.0',
          title: 'Simple Petstore',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });

        expect(storage.getAPIDefinition().paths['/pet/{id}'].get).toStrictEqual({
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

        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          private: true,
          identifier: 'petstore',
          source: '@petstore#n6kvf10vakpemvplx',
          integrity: 'sha512-RyezDd7FHtKDkFMZYMHstZ2ZkvBT4IojYcA/3WCw+ItFXLEO4RT/cY6qurqpqOLt6HF+zBEg7YygYzh2Aqf3rA==',
          installerVersion: PACKAGE_VERSION,
          language: 'js',
          createdAt: expect.any(String),
        });
      });

      it("shouldn't try to resolve improperly formatted shorthand accessors to the ReadMe API", async () => {
        const storage = new Storage('n6kvf10vakpemvplx', SupportedLanguages.JS, 'petstore');

        expect(storage.isInLockfile()).toBe(false);

        await storage
          .load()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).toContain('n6kvf10vakpemvplx');
            expect(err.message).toMatch(
              /Sorry, we were unable to load an API definition from (.*). Please either supply a URL or a path on your filesystem/,
            );
          });
      });
    });

    describe('URL', () => {
      it('should be able to load a definition', async () => {
        nock('http://example.com').get('/readme.json').reply(200, petstoreSimple);

        const storage = new Storage('http://example.com/readme.json', SupportedLanguages.JS, 'petstore');

        expect(storage.isInLockfile()).toBe(false);

        await expect(storage.load()).resolves.toHaveProperty('info', {
          version: '1.0.0',
          title: 'Simple Petstore',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });

        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          private: true,
          identifier: 'petstore',
          source: 'http://example.com/readme.json',
          integrity: 'sha512-RyezDd7FHtKDkFMZYMHstZ2ZkvBT4IojYcA/3WCw+ItFXLEO4RT/cY6qurqpqOLt6HF+zBEg7YygYzh2Aqf3rA==',
          installerVersion: PACKAGE_VERSION,
          language: 'js',
          createdAt: expect.any(String),
        });
      });

      it('should error if the url cannot be reached', async () => {
        nock('http://example.com').get('/unknown.json').reply(404);

        await expect(
          new Storage('http://example.com/unknown.json', SupportedLanguages.JS, '404ing-url').load(),
        ).rejects.toThrow('Unable to retrieve URL (http://example.com/unknown.json). Reason: Not Found');
      });

      it('should convert yaml to json', async () => {
        const spec = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme-legacy.yaml'), 'utf8');
        nock('http://example.com').get('/readme.yaml').reply(200, spec);

        const storage = new Storage('http://example.com/readme.yaml', SupportedLanguages.JS, 'readme-yaml');

        expect(storage.isInLockfile()).toBe(false);

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).toBeDereferenced();
        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          private: true,
          identifier: 'readme-yaml',
          source: 'http://example.com/readme.yaml',
          integrity: 'sha512-T2BM48FOVNKyAaGQRt3usC//ZDB+dbcV++NC5P5H9+UPpVExVyMY2616KyoFfaerNlF08v4LemRZ+ZfExvZW6g==',
          installerVersion: PACKAGE_VERSION,
          language: 'js',
          createdAt: expect.any(String),
        });
      });
    });

    describe('file', () => {
      it('should be able to load a definition', async () => {
        const file = require.resolve('@readme/oas-examples/3.0/json/readme-legacy.json');
        const storage = new Storage(file, SupportedLanguages.JS, 'readme');

        expect(storage.isInLockfile()).toBe(false);

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).toBeDereferenced();
        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          private: true,
          identifier: 'readme',
          source: file,
          integrity: 'sha512-T2BM48FOVNKyAaGQRt3usC//ZDB+dbcV++NC5P5H9+UPpVExVyMY2616KyoFfaerNlF08v4LemRZ+ZfExvZW6g==',
          installerVersion: PACKAGE_VERSION,
          language: 'js',
          createdAt: expect.any(String),
        });
      });

      it('should be able to handle a relative path', async () => {
        const file = `${__dirname}/../../test-utils/definitions/simple.json`;
        const storage = new Storage(file, SupportedLanguages.JS, 'relative-path');

        expect(storage.isInLockfile()).toBe(false);

        await storage.load();

        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getAPIDefinition().info).toStrictEqual({
          version: '1.0.0',
          title: 'Swagger Petstore',
          contact: {
            email: 'support@example.com',
            name: 'API Support',
          },
        });

        expect(storage.getFromLockfile()).toStrictEqual({
          private: true,
          identifier: 'relative-path',
          source: file,
          integrity: 'sha512-1ujT5h3aKSIscrFSJaOHkLBCRrMCXIOLRrhwOt6PnVmzTvT63SAGqc/K7SE4hOxWNBgoHaYjD0YMC4RRUBKWUw==',
          installerVersion: PACKAGE_VERSION,
          language: 'js',
          createdAt: expect.any(String),
        });
      });

      it('should convert yaml to json', async () => {
        const file = require.resolve('@readme/oas-examples/3.0/yaml/readme-legacy.yaml');
        const storage = new Storage(file, SupportedLanguages.JS, 'readme-yaml');

        expect(storage.isInLockfile()).toBe(false);

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).toBeDereferenced();
        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          private: true,
          identifier: 'readme-yaml',
          source: file,
          integrity: 'sha512-T2BM48FOVNKyAaGQRt3usC//ZDB+dbcV++NC5P5H9+UPpVExVyMY2616KyoFfaerNlF08v4LemRZ+ZfExvZW6g==',
          installerVersion: PACKAGE_VERSION,
          language: 'js',
          createdAt: expect.any(String),
        });
      });
    });
  });

  describe('#remove', () => {
    it('should remove an SDK', async () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/petstore-simple.json');
      const storage = new Storage(file, SupportedLanguages.JS, 'petstore-simple');
      await storage.load();

      expect(storage.isInLockfile()).toBe(true);

      await storage.remove();

      expect(storage.isInLockfile()).toBe(false);
    });
  });

  describe('#save()', () => {
    it('should error if definition is a swagger file', async () => {
      await expect(
        new Storage(
          require.resolve('@readme/oas-examples/2.0/json/petstore.json'),
          SupportedLanguages.JS,
          'petstore',
        ).load(),
      ).rejects.toThrow('Sorry, this module only supports OpenAPI definitions.');
    });

    it('should error if definition is not a valid openapi file', async () => {
      await expect(
        new Storage(require.resolve('../package.json'), SupportedLanguages.JS, 'invalid').load(),
      ).rejects.toThrow("Sorry, that doesn't look like a valid OpenAPI definition.");
    });

    it('should save a new SDK', async () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/petstore-simple.json');
      const storage = new Storage(file, SupportedLanguages.JS, 'petstore-simple');

      expect(storage.isInLockfile()).toBe(false);

      await storage.load();

      expect(storage.isInLockfile()).toBe(true);
      expect(storage.getFromLockfile()).toStrictEqual({
        private: true,
        identifier: 'petstore-simple',
        source: file,
        integrity: 'sha512-RyezDd7FHtKDkFMZYMHstZ2ZkvBT4IojYcA/3WCw+ItFXLEO4RT/cY6qurqpqOLt6HF+zBEg7YygYzh2Aqf3rA==',
        installerVersion: PACKAGE_VERSION,
        language: 'js',
        createdAt: expect.any(String),
      });
    });

    it('should be able to cache a definition that contains a circular reference', async () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/circular.json');
      const storage = new Storage(file, SupportedLanguages.JS, 'circular');

      expect(storage.isInLockfile()).toBe(false);

      await storage.load();

      expect(storage.isInLockfile()).toBe(true);
      expect(storage.getFromLockfile()).toStrictEqual({
        private: true,
        identifier: 'circular',
        source: file,
        integrity: 'sha512-bxLv3OTzVucsauZih1VCprHQ7/e0iB/yzeuWdp1E1iq8o3MOYFAig+aMUkTqD71BNf/1/6B7NTkyjJXfrXgumA==',
        installerVersion: PACKAGE_VERSION,
        language: 'js',
        createdAt: expect.any(String),
      });
    });

    it('should be able to load and cache an OpenAPI 3.1 definition', async () => {
      const file = require.resolve('@readme/oas-examples/3.1/json/petstore.json');
      const storage = new Storage(file, SupportedLanguages.JS, 'petstore');

      expect(storage.isInLockfile()).toBe(false);

      await storage.load();

      expect(storage.isInLockfile()).toBe(true);
      expect(storage.getFromLockfile()).toStrictEqual({
        private: true,
        identifier: 'petstore',
        source: file,
        integrity: 'sha512-P1xkfSiktRFJUZdN90JslLk8FOecNZFypZOnDqh/Xcgw69iiO17dHXwaV6ENqnYGwxd1t4hwXpaXq/4V5AY3NQ==',
        installerVersion: PACKAGE_VERSION,
        language: 'js',
        createdAt: expect.any(String),
      });
    });
  });

  describe('#saveSourceFiles()', () => {
    it('should save source files into the storage identifiers directory', async () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/petstore-simple.json');
      const storage = new Storage(file, SupportedLanguages.JS, 'petstore-simple');

      expect(storage.isInLockfile()).toBe(false);

      await storage.load();

      const files = { 'index.js': '// I am a source file' };
      storage.saveSourceFiles(files);

      const sourceFile = await fs.readFile(path.join(storage.getIdentifierStorageDir(), 'index.js'), 'utf-8');
      expect(sourceFile).toBe('// I am a source file');
    });
  });

  describe('#getAPIDefinition', () => {
    it('should load a API definition out of storage', async () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/readme-legacy.json');
      const storage = new Storage(file, SupportedLanguages.JS, 'readme');
      await storage.load();

      const spec = storage.getAPIDefinition();
      expect(spec).toHaveProperty('components');
      expect(spec).toHaveProperty('info');
      expect(spec).toHaveProperty('paths');
      expect(spec).toHaveProperty('servers');
    });

    it('should error if the file is not saved', () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/security.json');
      const storage = new Storage(file, SupportedLanguages.JS, 'security');

      expect(() => {
        return storage.getAPIDefinition();
      }).toThrow(`${file} has not been saved to storage yet and must do so before being retrieved.`);
    });
  });
});
