import oxfmtConfig from '@readme/oxlint-config/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig(
  Object.assign(structuredClone(oxfmtConfig), {
    sortImports: {
      ...oxfmtConfig.sortImports,
    },
    ignorePatterns: [
      '.changeset/',
      '.claude/',
      'coverage/',
      'dist/',
      'packages/**/CHANGELOG.md',
      'packages/api/schema.json',
      'packages/httpsnippet-client-api/test/__datasets__/**/index.ts',
      'packages/httpsnippet-client-api/test/__datasets__/**/output.js',
    ],
  }),
);
