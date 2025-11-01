import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/smoketest.test.ts'],
    setupFiles: ['@api/test-utils/vitest.matchers.ts'],
    testTimeout: 20000,
  },
});
