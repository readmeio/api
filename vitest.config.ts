// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    workspace: ['packages/api', 'packages/core', 'packages/httpsnippet-client-api']
  },
});
