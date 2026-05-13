import oxfmtConfig from '@readme/oxlint-config/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig(
  Object.assign(structuredClone(oxfmtConfig), {
    sortImports: {
      ...oxfmtConfig.sortImports,
    },
    ignorePatterns: ['coverage/', 'dist/', 'packages/httpsnippet-client-api/test/__datasets__/**/output.js'],
  }),
);
