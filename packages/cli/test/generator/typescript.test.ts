import Oas from 'oas';
import typescriptGenerator from '../../src/generator/typescript';

// import uspto from '@readme/oas-examples/3.0/json/uspto.json';

// ////////////////////////////////////////////////////////
import { inspect } from 'util';

declare global {
  interface Console {
    logx: any;
  }
}

console.logx = (obj: any) => {
  console.log(inspect(obj, false, null, true));
};
// ////////////////////////////////////////////////////////

describe('typescript generator', function () {
  let petstore: Oas;

  beforeEach(async function () {
    petstore = await import('../fixtures/simple.oas.json').then(Oas.init);
    await petstore.dereference({ preserveRefAsJSONSchemaTitle: true });
  });

  it('should generate typescript code', async function () {
    await typescriptGenerator(petstore);
    // const gen = await typescriptGenerator(petstore);
    // console.log(gen)

    // console.log(ast);


    // console.log(petstore)
  });
});
