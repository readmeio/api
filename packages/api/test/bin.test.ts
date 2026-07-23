import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

interface BinResult {
  code: number | null;
  stderr: string;
  stdout: string;
}

const packageDir = fileURLToPath(new URL('..', import.meta.url));

let stubDir: string;

/**
 * Runs `src/bin.ts` through `tsx` with a stubbed `npx` at the front of the `PATH`, so dispatched
 * invocations hit the stub (which echoes its arguments and exits 7) instead of the network.
 */
function runBin(args: string[]): Promise<BinResult> {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['--import', 'tsx', path.join(packageDir, 'src', 'bin.ts'), ...args], {
      cwd: packageDir,
      env: { ...process.env, PATH: `${stubDir}${path.delimiter}${process.env.PATH}` },
    });

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', chunk => {
      stdout += chunk;
    });
    child.stderr.on('data', chunk => {
      stderr += chunk;
    });

    child.on('error', reject);
    child.on('close', code => {
      resolve({ code, stderr, stdout });
    });
  });
}

describe.skipIf(process.platform === 'win32')('bin routing', () => {
  beforeAll(() => {
    stubDir = fs.mkdtempSync(path.join(os.tmpdir(), 'api-router-stub-'));
    const stub = path.join(stubDir, 'npx');
    fs.writeFileSync(stub, '#!/bin/sh\necho "npx-stub:$@"\nexit 7\n');
    fs.chmodSync(stub, 0o755);
  });

  afterAll(() => {
    fs.rmSync(stubDir, { force: true, recursive: true });
  });

  it(
    'should dispatch unknown commands to the Restless CLI and forward the exit code',
    { timeout: 60_000 },
    async () => {
      const result = await runBin(['init', '--help']);

      expect(result.stdout).toContain('npx-stub:-y @restlessai/cli@latest init --help');
      expect(result.code).toBe(7);
    },
  );

  it('should not dispatch `--help` and should not mention the Restless CLI in it', { timeout: 60_000 }, async () => {
    const result = await runBin(['--help']);

    expect(result.stdout).toContain('Usage:');
    expect(result.stdout).toContain('install');
    expect(result.stdout.toLowerCase()).not.toContain('restless');
    expect(result.stdout).not.toContain('npx-stub');
    expect(result.code).toBe(0);
  });
});
