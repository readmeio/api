import chai, { expect } from 'chai';
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot';

import Oas from 'oas';
import TSGenerator from '../../src/codegen/typescript';

chai.use(jestSnapshotPlugin());

describe('typescript generator', function () {
  let petstore: Oas;

  beforeEach(async function () {
    petstore = await import('../__fixtures__/simple.oas.json').then(Oas.init);
    await petstore.dereference({ preserveRefAsJSONSchemaTitle: true });
  });

  it('should generate typescript code', async function () {
    const ts = new TSGenerator(petstore);
    const files = await ts.generator();

    expect(files).toMatchSnapshot();
  });
});
