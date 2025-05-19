/* eslint-disable import/no-extraneous-dependencies, node/no-extraneous-import */
import type { Options } from 'tsup';

import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-relative-packages
import config from '../../tsup.config.js';

export default defineConfig((options: Options) => ({
  ...options,
  ...config,

  entry: ['src/errors/fetchError.ts', 'src/lib/index.ts', 'src/index.ts', 'src/types.ts'],

  noExternal: [
    // These dependencies are ESM-only but because we're building for ESM **and** CJS we can't
    // treat them as external dependencies as CJS libraries can't load ESM code that uses `export`.
    // `noExternal` will instead treeshake these dependencies down and include them in our compiled
    // dists.
    'get-stream',
  ],

  silent: !options.watch,
}));
