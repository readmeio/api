import chai, { expect } from 'chai';
import fs from 'fs';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiPlugins from '../../../helpers/chai-plugins';

import Oas from 'oas';
import Storage from '../../../../src/cli/storage';
import TSGenerator from '../../../../src/cli/codegen/languages/typescript';

chai.use(chaiPlugins);
chai.use(sinonChai);

describe('typescript', function () {
  describe('#installer', function () {
    beforeEach(function () {
      /**
       * Create a unique temporary local directory here so we can test package installation. We need
       * to do this instead of using something like `unique-temp-dir` because there's a bug in npm@8
       * where if a package is installed to a non-local directory it'll throw an exception when
       * attempting to install it as a `file:` dependency.
       * @see {@link https://github.com/npm/cli/issues/3847}
       */
      Storage.setStorageDir(Math.random().toString(36).substring(2));
    });

    afterEach(async function () {
      Storage.reset();
      await fs.promises.rm(Storage.getAPIsDir(), { recursive: true });
      await fs.promises.rm(Storage.dir, { recursive: true });
    });

    it('should install a `package.json` and the required packages', async function () {
      const logger = sinon.spy();

      const file = require.resolve('@readme/oas-examples/3.0/json/petstore.json');

      const oas = await import(file).then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const storage = new Storage(file, 'petstore');
      await storage.load();

      const ts = new TSGenerator(oas, './petstore.json');
      await ts.installer(storage, { logger, dryRun: true });

      expect(logger).to.be.calledWith(`npm install api oas --save --dry-run`);
      expect(logger).to.be.calledWith(`npm install ${Storage.dir}/apis/petstore --dry-run`);
    });
  });

  describe('#generator', function () {
    it('should generate typescript code', async function () {
      const oas = await import('../../../__fixtures__/simple.oas.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './simple.oas.json');
      expect(await ts.generator()).toMatchSDKFixture('simple');
    });

    it('should generate javascript code', async function () {
      const oas = await import('../../../__fixtures__/simple.oas.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './simple.oas.json', { outputJS: true });
      expect(await ts.generator()).toMatchSDKFixture('simple-js');
    });

    it('should be able to generate valid TS when a body is optional but metadata isnt', async function () {
      const oas = await import('../../../__fixtures__/optional-payload.oas.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './optional-payload.oas.json');
      expect(await ts.generator()).toMatchSDKFixture('optional-payload');
    });

    it('should work against the petstore', async function () {
      const oas = await import('@readme/oas-examples/3.0/json/petstore.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './petstore.json');
      expect(await ts.generator()).toMatchSDKFixture('petstore');
    });

    it('should work against our OAS', async function () {
      const oas = await import('@readme/oas-examples/3.0/json/readme.json').then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './readme.json');
      expect(await ts.generator()).toMatchSDKFixture('readme');
    });
  });
});
