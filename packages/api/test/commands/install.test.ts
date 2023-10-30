import type { SpyInstance } from 'vitest';

import { CommanderError } from 'commander';
import prompts from 'prompts';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

import installCmd from '../../src/commands/install.js';
import Storage from '../../src/storage.js';

const cmdError = (msg: string) => new CommanderError(0, '', msg);

const baseCommand = ['api', 'install'];

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

  it('should error out if uri is not passed', () => {
    return expect(installCmd.parseAsync([...baseCommand])).rejects.toStrictEqual(
      cmdError("error: missing required argument 'uri'"),
    );
  });

  it('should error out if invalid uri is passed', () => {
    return expect(installCmd.parseAsync([...baseCommand, 'petstore.json'])).rejects.toThrow(
      /Sorry, we were unable to load an API definition from .*petstore.json. Please either supply a URL or a path on your filesystem./,
    );
  });

  it('should accept valid lang parameter but error out if invalid uri is passed', () => {
    return expect(installCmd.parseAsync([...baseCommand, 'petstore.json', '--lang', 'js'])).rejects.toThrow(
      /Sorry, we were unable to load an API definition from .*petstore.json. Please either supply a URL or a path on your filesystem./,
    );
  });

  it('should error out if invalid lang is passed', () => {
    return expect(installCmd.parseAsync([...baseCommand, '--lang', 'javascript'])).rejects.toStrictEqual(
      cmdError("error: option '-l, --lang <language>' argument 'javascript' is invalid. Allowed choices are js."),
    );
  });

  it('should handle user answering no to package installation confirmation prompt', () => {
    prompts.inject(['petstore', false]);
    return expect(
      installCmd.parseAsync([...baseCommand, '../test-utils/definitions/simple.json']),
    ).rejects.toStrictEqual(new Error('Installation cancelled.'));
  });

  it.todo('should surface generation errors');
  it.todo('should surface file save errors');
  it.todo('should surface package installation errors');
  it.todo('should surface compilation errors');
  it.todo('should successfully generate SDK');
});
