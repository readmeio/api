import assert from 'assert';
import fs from 'fs/promises';

import loadSpec from '@api/test-utils/src/load-spec';
import fetchMock from 'fetch-mock';
import { describe, beforeAll, it, expect } from 'vitest';

import Fetcher from '../../src/cli/fetcher';

let readmeSpec;

describe('fetcher', () => {
  beforeAll(async () => {
    readmeSpec = await loadSpec('@readme/oas-examples/3.0/json/readme.json');
  });

  describe('#isAPIRegistryUUID', () => {
    it('should detect the shorthand `@petstore/v1.0#uuid` syntax', () => {
      expect(Fetcher.isAPIRegistryUUID('@petstore/v1.0#n6kvf10vakpemvplx')).toBe(true);
    });

    it('should detect the shorthand `@petstore#uuid` syntax', () => {
      expect(Fetcher.isAPIRegistryUUID('@petstore#n6kvf10vakpemvplx')).toBe(true);
    });

    it("shouldn't detect improperly formatted shorthand registry accessors", () => {
      expect(Fetcher.isAPIRegistryUUID('n6kvf10vakpemvplx')).toBe(false);
    });

    it("shouldn't detect urls as registry accessors", () => {
      expect(Fetcher.isAPIRegistryUUID('https://example.com/openapi.json')).toBe(false);
    });

    it("shouldn't detect absolute file paths as registry accessors", () => {
      const file = require.resolve('@readme/oas-examples/3.0/json/petstore-simple.json');
      expect(Fetcher.isAPIRegistryUUID(file)).toBe(false);
    });

    it("shouldn't detect relative file paths as registry accessors", () => {
      expect(Fetcher.isAPIRegistryUUID('../petstore.json')).toBe(false);
    });
  });

  describe('#isGitHubBlobURL', () => {
    it('should detect GitHub blob URLs', () => {
      expect(Fetcher.isGitHubBlobURL('https://github.com/readmeio/oas-examples/blob/main/3.1/json/petstore.json')).toBe(
        true,
      );
    });

    it('should detect a schemeless GitHub blob URL as one', () => {
      expect(Fetcher.isGitHubBlobURL('//github.com/readmeio/oas-examples/blob/main/3.1/json/petstore.json')).toBe(true);
    });

    it("shouldn't detect raw GitHub URLs as a blob URL", () => {
      expect(
        Fetcher.isGitHubBlobURL('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json'),
      ).toBe(false);
    });
  });

  describe('#getProjectPrefixFromRegistryUUID', () => {
    it('should retrieve the project prefix from the shorthand `@petstore/v1.0#uuid` syntax', () => {
      expect(Fetcher.getProjectPrefixFromRegistryUUID('@petstore/v1.0#n6kvf10vakpemvplx')).toBe('petstore');
    });

    it('should retrieve the project prefix from the shorthand `@petstore#uuid` syntax', () => {
      expect(Fetcher.getProjectPrefixFromRegistryUUID('@petstore#n6kvf10vakpemvplx')).toBe('petstore');
    });

    it("shouldn't return undefined on an improperly formatted shorthand registry accessor", () => {
      expect(Fetcher.getProjectPrefixFromRegistryUUID('n6kvf10vakpemvplx')).toBeUndefined();
    });
  });

  describe('#load', () => {
    it('should throw an error when a non-HTTP(S) url is supplied', async () => {
      await new Fetcher('htt://example.com/openapi.json')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).toBe('fetch failed');
          expect(err.cause.message).toBe('unknown scheme');
        });
    });

    it('should throw an error if neither a url or file are detected', async () => {
      await new Fetcher('/this/is/not/a/real/path.json')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).toMatch(/supply a URL or a path on your filesystem/);
        });
    });

    describe('GitHub URLs', () => {
      it('should resolve a GitHub blob URL to its accessible raw counterpart', () => {
        expect(new Fetcher('https://github.com/readmeio/oas-examples/blob/main/3.1/json/petstore.json').uri).toBe(
          'https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json',
        );
      });

      it('should leave an already raw GitHub URL alone', () => {
        expect(
          new Fetcher('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json').uri,
        ).toBe('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json');
      });
    });

    describe('ReadMe registry UUID', () => {
      it('should resolve the shorthand `@petstore/v1.0#uuid` syntax to the ReadMe API', () => {
        expect(new Fetcher('@petstore/v1.0#n6kvf10vakpemvplx').uri).toBe(
          'https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx',
        );
      });

      it('should resolve the shorthand `@petstore#uuid` syntax to the ReadMe API', () => {
        expect(new Fetcher('@petstore#n6kvf10vakpemvplx').uri).toBe(
          'https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx',
        );
      });

      it("shouldn't try to resolve improperly formatted shorthand accessors to the ReadMe API", () => {
        expect(new Fetcher('n6kvf10vakpemvplx').uri).toBe('n6kvf10vakpemvplx');
      });

      it('should be able to load a definition', async () => {
        fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplxn', readmeSpec);

        const fetcher = new Fetcher('@readme/v1.0#n6kvf10vakpemvplxn');

        await expect(fetcher.load()).resolves.toHaveProperty('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '4.355.0',
          title: 'ReadMe API 🦉',
          contact: {
            name: 'API Support',
            url: 'https://docs.readme.com/main/docs/need-more-support',
            email: 'support@readme.io',
          },
        });

        fetchMock.restore();
      });
    });

    describe('URL', () => {
      it('should be able to load a definition', async () => {
        fetchMock.get('http://example.com/readme.json', readmeSpec);
        const fetcher = new Fetcher('http://example.com/readme.json');

        await expect(fetcher.load()).resolves.toHaveProperty('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '4.355.0',
          title: 'ReadMe API 🦉',
          contact: {
            name: 'API Support',
            url: 'https://docs.readme.com/main/docs/need-more-support',
            email: 'support@readme.io',
          },
        });

        fetchMock.restore();
      });

      it('should error if the url cannot be reached', async () => {
        fetchMock.get('http://example.com/unknown.json', { status: 404 });

        await expect(new Fetcher('http://example.com/unknown.json').load()).rejects.toThrow(
          'Unable to retrieve URL (http://example.com/unknown.json). Reason: Not Found',
        );

        fetchMock.restore();
      });

      it('should convert yaml to json', async () => {
        const spec = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');
        fetchMock.get('http://example.com/readme.yaml', spec);

        const definition = 'http://example.com/readme.yaml';
        const fetcher = new Fetcher(definition);

        await expect(fetcher.load()).resolves.toHaveProperty('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '4.355.0',
          title: 'ReadMe API 🦉',
          contact: {
            name: 'API Support',
            url: 'https://docs.readme.com/main/docs/need-more-support',
            email: 'support@readme.io',
          },
        });

        fetchMock.restore();
      });
    });

    describe('file', () => {
      it('should be able to load a definition', async () => {
        const fetcher = new Fetcher(require.resolve('@readme/oas-examples/3.0/json/readme.json'));

        const res = await fetcher.load();
        expect(res.paths['/api-specification'].get.parameters).toBeDereferenced();
      });

      it('should be able to handle a relative path', async () => {
        const fetcher = new Fetcher('../api/test/__fixtures__/oas.json');

        await expect(fetcher.load()).resolves.toHaveProperty('info', {
          version: '1.0.0',
          title: 'Single Path',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });
      });

      it('should convert yaml to json', async () => {
        const file = require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml');
        const fetcher = new Fetcher(file);

        const res = await fetcher.load();
        expect(res.paths['/api-specification'].get.parameters).toBeDereferenced();
      });
    });
  });
});
