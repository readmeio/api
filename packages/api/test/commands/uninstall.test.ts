import type { MockInstance } from 'vitest';

import { loadSpec } from '@api/test-utils';
import { CommanderError } from 'commander';
import nock from 'nock';
import prompts from 'prompts';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

import { SupportedLanguages } from '../../src/codegen/factory.js';
import * as codegenFactoryModule from '../../src/codegen/factory.js';
import installCmd from '../../src/commands/uninstall.js';
import Storage from '../../src/storage.js';

const baseCommand = ['api', 'uninstall'];

const cmdError = (opts: { code: string; exitCode: number; message: string }) => {
  return new CommanderError(opts.exitCode, opts.code, opts.message);
};

describe('install command', () => {
  let stdout: string[];
  let stderr: string[];
  let consoleLogSpy: MockInstance<typeof console.log>;

  const getCommandOutput = () => {
    return [consoleLogSpy.mock.calls.join('\n\n')].filter(Boolean).join('\n\n');
  };

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
    Storage.reset();
    vi.restoreAllMocks();
  });

  it('should error out if identifier is not passed', () => {
    return expect(installCmd.parseAsync([...baseCommand])).rejects.toStrictEqual(
      cmdError({
        code: 'commander.missingArgument',
        exitCode: 1,
        message: "error: missing required argument 'identifier'",
      }),
    );
  });

  it('should error out if invalid identifier is passed', () => {
    return expect(installCmd.parseAsync([...baseCommand, 'non-existent-identifier'])).rejects.toStrictEqual(
      new Error(
        'You do not appear to have non-existent-identifier installed. You can run `npx api list` to see what SDKs are present.',
      ),
    );
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

  it('should successfully uninstall SDK', async () => {
    prompts.inject([true]);

    const petstoreSimple = await loadSpec('@readme/oas-examples/3.0/json/petstore-simple.json');
    nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

    const source = '@petstore/v1.0#n6kvf10vakpemvplx';
    const identifier = 'petstore-to-be-uninstalled';
    const storage = new Storage(source, SupportedLanguages.JS, identifier);

    await storage.load();

    expect(Storage.getLockfile().apis).toHaveLength(1);

    const uninstallSpy = vi.spyOn(codegenFactoryModule, 'uninstallerFactory').mockResolvedValue();

    await expect(installCmd.parseAsync([...baseCommand, identifier])).resolves.toBeDefined();
    expect(uninstallSpy).toHaveBeenCalledTimes(1);
    expect(getCommandOutput()).toBe('🚀 All done!');
    expect(Storage.getLockfile().apis).toHaveLength(0);
  });

  it('should uninstall SDK and bypass prompt with --yes option', async () => {
    const petstoreSimple = await loadSpec('@readme/oas-examples/3.0/json/petstore-simple.json');
    nock('https://dash.readme.com').get('/api/v1/api-registry/n6kvf10vakpemvplx').reply(200, petstoreSimple);

    const source = '@petstore/v1.0#n6kvf10vakpemvplx';
    const identifier = 'petstore-to-be-uninstalled';
    const storage = new Storage(source, SupportedLanguages.JS, identifier);

    await storage.load();

    expect(Storage.getLockfile().apis).toHaveLength(1);

    const uninstallSpy = vi.spyOn(codegenFactoryModule, 'uninstallerFactory').mockResolvedValue();

    await expect(installCmd.parseAsync([...baseCommand, identifier, '--yes'])).resolves.toBeDefined();
    expect(uninstallSpy).toHaveBeenCalledTimes(1);
    expect(getCommandOutput()).toBe('🚀 All done!');
    expect(Storage.getLockfile().apis).toHaveLength(0);
  });
});
