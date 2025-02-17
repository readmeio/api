import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    'packages/api/vitest-smoketest.config.ts',
    'packages/httpsnippet-client-api/test/__datasets__/*/output.js',
    'packages/test-utils/vitest.matchers.ts',
  ],
  ignoreDependencies: [
    '@vitest/coverage-v8', // used by vitest --coverage
    'har-format', // this is loaded via `@types/har-format`
    'ts-node', // this is loaded via `typescript`
  ],
  workspaces: {
    'packages/test-utils': {
      entry: ['nock-mocks.ts'],
    },
  },
};

export default config;
