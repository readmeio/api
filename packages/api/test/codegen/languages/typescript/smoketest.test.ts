/**
 * With this smoketest suite you can run SDK codegen assertions a number of different ways:
 *
 *  - Random sampling: This will run tests on a random slice of 20 APIs within the dataset.
 *  - Chunk-based: You provide a total amount of chunks and a specific chunk to run.
 *  - Everything: This will run the smoketest against every API within the dataset. This takes a
 *    while!
 *
 * @example <caption>Random sampling</caption>
 * SMOKETEST_RANDOM=on npm run test:smoke
 *
 * @example <caption>Chunk-based</caption>
 * SMOKETEST_CHUNKS=15 SMOKETEST_CHUNK=10 npm run test:smoke
 *
 * @example <caption>Everything</caption>
 * npm run test:smoke
 */
import realWorldAPIs from '@api/test-utils/datasets/real-world-apis.json' with { type: 'json' };
import Oas from 'oas';
import OASNormalize from 'oas-normalize';
import uniqueTempDir from 'unique-temp-dir';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import TSGenerator from '../../../../src/codegen/languages/typescript/index.js';
import Storage from '../../../../src/storage.js';

// These APIs don't have any schemas so they should not be generating a `schemas/` directory.
const APIS_WITHOUT_SCHEMAS = ['poemist.com'];

/**
 * @example `SMOKETEST_CHUNKS=15 SMOKETEST_CHUNK=2` → `{ chunks: '15', chunk: '2' }`
 * @example `SMOKETEST_RANDOM=on` → `{ random: true }`
 */
const args: { chunk?: string; chunks?: string; random?: boolean } = {
  chunk: process.env.SMOKETEST_CHUNK,
  chunks: process.env.SMOKETEST_CHUNKS,
  random: !!process.env.SMOKETEST_RANDOM,
};

let dataset: typeof realWorldAPIs;
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
  beforeEach(() => {
    Storage.setStorageDir(uniqueTempDir());
  });

  afterEach(async () => {
    await Storage.reset();
  });

  dataset.forEach(({ name, url }) => {
    // The test timeout is huge on this because CI can be slow as some API definitions are huge and
    // can take a while to download + codegen.
    it(`should generate an SDK for \`${name}\``, async () => {
      const normalized = new OASNormalize(url);
      const spec = await normalized.load();
      await normalized.validate().catch(err => {
        // If this fails for any reason we should know. Catching and re-throwing here for the sake
        // of test verbosity.
        throw err;
      });

      const oas = Oas.init(spec);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const ts = new TSGenerator(oas, './path/not/needed.json', name);
      const res = await ts.generate();

      const files = Object.keys(res);

      expect(files).toContain('.gitignore');
      expect(files).toContain('package.json');
      expect(files).toContain('README.md');
      expect(files).toContain('tsconfig.json');
      expect(files).toContain('src/index.ts');
      expect(files).toContain('src/types.ts');

      if (APIS_WITHOUT_SCHEMAS.includes(name)) {
        expect(files).not.toContain('src/schemas.ts');
      } else {
        expect(files).toContain('src/schemas.ts');
      }
    }, 180000);
  });
});
