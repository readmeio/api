// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/smoketest.test.ts'],
    setupFiles: ['./test/helpers/vitest.matchers.ts'],
    testTimeout: 20000,
  },
});
