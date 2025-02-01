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
      '**/__fixtures__/**',
      '**/__datasets__/**',
      '**/datasets/**',
      '**/dist/**',
      '**/helpers/**',
      '**/node_modules/**',
    ],
    setupFiles: ['packages/test-utils/vitest.matchers.ts'],
    workspace: [
      {
        extends: true,
        test: {
          exclude: [
            '**/smoketest.test.ts',
          ],
          include: ['packages/api/**/*.test.ts'],
          name: 'api',
        },
      },
      {
        extends: true,
        test: {
          include: ['packages/core/**/*.test.ts'],
          name: 'core',
        }
      },
      {
        extends: true,
        test: {
          include: ['packages/httpsnippet-client-api/**/*.test.ts'],
          name: 'httpsnippet-client-api',
        }
      },
    ],
  },
});
