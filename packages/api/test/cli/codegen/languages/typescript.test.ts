/* eslint-disable import/first */
import type { TSGeneratorOptions } from '../../../../src/cli/codegen/languages/typescript';

import chai, { expect } from 'chai';
import fetchMock from 'fetch-mock';
import mockRequire from 'mock-require';
import Oas from 'oas';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import uniqueTempDir from 'unique-temp-dir';

// Because `packageInfo` is generated at build time and we're using it in tests, everytime we build
// a new release our tests will also need to get updated because we use `PACKAGE_VERSION` in user
// agent strings. Because nobody wants to have to fix broken tests everytime we build a new release
// we need to overload the `packageInfo` import here with some fake data that we can then use in our
// test snapshots.
mockRequire('../../../../src/packageInfo', {
  PACKAGE_NAME: 'api',
  PACKAGE_VERSION: '5.0-unit-testing',
});

import TSGenerator from '../../../../src/cli/codegen/languages/typescript';
import Storage from '../../../../src/cli/storage';
import chaiPlugins from '../../../helpers/chai-plugins';
import { responses as mockResponse } from '../../../helpers/fetch-mock';

chai.use(chaiPlugins);
chai.use(sinonChai);

function assertSDKFixture(file: string, fixture: string, opts: TSGeneratorOptions = {}) {
  return async function () {
    const oas = await import(file).then(Oas.init);
    await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

    const ts = new TSGenerator(oas, file, fixture, opts);
    expect(await ts.generator()).toMatchSDKFixture(fixture);
  };
}

describe('typescript', function () {
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

      const oas = await import(file).then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const storage = new Storage(file, 'petstore');
      await storage.load();

      const ts = new TSGenerator(oas, './openapi.json', 'petstore', { compilerTarget: 'cjs' });
      await ts.installer(storage, { logger, dryRun: true });

      expect(logger).to.be.calledWith('npm install --save --dry-run api@beta json-schema-to-ts oas');
      expect(logger).to.be.calledWith('npm install --save --dry-run'); // This is the `@api/petstore` install.
    });
  });

  describe('#generator', function () {
    it(
      'should generate typescript (by default)',
      assertSDKFixture('../../../fixtures/definitions/simple.json', 'simple-ts')
    );

    it(
      'should be able to generate valid TS when a body is optional but metadata isnt',
      assertSDKFixture('../../../fixtures/definitions/optional-payload.json', 'optional-payload')
    );

    it('should work against the petstore', assertSDKFixture('@readme/oas-examples/3.0/json/petstore.json', 'petstore'));

    it('should work against our OAS', assertSDKFixture('@readme/oas-examples/3.0/json/readme.json', 'readme'));

    // This SDK only has an `index.ts` as it has no schemas.
    it(
      'should handle some quirky `operationId` cases',
      assertSDKFixture('../../../fixtures/definitions/operationid-quirks.json', 'operationid-quirks')
    );

    it(
      'should handle `title` props that start with a number',
      assertSDKFixture('../../../fixtures/definitions/response-title-quirks.json', 'response-title-quirks')
    );

    it.skip('should handle a operations with a `default` response');

    describe('javascript generation', function () {
      it(
        'should generate a CommonJS library',
        assertSDKFixture('../../../fixtures/definitions/simple.json', 'simple-js-cjs', { outputJS: true })
      );

      it(
        'should generate am ESM library',
        assertSDKFixture('../../../fixtures/definitions/simple.json', 'simple-js-esm', {
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
        const sdk = await import('../../../fixtures/sdk/simple-ts').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).to.equal('/v2/pet/findByStatus?status=available');
          expect(status).to.equal(200);
          expect(headers).to.have.deep.property('constructor').to.have.deep.property('name', 'Headers');
          expect(res).to.have.deep.property('constructor').to.have.deep.property('name', 'Response');
        });
      });

      it('should be able to make an API request with an `accept` header`', async function () {
        const sdk = await import('../../../fixtures/sdk/simple-ts').then(r => r.default);
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
        const sdk = await import('../../../fixtures/sdk/simple-js-cjs').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).to.equal('/v2/pet/findByStatus?status=available');
          expect(status).to.equal(200);
          expect(headers).to.have.deep.property('constructor').to.have.deep.property('name', 'Headers');
          expect(res).to.have.deep.property('constructor').to.have.deep.property('name', 'Response');
        });
      });

      it('should be able to make an API request (JS + ESM)', async function () {
        const sdk = await import('../../../fixtures/sdk/simple-js-esm').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).to.equal('/v2/pet/findByStatus?status=available');
          expect(status).to.equal(200);
          expect(headers).to.have.deep.property('constructor').to.have.deep.property('name', 'Headers');
          expect(res).to.have.deep.property('constructor').to.have.deep.property('name', 'Response');
        });
      });
    });
  });
});
