import { expect } from 'chai';
import Oas from 'oas';
import OASNormalize from 'oas-normalize';

import TSGenerator from '../../../../../src/cli/codegen/languages/typescript';
import dataset from '../../../../datasets/real-world-apis.json';

// These APIs don't have any schemas so they should only be generating an `index.ts`.
const APIS_WITHOUT_SCHEMAS = ['poemist.com'];
const MAX_APIS_TO_TEST = 2000;
const START_AT_INDEX = 0;

const datasetRegex = process.argv.find(arg => arg.startsWith('--regex='))?.replace('--regex=', '');

function smoketestAPI(url: string, name: string) {
  return async function () {
    const spec = await new OASNormalize(url).validate(true).catch(err => {
      console.error(`Could not retrieve: ${url}`, { err: err.message });
      this.skip();
    });

    const oas = Oas.init(spec);
    await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

    const ts = new TSGenerator(oas, './path/to/spec.json', name);

    const res = await ts.generator();

    if (APIS_WITHOUT_SCHEMAS.includes(name)) {
      expect(Object.keys(res)).to.deep.equal(['index.ts']);
    } else {
      expect(Object.keys(res)).to.deep.equal(['index.ts', 'schemas.ts', 'types.ts']);
    }
  };
}

describe('typescript smoketest', function () {
  beforeEach(function () {
    // Test timeout is huge here because CI can be slow, some API definitions are huge can take a
    // while to download + codegen.
    this.currentTest.timeout(120000); // 2 minutes
    this.currentTest.slow(5000);
  });

  if (datasetRegex) {
    // eslint-disable-next-line mocha/no-setup-in-describe
    dataset.forEach(({ name, url }) => {
      if (!new RegExp(datasetRegex).test(name)) {
        return;
      }

      it(`should generate an SDK for \`${name}\``, function () {
        // smoketestAPI(url, name)
      });
    });

    return;
  }

  // eslint-disable-next-line no-plusplus
  for (let idx = START_AT_INDEX; idx < START_AT_INDEX + MAX_APIS_TO_TEST; idx++) {
    if (!(idx in dataset)) {
      return;
    }

    it(`should generate an SDK for \`${dataset[idx].name}\``, smoketestAPI(dataset[idx].url, dataset[idx].name));
  }
});
