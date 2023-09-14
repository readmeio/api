// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      '**/dist/**',
      '**/node_modules/**',
      '**/__fixtures__/**',
      '**/datasets/**',
      '**/helpers/**',
      '**/smoketest.test.ts',
    ],
    setupFiles: ['@api/test-utils/vitest.matchers.ts'],
    testTimeout: 20000,
  },
});
