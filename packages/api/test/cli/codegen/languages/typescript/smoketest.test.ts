import { host } from '@jsdevtools/host-environment';
import { expect } from 'chai';
import Oas from 'oas';
import OASNormalize from 'oas-normalize';

import TSGenerator from '../../../../../src/cli/codegen/languages/typescript';
import realWorldAPIs from '../../../../datasets/real-world-apis.json';

const MAX_APIS_TO_TEST = 1000; // 200;
const START_AT_INDEX = 190;

describe('typescript smoketest', function () {
  beforeEach(function () {
    // Test timeout is huge here because CI can be slow, some API definitions are huge can take a
    // while to download + codegen.
    this.currentTest.timeout(host.ci ? 300000 : 60000); // 5 minutes in CI, 1 minute locally
    this.currentTest.slow(5000);
  });

  // eslint-disable-next-line no-plusplus
  for (let index = START_AT_INDEX; index < START_AT_INDEX + MAX_APIS_TO_TEST; index++) {
    if (!(index in realWorldAPIs)) {
      return;
    }

    it(`should generate an SDK for \`${realWorldAPIs[index].name}\``, async function () {
      const url = realWorldAPIs[index].url;

      const spec = await new OASNormalize(url).validate(true).catch(err => {
        console.error(`Could not retrieve: ${url}`, { err: err.message });
        this.skip();
      });

      const oas = Oas.init(spec);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './path/to/spec.json', realWorldAPIs[index].name);

      const res = await ts.generator();
      expect(Object.keys(res)).to.deep.equal(['index.ts', 'schemas.ts', 'types.ts']);
    });
  }
});
