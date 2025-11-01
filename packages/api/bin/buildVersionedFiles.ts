/**
 * Updates packageInfo.ts and schema.json with the latest package info.
 * This script is run every time a new release is tagged.
 */
import fs from 'node:fs';

// biome-ignore lint/correctness/noUndeclaredDependencies: This script is only used during the build process.
import prettier from 'prettier';

import pkg from '../package.json' with { type: 'json' };
import { lockfileSchema } from '../src/lockfileSchema.js';

void (async () => {
  // use prettier to format schema file
  const prettierConfig = await prettier.resolveConfig(process.cwd());
  const formattedSchema = await prettier.format(JSON.stringify(lockfileSchema), { parser: 'json', ...prettierConfig });
  fs.writeFileSync('./schema.json', formattedSchema);

  const packageInfo = `
// This file is automatically updated by the build script.
export const PACKAGE_NAME = '${pkg.name}';
export const PACKAGE_VERSION = '${pkg.version}';
`.trimStart();

  fs.writeFileSync('./src/packageInfo.ts', packageInfo);
})();
