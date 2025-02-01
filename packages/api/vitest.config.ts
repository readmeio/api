// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      // Vitest strips colors from content by default and `chalk` has troubles with color detection
      // in CI.
      // https://github.com/chalk/supports-color/issues/106
      FORCE_COLOR: '1',
    },

    exclude: [
      '**/dist/**',
      '**/node_modules/**',
      '**/__fixtures__/**',
      '**/datasets/**',
      '**/helpers/**',
      '**/smoketest.test.ts',
    ],
    setupFiles: ['../test-utils/vitest.matchers.ts'],
    testTimeout: 20000,
  },
});
