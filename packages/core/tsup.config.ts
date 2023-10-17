/* eslint-disable import/no-extraneous-dependencies, node/no-extraneous-import */
import type { Options } from 'tsup';

import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-relative-packages
import config from '../../tsup.config.js';

export default defineConfig((options: Options) => ({
  ...options,
  ...config,

  entry: ['src/errors/fetchError.ts', 'src/lib/index.ts', 'src/index.ts'],
  silent: !options.watch,
}));
