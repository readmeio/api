// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['dist', 'node_modules', '**/__datasets__/**', '**/__fixtures__/**', '**/helpers/**'],
  },
});
