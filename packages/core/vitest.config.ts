// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['@api/test-utils/vitest.matchers.ts'],
  },
});
