import chai, { assert, expect } from 'chai';
import nock from 'nock';
import chaiPlugins from './helpers/chai-plugins';
import fs from 'fs/promises';
import Fetcher from '../src/fetcher';

import readmeSpec from '@readme/oas-examples/3.0/json/readme.json';

chai.use(chaiPlugins);

describe('fetcher', function () {
  describe('#load', function () {
    it('should throw an error when a non-HTTP(S) url is supplied', async function () {
      await new Fetcher('htt://example.com/openapi.json')
        .load()
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal('Only HTTP(S) protocols are supported');
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
        const mock = nock('https://dash.readme.com')
          .get('/api/v1/api-registry/n6kvf10vakpemvplxn')
          .reply(200, readmeSpec);

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

        mock.done();
      });
    });

    describe('URL', function () {
      it('should be able to load a definition', async function () {
        const mock = nock('http://example.com').get('/readme.json').reply(200, readmeSpec);
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

        mock.done();
      });

      it('should error if the url cannot be reached', async function () {
        const mock = nock('http://example.com').get('/unknown.json').reply(404);

        await new Fetcher('http://example.com/unknown.json')
          .load()
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

        mock.done();
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
