import type { Options } from 'tsup';

const config: Options = {
  cjsInterop: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  minify: false,
  shims: true,
  sourcemap: true,
  splitting: true,
};

export default config;
