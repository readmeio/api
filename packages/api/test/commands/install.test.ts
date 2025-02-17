import type { MockInstance } from 'vitest';

import path from 'node:path';

import { CommanderError } from 'commander';
import prompts from 'prompts';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

import { SupportedLanguages } from '../../src/codegen/factory.js';
import installCmd from '../../src/commands/install.js';
import Storage from '../../src/storage.js';

const baseCommand = ['api', 'install'];

const cmdError = (opts: { code: string; exitCode: number; message: string }) => {
  return new CommanderError(opts.exitCode, opts.code, opts.message);
};

describe('install command', () => {
  let stdout: string[];
  let stderr: string[];
  let consoleLogSpy: MockInstance<typeof console.log>;

  beforeEach(() => {
    stdout = [];
    stderr = [];

    installCmd.exitOverride();
    installCmd.configureOutput({
      writeOut: str => stdout.push(str),
      writeErr: str => stderr.push(str),
    });

    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    Storage.setStorageDir(uniqueTempDir());
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    Storage.reset();
  });

  it('should error out if uri is not passed', () => {
    return expect(installCmd.parseAsync([...baseCommand])).rejects.toStrictEqual(
      cmdError({
        code: 'commander.missingArgument',
        exitCode: 1,
        message: "error: missing required argument 'uri'",
      }),
    );
  });

  it('should error out if invalid uri is passed', () => {
    return expect(installCmd.parseAsync([...baseCommand, 'petstore.json'])).rejects.toThrow(
      /Sorry, we were unable to load an API definition from .*petstore.json. Please either supply a URL or a path on your filesystem./,
    );
  });

  it('should accept valid lang parameter but error out if invalid uri is passed', () => {
    return expect(
      installCmd.parseAsync([...baseCommand, 'petstore.json', '--lang', SupportedLanguages.JS]),
    ).rejects.toThrow(
      /Sorry, we were unable to load an API definition from .*petstore.json. Please either supply a URL or a path on your filesystem./,
    );
  });

  it('should error out if invalid lang is passed', () => {
    return expect(installCmd.parseAsync([...baseCommand, '--lang', 'javascript'])).rejects.toStrictEqual(
      cmdError({
        code: 'commander.invalidArgument',
        exitCode: 1,
        message: "error: option '-l, --lang <language>' argument 'javascript' is invalid. Allowed choices are js.",
      }),
    );
  });

  it('should handle user answering no to package installation confirmation prompt', () => {
    prompts.inject(['petstore', false]);
    return expect(
      installCmd.parseAsync([...baseCommand, path.join(__dirname, '../../../test-utils/definitions/simple.json')]),
    ).rejects.toStrictEqual(new Error('Installation cancelled.'));
  });

  it('should print help screen', async () => {
    await expect(installCmd.parseAsync([...baseCommand, '--help'])).rejects.toStrictEqual(
      cmdError({
        code: 'commander.helpDisplayed',
        exitCode: 0,
        message: '(outputHelp)',
      }),
    );

    expect(stdout.join('\n')).toMatchSnapshot();
  });

  it.todo('should surface generation errors');
  it.todo('should surface file save errors');
  it.todo('should surface package installation errors');
  it.todo('should surface compilation errors');
  it.todo('should successfully generate SDK');
  it.todo('should successfully bypass all prompts with --yes option');
});
