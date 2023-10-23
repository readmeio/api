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
    // `get-stream` is ESM-only and we need to build for CommonJS,
    // so including it here means that its (tree-shaken!) source code
    // will be included directly in our dist outputs.
    'get-stream',
  ],
  silent: !options.watch,
}));
