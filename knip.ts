import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    'packages/api/vitest-smoketest.config.ts',
    'packages/httpsnippet-client-api/test/__datasets__/*/output.js',
    'packages/test-utils/vitest.matchers.ts',
  ],
  ignoreDependencies: [
    'har-format', // this is loaded via `@types/har-format`
    'ts-node', // this is loaded via `typescript`
  ],
  workspaces: {
    // 'packages/*': {},
    'packages/test-utils': {
      entry: ['fetch-mock.ts'],
    },
  },
};

export default config;
