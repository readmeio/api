import type { SpyInstance } from 'vitest';

import { loadSpec } from '@api/test-utils';
import { CommanderError } from 'commander';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

import { SupportedLanguages } from '../../src/codegen/factory.js';
import installCmd from '../../src/commands/list.js';
import * as packageInfo from '../../src/packageInfo.js';
import Storage from '../../src/storage.js';

const baseCommand = ['api', 'list'];

const cmdError = (msg: string) => new CommanderError(0, '', msg);

describe('install command', () => {
  let stdout: string[];
  let stderr: string[];
  let consoleLogSpy: SpyInstance;
  let packageInfoSpy: SpyInstance;

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
    // @ts-expect-error deliberately setting this const to another value
    packageInfoSpy = vi.spyOn(packageInfo, 'PACKAGE_VERSION', 'get').mockReturnValue('7.0.0-mock');
    Storage.setStorageDir(uniqueTempDir());
    vi.setSystemTime(new Date('2023-10-25'));
  });

  afterEach(() => {
    consoleLogSpy.mockReset();
    fetchMock.restore();
    packageInfoSpy.mockReset();
    Storage.reset();
    vi.useRealTimers();
  });

  it('should return placeholder message if no SDKs are installed', async () => {
    await expect(installCmd.parseAsync([...baseCommand])).resolves.toBeDefined();

    expect(getCommandOutput()).toBe('😔 You do not have any SDKs installed.');
  });

  it('should list installed SDKs', async () => {
    const petstoreSimple = await loadSpec('@readme/oas-examples/3.0/json/petstore-simple.json');
    fetchMock.get('https://dash.readme.com/api/v1/api-registry/n6kvf10vakpemvplx', petstoreSimple);

    const source = '@petstore/v1.0#n6kvf10vakpemvplx';
    const storage = new Storage(source, SupportedLanguages.JS, 'petstore');

    await storage.load();

    await expect(installCmd.parseAsync([...baseCommand])).resolves.toBeDefined();

    expect(getCommandOutput()).toMatchSnapshot();
  });

  it('should print help screen', async () => {
    await expect(installCmd.parseAsync([...baseCommand, '--help'])).rejects.toStrictEqual(cmdError('(outputHelp)'));

    expect(stdout.join('\n')).toMatchSnapshot();
  });
});
