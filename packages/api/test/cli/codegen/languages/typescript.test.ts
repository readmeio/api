import type { TSGeneratorOptions } from '../../../../src/cli/codegen/languages/typescript';

import { promises as fs } from 'fs';
import path from 'path';

import chai, { assert, expect } from 'chai';
import fetchMock from 'fetch-mock';
import Oas from 'oas';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import uniqueTempDir from 'unique-temp-dir';

import TSGenerator from '../../../../src/cli/codegen/languages/typescript';
import Storage from '../../../../src/cli/storage';
import chaiPlugins from '../../../helpers/chai-plugins';
import { responses as mockResponse } from '../../../helpers/fetch-mock';
import loadSpec from '../../../helpers/load-spec';

chai.use(chaiPlugins);
chai.use(sinonChai);

function assertSDKFixture(file: string, fixture: string, opts: TSGeneratorOptions = {}) {
  return async function () {
    const oas = await loadSpec(require.resolve(file)).then(Oas.init);
    await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

    const ts = new TSGenerator(oas, file, fixture, opts);
    expect(await ts.generator()).toMatchSDKFixture(fixture);

    // Make sure that we can load the SDK without any TS compilation errors.
    const sdk = await import(`../../../__fixtures__/sdk/${fixture}`).then(r => r.default);
    expect(sdk.constructor.name).to.equal('SDK');
  };
}

describe('typescript', function () {
  beforeEach(function () {
    // Package installation and codegen can take a bit.
    this.currentTest.timeout(20000);
  });

  describe('#installer', function () {
    beforeEach(function () {
      Storage.setStorageDir(uniqueTempDir());
    });

    afterEach(function () {
      Storage.reset();
    });

    it('should install a `package.json` and the required packages', async function () {
      const logger = sinon.spy();

      const file = require.resolve('@readme/oas-examples/3.0/json/petstore.json');
      const oas = await loadSpec(file).then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const storage = new Storage(file, 'petstore');
      await storage.load();

      const ts = new TSGenerator(oas, './openapi.json', 'petstore', { compilerTarget: 'cjs' });
      await ts.installer(storage, { logger, dryRun: true });

      const pkgJson = await fs
        .readFile(path.join(storage.getIdentifierStorageDir(), 'package.json'), 'utf-8')
        .then(JSON.parse);

      expect(pkgJson).to.deep.equal({
        name: '@api/petstore',
        version: '1.0.0',
        main: './index.ts',
        types: './index.d.ts',
      });

      expect(logger).to.be.calledWith('npm install --save --dry-run api json-schema-to-ts@beta oas');
      expect(logger).to.be.calledWith(`npm install --save --dry-run ${storage.getIdentifierStorageDir()}`);
    });
  });

  describe('#generator', function () {
    it(
      'should generate typescript (by default)',
      assertSDKFixture('../../../__fixtures__/definitions/simple.json', 'simple-ts')
    );

    it(
      'should be able to generate valid TS when a body is optional but metadata isnt',
      assertSDKFixture('../../../__fixtures__/definitions/optional-payload.json', 'optional-payload')
    );

    it('should work against the petstore', assertSDKFixture('@readme/oas-examples/3.0/json/petstore.json', 'petstore'));

    it('should work against our OAS', assertSDKFixture('@readme/oas-examples/3.0/json/readme.json', 'readme'));

    // This SDK only has an `index.ts` as it has no schemas.
    it(
      'should handle some quirky `operationId` cases',
      assertSDKFixture('../../../__fixtures__/definitions/operationid-quirks.json', 'operationid-quirks')
    );

    it(
      'should handle `title` props that start with a number',
      assertSDKFixture('../../../__fixtures__/definitions/response-title-quirks.json', 'response-title-quirks')
    );

    it.skip('should handle a operations with a `default` response');

    it(
      'should handle an api that has discriminators and no operation ids',
      assertSDKFixture('../../../__fixtures__/definitions/alby.json', 'alby')
    );

    describe('javascript generation', function () {
      it(
        'should generate a CommonJS library',
        assertSDKFixture('../../../__fixtures__/definitions/simple.json', 'simple-js-cjs', { outputJS: true })
      );

      it(
        'should generate am ESM library',
        assertSDKFixture('../../../__fixtures__/definitions/simple.json', 'simple-js-esm', {
          outputJS: true,
          compilerTarget: 'esm',
        })
      );
    });

    describe('integration', function () {
      afterEach(function () {
        fetchMock.restore();
      });

      it('should be able to make an API request (TS)', async function () {
        const sdk = await import('../../../__fixtures__/sdk/simple-ts').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).to.equal('/v2/pet/findByStatus?status=available');
          expect(status).to.equal(200);
          expect(headers).to.have.deep.property('constructor').to.have.deep.property('name', 'Headers');
          expect(res).to.have.deep.property('constructor').to.have.deep.property('name', 'Response');
        });
      });

      it('should be able to make an API request with an `accept` header`', async function () {
        const sdk = await import('../../../__fixtures__/sdk/simple-ts').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.headers);

        await sdk
          .findPetsByStatus({ status: ['available'], accept: 'application/xml' })
          .then(({ data, status, headers, res }) => {
            expect(data).to.have.deep.property('accept', 'application/xml');
            expect(status).to.equal(200);
            expect(headers).to.have.deep.property('constructor').to.have.deep.property('name', 'Headers');
            expect(res).to.have.deep.property('constructor').to.have.deep.property('name', 'Response');
          });
      });

      it('should be able to make an API request (JS + CommonJS)', async function () {
        const sdk = await import('../../../__fixtures__/sdk/simple-js-cjs').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).to.equal('/v2/pet/findByStatus?status=available');
          expect(status).to.equal(200);
          expect(headers).to.have.deep.property('constructor').to.have.deep.property('name', 'Headers');
          expect(res).to.have.deep.property('constructor').to.have.deep.property('name', 'Response');
        });
      });

      it('should be able to make an API request (JS + ESM)', async function () {
        const sdk = await import('../../../__fixtures__/sdk/simple-js-esm').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).to.equal('/v2/pet/findByStatus?status=available');
          expect(status).to.equal(200);
          expect(headers).to.have.deep.property('constructor').to.have.deep.property('name', 'Headers');
          expect(res).to.have.deep.property('constructor').to.have.deep.property('name', 'Response');
        });
      });
    });

    describe('error handling', function () {
      it('should fail on an API definition that has no `paths`', async function () {
        const oas = Oas.init({
          openapi: '3.0.3',
          info: {
            title: 'empty oas',
            version: '1.0.0',
          },
          paths: {},
        });

        const ts = new TSGenerator(oas, 'no-paths', './no-paths.json');
        await ts
          .generator()
          .then(() => assert.fail())
          .catch(err => {
            expect(err.message).to.equal(
              'Sorry, this OpenAPI definition does not have any operation paths to generate an SDK for.'
            );
          });
      });

      it('should fail on an API definition that contains circular references', async function () {
        const oas = await loadSpec('@readme/oas-examples/3.0/json/circular.json').then(Oas.init);
        await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

        try {
          // eslint-disable-next-line no-new
          new TSGenerator(oas, 'circular', './circular.json');
          assert.fail();
        } catch (err) {
          expect(err.message).to.equal(
            'Sorry, this library does not yet support generating an SDK for an OpenAPI definition that contains circular references.'
          );
        }
      });
    });
  });
});
