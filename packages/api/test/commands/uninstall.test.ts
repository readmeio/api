import type { SpyInstance } from 'vitest';

import { CommanderError } from 'commander';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

import installCmd from '../../src/commands/uninstall.js';
import Storage from '../../src/storage.js';

const cmdError = (msg: string) => new CommanderError(0, '', msg);

const baseCommand = ['api', 'uninstall'];

describe('install command', () => {
  let stdout: string[];
  let stderr: string[];
  let consoleLogSpy: SpyInstance;

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

  it('should error out if identifier is not passed', () => {
    return expect(installCmd.parseAsync([...baseCommand])).rejects.toStrictEqual(
      cmdError("error: missing required argument 'identifier'"),
    );
  });

  it('should error out if invalid identifier is passed', () => {
    return expect(installCmd.parseAsync([...baseCommand, 'non-existent-identifier'])).rejects.toStrictEqual(
      new Error(
        'You do not appear to have non-existent-identifier installed. You can run `npx api list` to see what SDKs are present.',
      ),
    );
  });

  it.todo('should successfully uninstall SDK');
  it.todo('should successfully bypass all prompts with --yes option');
});
