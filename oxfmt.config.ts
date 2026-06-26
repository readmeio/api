import oxfmtConfig from '@readme/oxlint-config/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig(
  Object.assign(structuredClone(oxfmtConfig), {
    sortImports: {
      ...oxfmtConfig.sortImports,
    },
    ignorePatterns: [
      '.changeset/',
      'coverage/',
      'dist/',
      'packages/api/schema.json',
      'packages/httpsnippet-client-api/test/__datasets__/**/index.ts',
      'packages/httpsnippet-client-api/test/__datasets__/**/output.js',
    ],
  }),
);
