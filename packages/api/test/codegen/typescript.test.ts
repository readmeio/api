import chai, { expect } from 'chai';
import chaiPlugins from '../helpers/chai-plugins';

import Oas from 'oas';
import TSGenerator from '../../src/codegen/typescript';

chai.use(chaiPlugins);

describe('typescript generator', function () {
  it('should generate typescript code', async function () {
    const oas = await import('../__fixtures__/simple.oas.json').then(Oas.init);
    await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

    const ts = new TSGenerator(oas, './simple.oas.json');
    expect(await ts.generator()).toMatchSDKFixture('simple');
  });

  it('should work against the petstore', async function () {
    const oas = await import('@readme/oas-examples/3.0/json/petstore.json').then(Oas.init);
    await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

    const ts = new TSGenerator(oas, './petstore.json');
    expect(await ts.generator()).toMatchSDKFixture('petstore');
  });
});
