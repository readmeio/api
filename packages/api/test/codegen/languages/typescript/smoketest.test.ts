/**
 * With this smoketest suite you can run SDK codegen assertions a number of different ways:
 *
 *  - Random sampling: This will run tests on a random slice of 20 APIs within the dataset.
 *  - Chunk-based: You provide a total amount of chunks and a specific chunk to run.
 *  - Everything: This will run the smoketest against every API within the dataset. This takes a
 *    while!
 *
 * @example <caption>Random sampling</caption>
 * npm run test:smoke -- --random
 *
 * @example <caption>Chunk-based</caption>
 * npm run test:smoke -- --chunks=15 --chunk=10
 *
 * @example <caption>Everything</caption>
 * npm run test:smoke
 */
import realWorldAPIs from '@api/test-utils/datasets/real-world-apis.json';
import Oas from 'oas';
import OASNormalize from 'oas-normalize';
import { describe, it, expect } from 'vitest';

import TSGenerator from '../../../../src/codegen/languages/typescript/index.js';

// These APIs don't have any schemas so they should only be generating an `index.ts`.
const APIS_WITHOUT_SCHEMAS = ['poemist.com'];

const args: { chunk?: string; chunks?: string; random?: boolean } = Object.fromEntries(
  process.argv
    .filter(a => a.startsWith('--'))
    .map(a => {
      /**
       * @example `--chunks=15 --chunk=2` → `{ chunks: '15', chunk: '2' }`
       * @example `--random` → `{ random: true }`
       */
      const [arg, val] = a.split('=');
      return [arg.slice(2), !val ? true : parseInt(val, 10)];
    }),
);

let dataset;
const datasetTotal = realWorldAPIs.length;
if (args.chunks && args.chunk) {
  const chunkSize = Math.floor(datasetTotal / parseInt(args.chunks, 10));
  const start = chunkSize * (parseInt(args.chunk, 10) - 1);
  const end = args.chunk === args.chunks ? datasetTotal : start + chunkSize;

  dataset = realWorldAPIs.slice(start, end);
} else if (args.random) {
  const randomSamplingMax = 20;
  const start = Math.floor(Math.random() * (datasetTotal - randomSamplingMax) + randomSamplingMax);
  dataset = realWorldAPIs.slice(start, start + randomSamplingMax);
} else {
  dataset = realWorldAPIs;
}

describe('typescript smoketest', () => {
  // eslint-disable-next-line vitest/require-hook
  dataset.forEach(({ name, url }) => {
    // The test timeout is huge on this because CI can be slow as some API definitions are huge and
    // can take a while to download + codegen.
    it(`should generate an SDK for \`${name}\``, async () => {
      const spec = await new OASNormalize(url).validate({ convertToLatest: true }).catch(err => {
        // If this fails for any reason we should know. Catching and re-throwing here for the sake
        // of test verbosity.
        throw err;
      });

      const oas = Oas.init(spec);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './path/not/needed.json', name);
      const res = await ts.compile();

      if (APIS_WITHOUT_SCHEMAS.includes(name)) {
        expect(Object.keys(res)).toStrictEqual(['index.ts']);
      } else {
        expect(Object.keys(res)).toStrictEqual(['index.ts', 'schemas.ts', 'types.ts']);
      }
    }, 180000);
  });
});
