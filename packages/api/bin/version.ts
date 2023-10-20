/**
 * Updates packageInfo.ts and schema.json with the latest package info.
 * This script is run every time a new release is tagged.
 */
import fs from 'node:fs';

import pkg from '../package.json' assert { type: 'json' };
import { lockfileSchema } from '../src/lockfileSchema.js';

function run() {
  fs.writeFileSync('./schema.json', JSON.stringify(lockfileSchema, null, 2));

  const packageInfo = `
// This file is automatically updated by the build script.
export const PACKAGE_NAME = '${pkg.name}';
export const PACKAGE_VERSION = '${pkg.version}';
`.trimStart();

  fs.writeFileSync('./src/packageInfo.ts', packageInfo);
}

run();
