/* eslint-disable import/first */
import type { TSGeneratorOptions } from '../../../../src/cli/codegen/languages/typescript';

import chai, { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiPlugins from '../../../helpers/chai-plugins';
import mockRequire from 'mock-require';

// Because `packageInfo` is generated at build time and we're using it in tests, everytime we build
// a new release our tests will also need to get updated because we use `PACKAGE_VERSION` in user
// agent strings. Because nobody wants to have to fix broken tests everytime we build a new release
// we need to overload the `packageInfo` import here with some fake data that we can then use in our
// test snapshots.
mockRequire('../../../../src/packageInfo', {
  PACKAGE_NAME: 'api',
  PACKAGE_VERSION: '5.0-unit-testing',
});

import uniqueTempDir from 'unique-temp-dir';
import Oas from 'oas';
import Storage from '../../../../src/cli/storage';
import TSGenerator from '../../../../src/cli/codegen/languages/typescript';

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

      expect(logger).to.be.calledWith('npm install --save --dry-run api@beta oas');
      expect(logger).to.be.calledWith(`npm install --save --dry-run ${Storage.dir}/apis/petstore`);
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

    it(
      'should handle some quirky `operationId` cases',
      assertSDKFixture('../../../__fixtures__/definitions/operationid-quirks.json', 'operationid-quirks')
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

        await sdk.findPetsByStatus({ status: ['available'] }).then(res => {
          expect(res).to.equal('/v2/pet/findByStatus?status=available');
        });
      });

      it('should be able to make an API request (JS + CommonJS)', async function () {
        const sdk = await import('../../../__fixtures__/sdk/simple-js-cjs').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(res => {
          expect(res).to.equal('/v2/pet/findByStatus?status=available');
        });
      });

      it('should be able to make an API request (JS + ESM)', async function () {
        const sdk = await import('../../../__fixtures__/sdk/simple-js-esm').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(res => {
          expect(res).to.equal('/v2/pet/findByStatus?status=available');
        });
      });
    });
  });
});
