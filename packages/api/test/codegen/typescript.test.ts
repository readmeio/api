import chai, { expect } from 'chai';
import chaiPlugins from '../helpers/chai-plugins';

import Oas from 'oas';
import TSGenerator from '../../src/codegen/typescript';

chai.use(chaiPlugins);

describe('typescript generator', function () {
  let petstore: Oas;

  beforeEach(async function () {
    petstore = await import('../__fixtures__/simple.oas.json').then(Oas.init);
    await petstore.dereference({ preserveRefAsJSONSchemaTitle: true });
  });

  it('should generate typescript code', async function () {
    const ts = new TSGenerator(petstore, '../__fixtures__/simple.oas.json');
    expect(await ts.generator()).toMatchSDKFixture('simple');
  });
});
