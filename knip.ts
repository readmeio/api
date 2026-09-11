import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    'packages/**/dist/**',
    'packages/httpsnippet-client-api/test/__datasets__/**/*.{js,ts}',
    'packages/test-utils/sdks/**/*.ts',

    // Knip isn't picking up our test entrypoint for some reason.
    'packages/api/test/bin.test.ts',
    'packages/api/test/codegen/languages/typescript/index.test.ts',
    'packages/api/test/codegen/languages/typescript/utils.test.ts',
    'packages/api/test/commands/install.test.ts',
    'packages/api/test/commands/list.test.ts',
    'packages/api/test/commands/uninstall.test.ts',
    'packages/api/test/fetcher.test.ts',
    'packages/api/test/lib/suggestedOperations.test.ts',
    'packages/api/test/router.test.ts',
    'packages/api/test/storage.test.ts',
    'packages/core/test/index.test.ts',
    'packages/core/test/lib/getJSONSchemaDefaults.test.ts',
    'packages/core/test/lib/parseResponse.test.ts',
    'packages/core/test/lib/prepareAuth.test.ts',
    'packages/core/test/lib/prepareParams.test.ts',
    'packages/httpsnippet-client-api/test/index.test.ts',
    'packages/httpsnippet-client-api/test/utils.ts',
  ],
  ignoreDependencies: [
    '@readme/oas-examples', // these are used in our SDK fixtures
    '@vitest/coverage-v8', // used by vitest --coverage
    'eslint-plugin-readme', // This is used in our Oxlint config through another dependency.
    'har-format', // this is loaded via `@types/har-format`
    'vitest', // installed in individual packages

    // Knip isn't picking up our test entrypoint for some reason.
    'ajv',
    'ajv-formats',
    'nock',
    '@api/test-utils',
    'jest-expect-openapi',
  ],
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
    entry: ['packages/**/test/**/*.test.ts'],
  },
};

export default config;
