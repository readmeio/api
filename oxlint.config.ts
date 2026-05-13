import oxlintConfig from '@readme/oxlint-config';
import oxlintConfigVitest from '@readme/oxlint-config/testing/vitest';
import oxlintConfigTS from '@readme/oxlint-config/typescript';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [oxlintConfig, oxlintConfigTS],
  options: {
    reportUnusedDisableDirectives: 'error',
  },
  ignorePatterns: [
    '**/coverage',
    '**/dist',

    // `httpsnippet-client-api` datasets
    'packages/httpsnippet-client-api/test/__datasets__/**/*.js',
  ],
  categories: {
    suspicious: 'error',
  },
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true,
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/no-cycle': 'off', // @todo
    'no-underscore-dangle': ['error', { allow: ['_key'] }],
    'no-void': 'off',
    'unicorn/no-array-sort': 'off', // @todo
  },
  overrides: [
    {
      files: ['packages/**/*.test.{js,ts}'],
      ...oxlintConfigVitest,
      rules: Object.assign(structuredClone(oxlintConfigVitest.rules), {
        'vitest/no-conditional-expect': 'off',
        'vitest/require-hook': 'off',
        'vitest/warn-todo': 'off',
      }),
    },
    {
      files: ['packages/api/bin/api.js', 'packages/**/test/global.d.ts'],
      rules: {
        'import/no-unassigned-import': 'off',
      },
    },
    {
      files: ['packages/core/**'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'fs/promises',
                message: "Please use `fs` instead as some client frameworks don't polyfill `fs/promises`.",
              },
            ],
          },
        ],
      },
    },
  ],
});
