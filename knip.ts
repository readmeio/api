import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    'packages/**/test/global.d.ts',
    'packages/httpsnippet-client-api/test/__datasets__/**/*.{js,ts}',
    'packages/test-utils/sdks/**/*.ts',
  ],
  ignoreDependencies: [
    '@vitest/coverage-v8', // used by vitest --coverage
    'eslint-plugin-readme', // This is used in our Oxlint config through another dependency.
    'har-format', // this is loaded via `@types/har-format`
    'vitest', // installed in individual packages
  ],
  ignoreBinaries: ['vitest'],
  oxfmt: {
    config: ['oxfmt.config.ts'],
  },
  oxlint: {
    config: ['oxlint.config.ts'],
  },
  workspaces: {
    'packages/test-utils': {
      entry: ['nock-mocks.ts'],
    },
  },
  vitest: {
    config: ['vitest.config.ts'],
    entry: ['packages/**test/**/*.ts'],
  },
};

export default config;
