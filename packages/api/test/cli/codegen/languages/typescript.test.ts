/* eslint-disable import/first */
import chai, { expect } from 'chai';
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

chai.use(chaiPlugins);
chai.use(sinonChai);

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
    it('should generate typescript (by default)', async function () {
      const oas = await import('../../../__fixtures__/definitions/simple.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './openapi.json', 'simple-ts');
      expect(await ts.generator()).toMatchSDKFixture('simple-ts');
    });

    it('should be able to generate valid TS when a body is optional but metadata isnt', async function () {
      const oas = await import('../../../__fixtures__/definitions/optional-payload.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './openapi.json', 'optional-payload');
      expect(await ts.generator()).toMatchSDKFixture('optional-payload');
    });

    it('should work against the petstore', async function () {
      const oas = await import('@readme/oas-examples/3.0/json/petstore.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './openapi.json', 'petstore');
      expect(await ts.generator()).toMatchSDKFixture('petstore');
    });

    it('should work against our OAS', async function () {
      const oas = await import('@readme/oas-examples/3.0/json/readme.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './openapi.json', 'readme');
      expect(await ts.generator()).toMatchSDKFixture('readme');
    });

    it('should handle some quirky `operationId` cases', async function () {
      const oas = await import('../../../__fixtures__/definitions/operationid-quirks.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './openapi.json', 'operationid-quirks');
      expect(await ts.generator()).toMatchSDKFixture('operationid-quirks');
    });

    describe('javascript generation', function () {
      it('should generate a CommonJS library', async function () {
        const oas = await import('../../../__fixtures__/definitions/simple.json').then(Oas.init);
        await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

        const ts = new TSGenerator(oas, './openapi.json', 'simple-js-cjs', { outputJS: true });
        expect(await ts.generator()).toMatchSDKFixture('simple-js-cjs');
      });

      it('should generate am ESM library', async function () {
        const oas = await import('../../../__fixtures__/definitions/simple.json').then(Oas.init);
        await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

        const ts = new TSGenerator(oas, './openapi.json', 'simple-js-esm', {
          outputJS: true,
          compilerTarget: 'esm',
        });

        expect(await ts.generator()).toMatchSDKFixture('simple-js-esm');
      });
    });
  });
});
