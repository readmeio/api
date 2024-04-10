import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    'packages/api/vitest-smoketest.config.ts',
    'packages/httpsnippet-client-api/test/__datasets__/**',
    'packages/test-utils/sdks/**',
    '**/global.d.ts',
    '**/tsup.config.ts',
  ],
  ignoreDependencies: [
    'har-format', // this is loaded via `@types/har-format`
  ],
  workspaces: {
    'packages/test-utils': {
      entry: ['vitest-matchers.ts'],
    },
  },
};

export default config;
