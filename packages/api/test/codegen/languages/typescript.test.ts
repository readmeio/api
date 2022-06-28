import chai, { expect } from 'chai';
import chaiPlugins from '../../helpers/chai-plugins';

import Oas from 'oas';
import TSGenerator from '../../../src/codegen/languages/typescript';

chai.use(chaiPlugins);

describe('typescript generator', function () {
  it('should generate typescript code', async function () {
    const oas = await import('../../__fixtures__/simple.oas.json').then(Oas.init);
    await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

    const ts = new TSGenerator(oas, './simple.oas.json');
    expect(await ts.generator()).toMatchSDKFixture('simple');
  });

  it('should be able to generate valid TS when a body is optional but metadata isnt', async function () {
    const oas = await import('../../__fixtures__/optional-payload.oas.json').then(Oas.init);
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
