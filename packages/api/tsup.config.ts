import type { Options } from 'tsup';

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-relative-packages
import config from '../../tsup.config.js';

export default defineConfig((options: Options) => ({
  ...options,
  ...config,

  entry: ['src/bin.ts'],
  format: [
    // `api` is a CLI-only utility so as long as we're Node 18+ we don't need to ship ESM+CJS builds
    // for it.
    'esm',
  ],
  silent: !options.watch,
}));
