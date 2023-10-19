/* eslint-disable import/no-extraneous-dependencies, node/no-extraneous-import */
import type { Options } from 'tsup';

import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-relative-packages
import config from '../../tsup.config.js';

export default defineConfig((options: Options) => ({
  ...options,
  ...config,

  entry: ['src/errors/fetchError.ts', 'src/lib/index.ts', 'src/index.ts'],
  // `get-stream` is ESM-only and we need to build for CommonJS,
  // so including it below means that its (tree-shaken!) source code
  // will be included directly in our dist outputs.
  noExternal: ['get-stream'],
  silent: !options.watch,
}));
