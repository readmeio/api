import type { SpyInstance } from 'vitest';

import { loadSpec } from '@api/test-utils';
import { CommanderError } from 'commander';
import fetchMock from 'fetch-mock';
import prompts from 'prompts';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

import { SupportedLanguages } from '../../src/codegen/factory.js';
import * as codegenFactoryModule from '../../src/codegen/factory.js';
import installCmd from '../../src/commands/uninstall.js';
import Storage from '../../src/storage.js';

const baseCommand = ['api', 'uninstall'];

const cmdError = (msg: string) => new CommanderError(0, '', msg);

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
    fetchMock.restore();
    Storage.reset();
    vi.restoreAllMocks();
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

  it('should print help screen', async () => {
    await expect(installCmd.parseAsync([...baseCommand, '--help'])).rejects.toStrictEqual(cmdError('(outputHelp)'));

    expect(stdout.join('\n')).toMatchSnapshot();
  });

  it('should successfully uninstall SDK', async () => {
    prompts.inject([true]);

    const petstoreSimple = await loadSpec('@readme/oas-examples/3.0/json/petstore-simple.json');
    fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

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
    fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

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
