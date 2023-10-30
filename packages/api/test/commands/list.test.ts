import type { SpyInstance } from 'vitest';

import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

import installCmd from '../../src/commands/list.js';
import Storage from '../../src/storage.js';

const baseCommand = ['api', 'list'];

describe('install command', () => {
  let stdout: string[];
  let stderr: string[];
  let consoleLogSpy: SpyInstance;

  const getCommandOutput = () => {
    return [consoleLogSpy.mock.calls.join('\n\n')].filter(Boolean).join('\n\n');
  };

  beforeEach(() => {
    stdout = [];
    stderr = [];
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    installCmd.exitOverride();
    installCmd.configureOutput({
      writeOut: str => stdout.push(str),
      writeErr: str => stderr.push(str),
    });
    Storage.setStorageDir(uniqueTempDir());
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    Storage.reset();
  });

  it('should return placeholder message if no SDKs are installed', async () => {
    await expect(installCmd.parseAsync([...baseCommand])).resolves.toBeDefined();

    expect(getCommandOutput()).toBe('😔 You do not have any SDKs installed.');
  });

  it.todo('should list installed SDKs');
});
