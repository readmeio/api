import fs from 'fs/promises';

import chai, { assert, expect } from 'chai';
import fetchMock from 'fetch-mock';

import Fetcher from '../src/fetcher';

import chaiPlugins from './helpers/chai-plugins';
import loadSpec from './helpers/load-spec';

chai.use(chaiPlugins);

let readmeSpec;

describe('fetcher', function () {
  before(async function () {
    readmeSpec = await loadSpec('@readme/oas-examples/3.0/json/readme.json');
  });

  describe('#isAPIRegistryUUID', function () {
    it('should detect the shorthand `@petstore/v1.0#uuid` syntax', function () {
      expect(Fetcher.isAPIRegistryUUID('@petstore/v1.0#n6kvf10vakpemvplx')).to.be.true;
    });

    it('should detect the shorthand `@petstore#uuid` syntax', function () {
      expect(Fetcher.isAPIRegistryUUID('@petstore#n6kvf10vakpemvplx')).to.be.true;
    });

    it("shouldn't detect improperly formatted shorthand registry accessors", function () {
      expect(Fetcher.isAPIRegistryUUID('n6kvf10vakpemvplx')).to.be.false;
    });

    it("shouldn't detect urls as registry accessors", function () {
      expect(Fetcher.isAPIRegistryUUID('https://example.com/openapi.json')).to.be.false;
    });

    it("shouldn't detect absolute file paths as registry accessors", function () {
      const file = require.resolve('@readme/oas-examples/3.0/json/petstore-simple.json');
      expect(Fetcher.isAPIRegistryUUID(file)).to.be.false;
    });

    it("shouldn't detect relative file paths as registry accessors", function () {
      expect(Fetcher.isAPIRegistryUUID('../petstore.json')).to.be.false;
    });
  });

  describe('#isGitHubBlobURL', function () {
    it('should detect GitHub blob URLs', function () {
      expect(Fetcher.isGitHubBlobURL('https://github.com/readmeio/oas-examples/blob/main/3.1/json/petstore.json')).to.be
        .true;
    });

    it('should detect a schemeless GitHub blob URL as one', function () {
      expect(Fetcher.isGitHubBlobURL('//github.com/readmeio/oas-examples/blob/main/3.1/json/petstore.json')).to.be.true;
    });

    it("shouldn't detect raw GitHub URLs as a blob URL", function () {
      expect(
        Fetcher.isGitHubBlobURL('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json')
      ).to.be.false;
    });
  });

  describe('#getProjectPrefixFromRegistryUUID', function () {
    it('should retrieve the project prefix from the shorthand `@petstore/v1.0#uuid` syntax', function () {
      expect(Fetcher.getProjectPrefixFromRegistryUUID('@petstore/v1.0#n6kvf10vakpemvplx')).to.equal('petstore');
    });

    it('should retrieve the project prefix from the shorthand `@petstore#uuid` syntax', function () {
      expect(Fetcher.getProjectPrefixFromRegistryUUID('@petstore#n6kvf10vakpemvplx')).to.equal('petstore');
    });

    it("shouldn't return undefined on an improperly formatted shorthand registry accessor", function () {
      expect(Fetcher.getProjectPrefixFromRegistryUUID('n6kvf10vakpemvplx')).to.be.undefined;
    });
  });

  describe('#load', function () {
    it('should throw an error when a non-HTTP(S) url is supplied', async function () {
      await new Fetcher('htt://example.com/openapi.json')
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
      await new Fetcher('/this/is/not/a/real/path.json')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.match(/supply a URL or a path on your filesystem/);
        });
    });

    describe('GitHub URLs', function () {
      it('should resolve a GitHub blob URL to its accessible raw counterpart', function () {
        expect(new Fetcher('https://github.com/readmeio/oas-examples/blob/main/3.1/json/petstore.json').uri).to.equal(
          'https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json'
        );
      });

      it('should leave an already raw GitHub URL alone', function () {
        expect(
          new Fetcher('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json').uri
        ).to.equal('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.1/json/petstore.json');
      });
    });

    describe('ReadMe registry UUID', function () {
      it('should resolve the shorthand `@petstore/v1.0#uuid` syntax to the ReadMe API', function () {
        expect(new Fetcher('@petstore/v1.0#n6kvf10vakpemvplx').uri).to.equal(
          'https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx'
        );
      });

      it('should resolve the shorthand `@petstore#uuid` syntax to the ReadMe API', function () {
        expect(new Fetcher('@petstore#n6kvf10vakpemvplx').uri).to.equal(
          'https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx'
        );
      });

      it("shouldn't try to resolve improperly formatted shorthand accessors to the ReadMe API", function () {
        expect(new Fetcher('n6kvf10vakpemvplx').uri).to.equal('n6kvf10vakpemvplx');
      });

      it('should be able to load a definition', async function () {
        fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplxn', readmeSpec);

        const fetcher = new Fetcher('@readme/v1.0#n6kvf10vakpemvplxn');

        expect(await fetcher.load()).to.have.deep.property('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '2.0.0',
          title: 'API Endpoints',
          contact: {
            email: 'support@readme.io',
            name: 'API Support',
            url: 'https://docs.readme.com/docs/contact-support',
          },
        });

        fetchMock.restore();
      });
    });

    describe('URL', function () {
      it('should be able to load a definition', async function () {
        fetchMock.get('http://example.com/readme.json', readmeSpec);
        const fetcher = new Fetcher('http://example.com/readme.json');

        expect(await fetcher.load()).to.have.deep.property('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '2.0.0',
          title: 'API Endpoints',
          contact: {
            email: 'support@readme.io',
            name: 'API Support',
            url: 'https://docs.readme.com/docs/contact-support',
          },
        });

        fetchMock.restore();
      });

      it('should error if the url cannot be reached', async function () {
        fetchMock.get('http://example.com/unknown.json', { status: 404 });

        await new Fetcher('http://example.com/unknown.json')
          .load()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.equal('Unable to retrieve URL (http://example.com/unknown.json). Reason: Not Found');
          });

        fetchMock.restore();
      });

      it('should convert yaml to json', async function () {
        const spec = await fs.readFile(require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml'), 'utf8');
        fetchMock.get('http://example.com/readme.yaml', spec);

        const definition = 'http://example.com/readme.yaml';
        const fetcher = new Fetcher(definition);

        expect(await fetcher.load()).to.have.deep.property('info', {
          description: 'Create beautiful product and API documentation with our developer friendly platform.',
          version: '2.0.0',
          title: 'API Endpoints',
          contact: {
            email: 'support@readme.io',
            name: 'API Support',
            url: 'https://docs.readme.com/docs/contact-support',
          },
        });

        fetchMock.restore();
      });
    });

    describe('file', function () {
      it('should be able to load a definition', async function () {
        const fetcher = new Fetcher(require.resolve('@readme/oas-examples/3.0/json/readme.json'));

        const res = await fetcher.load();
        expect(res.paths['/api-specification'].get.parameters).to.be.dereferenced;
      });

      it('should be able to handle a relative path', async function () {
        const fetcher = new Fetcher('../api/test/__fixtures__/oas.json');

        expect(await fetcher.load()).to.have.deep.property('info', {
          version: '1.0.0',
          title: 'Single Path',
          description: 'This is a slimmed down single path version of the Petstore definition.',
        });
      });

      it('should convert yaml to json', async function () {
        const file = require.resolve('@readme/oas-examples/3.0/yaml/readme.yaml');
        const fetcher = new Fetcher(file);

        const res = await fetcher.load();
        expect(res.paths['/api-specification'].get.parameters).to.be.dereferenced;
      });
    });
  });
});
