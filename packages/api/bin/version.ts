/**
 * Updates packageInfo.ts and schema.json with the latest package info.
 * This script is run every time a new release is tagged.
 */
import fs from 'node:fs';

// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-import
import prettier from 'prettier';

import pkg from '../package.json' assert { type: 'json' };
import { lockfileSchema } from '../src/lockfileSchema.js';

async function run() {
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
}

run();
