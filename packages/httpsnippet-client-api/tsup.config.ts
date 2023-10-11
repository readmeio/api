import type { Options } from 'tsup';

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-relative-packages
import config from '../../tsup.config.js';

export default defineConfig((options: Options) => ({
  ...options,
  ...config,

  entry: ['src/index.ts'],
  silent: !options.watch,
}));
