import type { OASDocument } from 'oas/rmoas.types';

import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';

import { loadSpec } from '@api/test-utils';
import Ajv from 'ajv';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeAll, beforeEach, afterEach, it, expect } from 'vitest';

import lockfileSchema from '../schema.json' assert { type: 'json' };
import { PACKAGE_VERSION } from '../src/packageInfo.js';
import Storage from '../src/storage.js';

let petstoreSimple;

describe('storage', () => {
  beforeAll(async () => {
    petstoreSimple = await loadSpec('@readme/oas-examples/3.0/json/petstore-simple.json');
  });

  beforeEach(() => {
    Storage.setStorageDir(uniqueTempDir());
  });

  afterEach(async () => {
    await Storage.reset().catch(() => {
      // We can do our best to try to clean up after ourselves here but if removing any of the
      // storage directories fails it's likely because the OS already cleaned them up, in which
      // case we shouldn't fail these tests.
    });

    fetchMock.restore();
  });

  describe('#setStorageDir', () => {
    it('should create and set a storage dir if one is neither supplied or already exists', async () => {
      Storage.dir = '';

      Storage.setStorageDir();

      expect(Storage.dir).toContain('/.api');
      expect(Storage.getAPIsDir()).toContain('/.api/api');

      await expect(fs.stat(Storage.dir)).resolves.toHaveProperty('uid');
      await expect(fs.stat(Storage.getAPIsDir())).resolves.toHaveProperty('uid');
    });
  });

  describe('#generateIntegrityHash', () => {
    it('should generate an integrity hash for an API definition', () => {
      expect(Storage.generateIntegrityHash(petstoreSimple as OASDocument)).toBe(
        'sha512-otRF5TLMeDczSJlrmWLNDHLfmXg+C98oa/I/X2WWycwngh+a6WsbnjTbfwKGRU5DFbagOn2qX2SRvtBGOBRVGg==',
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
      fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, 'petstore');

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
      fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

      // `ajv` has funky types in ESM environments. https://github.com/ajv-validator/ajv/issues/2047
      // eslint-disable-next-line new-cap
      const ajv = new Ajv.default();
      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, 'petstore');

      let valid = ajv.validate(lockfileSchema, Storage.getLockfile());
      expect(valid).toBe(true);

      // After loading the petstore into storage the lockfile should have also been updated and
      // still be valid.
      await storage.load();

      valid = ajv.validate(lockfileSchema, Storage.getLockfile());
      expect(valid).toBe(true);
    });
  });

  describe('#isInLockFile', () => {
    it('should be able to look up in the lockfile by a given source', async () => {
      fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, 'petstore');

      expect(Storage.isInLockFile({ source })).toBe(false);

      await storage.load();

      expect(Storage.isInLockFile({ source })).toStrictEqual({
        identifier: 'petstore',
        source,
        integrity: 'sha512-otRF5TLMeDczSJlrmWLNDHLfmXg+C98oa/I/X2WWycwngh+a6WsbnjTbfwKGRU5DFbagOn2qX2SRvtBGOBRVGg==',
        installerVersion: PACKAGE_VERSION,
      });
    });

    it('should be able to look up in the lockfile by a given identifier', async () => {
      fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

      const source = '@petstore/v1.0#n6kvf10vakpemvplx';
      const storage = new Storage(source, 'petstore');

      expect(Storage.isInLockFile({ identifier: 'petstore' })).toBe(false);

      await storage.load();

      expect(Storage.isInLockFile({ identifier: 'petstore' })).toStrictEqual({
        identifier: 'petstore',
        source,
        integrity: 'sha512-otRF5TLMeDczSJlrmWLNDHLfmXg+C98oa/I/X2WWycwngh+a6WsbnjTbfwKGRU5DFbagOn2qX2SRvtBGOBRVGg==',
        installerVersion: PACKAGE_VERSION,
      });
    });
  });

  describe('#load', () => {
    it('should throw an error when a non-HTTP(S) url is supplied', async () => {
      await new Storage('htt://example.com/openapi.json', 'invalid-url')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).toBe('fetch failed');
          expect(err.cause.message).toBe('unknown scheme');
        });
    });

    it('should throw an error if neither a url or file are detected', async () => {
      await expect(new Storage('/this/is/not/a/real/path.json', 'nonexistent-path').load()).rejects.toThrow(
        /supply a URL or a path on your filesystem/,
      );
    });

    describe('ReadMe registry UUID', () => {
      it('should resolve the shorthand `@petstore/v1.0#uuid` syntax to the ReadMe API', async () => {
        fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

        const storage = new Storage('@petstore/v1.0#n6kvf10vakpemvplx', 'petstore');

        expect(storage.isInLockfile()).toBe(false);

        await expect(storage.load()).resolves.toHaveProperty('info', {
          version: '1.0.0',
          title: 'Single Path',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });

        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          identifier: 'petstore',
          source: '@petstore/v1.0#n6kvf10vakpemvplx',
          integrity: 'sha512-otRF5TLMeDczSJlrmWLNDHLfmXg+C98oa/I/X2WWycwngh+a6WsbnjTbfwKGRU5DFbagOn2qX2SRvtBGOBRVGg==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it('should resolve the shorthand `@petstore#uuid` syntax to the ReadMe API', async () => {
        fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

        const storage = new Storage('@petstore#n6kvf10vakpemvplx', 'petstore');

        expect(storage.isInLockfile()).toBe(false);

        await expect(storage.load()).resolves.toHaveProperty('info', {
          version: '1.0.0',
          title: 'Single Path',
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
          identifier: 'petstore',
          source: '@petstore#n6kvf10vakpemvplx',
          integrity: 'sha512-otRF5TLMeDczSJlrmWLNDHLfmXg+C98oa/I/X2WWycwngh+a6WsbnjTbfwKGRU5DFbagOn2qX2SRvtBGOBRVGg==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it("shouldn't try to resolve improperly formatted shorthand accessors to the ReadMe API", async () => {
        const storage = new Storage('n6kvf10vakpemvplx', 'petstore');

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
        fetchMock.get('http://example.com/readme.json', petstoreSimple);

        const storage = new Storage('http://example.com/readme.json', 'petstore');

        expect(storage.isInLockfile()).toBe(false);

        await expect(storage.load()).resolves.toHaveProperty('info', {
          version: '1.0.0',
          title: 'Single Path',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });

        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          identifier: 'petstore',
          source: 'http://example.com/readme.json',
          integrity: 'sha512-otRF5TLMeDczSJlrmWLNDHLfmXg+C98oa/I/X2WWycwngh+a6WsbnjTbfwKGRU5DFbagOn2qX2SRvtBGOBRVGg==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it('should error if the url cannot be reached', async () => {
        fetchMock.get('http://example.com/unknown.json', { status: 404 });

        await expect(new Storage('http://example.com/unknown.json', '404ing-url').load()).rejects.toThrow(
          'Unable to retrieve URL (http://example.com/unknown.json). Reason: Not Found',
        );
      });

      it('should convert yaml to json', async () => {
        const spec = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');
        fetchMock.get('http://example.com/readme.yaml', spec);

        const storage = new Storage('http://example.com/readme.yaml', 'readme-yaml');

        expect(storage.isInLockfile()).toBe(false);

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).toBeDereferenced();
        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          identifier: 'readme-yaml',
          source: 'http://example.com/readme.yaml',
          integrity: 'sha512-rcaq4j4BzMyR9n3kLRTDLbOg37QdNywj2e3whoK/J/6PNlHrLATvysfJVHq+kMBf+gkukUwxayCwbN0wZj8ysg==',
          installerVersion: PACKAGE_VERSION,
        });
      });
    });

    describe('file', () => {
      it('should be able to load a definition', async () => {
        const file = require.resolve('@readme/oas-examples/3.0/json/readme.json');
        const storage = new Storage(file, 'readme');

        expect(storage.isInLockfile()).toBe(false);

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).toBeDereferenced();
        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          identifier: 'readme',
          source: file,
          integrity: 'sha512-rcaq4j4BzMyR9n3kLRTDLbOg37QdNywj2e3whoK/J/6PNlHrLATvysfJVHq+kMBf+gkukUwxayCwbN0wZj8ysg==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it('should be able to handle a relative path', async () => {
        const file = '../test-utils/definitions/simple.json';
        const storage = new Storage(file, 'relative-path');

        expect(storage.isInLockfile()).toBe(false);

        await storage.load();

        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getAPIDefinition().info).toStrictEqual({
          version: '1.0.0',
          title: 'Swagger Petstore',
        });

        expect(storage.getFromLockfile()).toStrictEqual({
          identifier: 'relative-path',
          source: file,
          integrity: 'sha512-Ey83iRY4tY7JCCUI03eqfNb8YsxKlBdLILXcLDBbxZ1a2X/YfTspCTA8mLp6aaG9gRSyNMhI1hmtSlduWZw8RA==',
          installerVersion: PACKAGE_VERSION,
        });
      });

      it('should convert yaml to json', async () => {
        const file = require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml');
        const storage = new Storage(file, 'readme-yaml');

        expect(storage.isInLockfile()).toBe(false);

        await storage.load();

        expect(storage.getAPIDefinition().paths['/api-specification'].get.parameters).toBeDereferenced();
        expect(storage.isInLockfile()).toBe(true);
        expect(storage.getFromLockfile()).toStrictEqual({
          identifier: 'readme-yaml',
          source: file,
          integrity: 'sha512-rcaq4j4BzMyR9n3kLRTDLbOg37QdNywj2e3whoK/J/6PNlHrLATvysfJVHq+kMBf+gkukUwxayCwbN0wZj8ysg==',
          installerVersion: PACKAGE_VERSION,
        });
      });
    });
  });

  describe('#save()', () => {
    it('should error if definition is a swagger file', async () => {
      await expect(
        new Storage(require.resolve('@readme/oas-examples/2.0/json/petstore.json'), 'petstore').load(),
      ).rejects.toThrow('Sorry, this module only supports OpenAPI definitions.');
    });

    it('should error if definition is not a valid openapi file', async () => {
      await expect(new Storage(require.resolve('../package.json'), 'invalid').load()).rejects.toThrow(
        "Sorry, that doesn't look like a valid OpenAPI definition.",
      );
    });

    it('should save a new SDK', async () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/petstore-simple.json');
      const storage = new Storage(file, 'petstore-simple');

      expect(storage.isInLockfile()).toBe(false);

      await storage.load();

      expect(storage.isInLockfile()).toBe(true);
      expect(storage.getFromLockfile()).toStrictEqual({
        identifier: 'petstore-simple',
        source: file,
        integrity: 'sha512-otRF5TLMeDczSJlrmWLNDHLfmXg+C98oa/I/X2WWycwngh+a6WsbnjTbfwKGRU5DFbagOn2qX2SRvtBGOBRVGg==',
        installerVersion: PACKAGE_VERSION,
      });
    });

    it('should be able to cache a definition that contains a circular reference', async () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/circular.json');
      const storage = new Storage(file, 'circular');

      expect(storage.isInLockfile()).toBe(false);

      await storage.load();

      expect(storage.isInLockfile()).toBe(true);
      expect(storage.getFromLockfile()).toStrictEqual({
        identifier: 'circular',
        source: file,
        integrity: 'sha512-bxLv3OTzVucsauZih1VCprHQ7/e0iB/yzeuWdp1E1iq8o3MOYFAig+aMUkTqD71BNf/1/6B7NTkyjJXfrXgumA==',
        installerVersion: PACKAGE_VERSION,
      });
    });

    it('should be able to load and cache an OpenAPI 3.1 definition', async () => {
      const file = require.resolve('@readme/oas-examples/3.1/json/petstore.json');
      const storage = new Storage(file, 'petstore');

      expect(storage.isInLockfile()).toBe(false);

      await storage.load();

      expect(storage.isInLockfile()).toBe(true);
      expect(storage.getFromLockfile()).toStrictEqual({
        identifier: 'petstore',
        source: file,
        integrity: 'sha512-P1xkfSiktRFJUZdN90JslLk8FOecNZFypZOnDqh/Xcgw69iiO17dHXwaV6ENqnYGwxd1t4hwXpaXq/4V5AY3NQ==',
        installerVersion: PACKAGE_VERSION,
      });
    });
  });

  describe('#saveSourceFiles()', () => {
    it('should save source files into the storage identifiers directory', async () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/petstore-simple.json');
      const storage = new Storage(file, 'petstore-simple');

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
      const file = require.resolve('@readme/oas-examples/3.0/json/readme.json');
      const storage = new Storage(file, 'readme');
      await storage.load();

      const spec = storage.getAPIDefinition();
      expect(spec).toHaveProperty('components');
      expect(spec).toHaveProperty('info');
      expect(spec).toHaveProperty('paths');
      expect(spec).toHaveProperty('servers');
    });

    it('should error if the file is not saved', () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/security.json');
      const storage = new Storage(file, 'security');

      expect(() => {
        return storage.getAPIDefinition();
      }).toThrow(`${file} has not been saved to storage yet and must do so before being retrieved.`);
    });
  });
});
