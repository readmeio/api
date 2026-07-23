import type * as childProcess from 'node:child_process';
import type { MockInstance } from 'vitest';

import { EventEmitter } from 'node:events';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { classifyInvocation, dispatchToRestlessCli } from '../src/router.js';

const spawn = vi.hoisted(() =>
  vi.fn<(command: string, args: string[], options: Record<string, unknown>) => FakeChildProcess>(),
);

vi.mock(import('node:child_process'), () => ({ spawn }) as unknown as typeof childProcess);

class FakeChildProcess extends EventEmitter {
  kill = vi.fn<(signal?: NodeJS.Signals) => boolean>();
}

describe('#classifyInvocation', () => {
  it.each([
    ['install', ['install', 'https://example.com/petstore.json']],
    ['list', ['list']],
    ['uninstall', ['uninstall', 'petstore']],
    ['install --help', ['install', '--help']],
  ])('should classify `%s` as a codegen command', (_, args) => {
    expect(classifyInvocation(args)).toBe('codegen');
  });

  it.each([
    ['(empty)', []],
    ['--help', ['--help']],
    ['-h', ['-h']],
    ['--version', ['--version']],
    ['-V', ['-V']],
    ['--help init', ['--help', 'init']],
  ])('should classify `%s` as a codegen invocation for Commander to handle', (_, args) => {
    expect(classifyInvocation(args)).toBe('codegen');
  });

  it.each([
    ['init', ['init']],
    ['reset', ['reset']],
    ['debug', ['debug', 'req_12345']],
    ['skill', ['skill', 'https://example.com/petstore.json']],
    ['some-unknown-cmd', ['some-unknown-cmd']],
    ['init --help', ['init', '--help']],
    ['--yes init', ['--yes', 'init']],
  ])('should classify `%s` as a Restless CLI command', (_, args) => {
    expect(classifyInvocation(args)).toBe('restless');
  });
});

describe('#dispatchToRestlessCli', () => {
  let child: FakeChildProcess;
  let exitSpy: MockInstance;
  let stderrSpy: MockInstance;

  beforeEach(() => {
    child = new FakeChildProcess();
    spawn.mockReturnValue(child);
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    // Emitting `close` unregisters any signal listeners that `dispatchToRestlessCli` left on
    // `process` so they don't leak into other tests.
    child.emit('close', 0, null);
    vi.restoreAllMocks();
    spawn.mockReset();
  });

  it('should spawn `npx` without writing anything to stderr itself', () => {
    dispatchToRestlessCli(['init']);

    expect(stderrSpy).not.toHaveBeenCalled();
    expect(spawn).toHaveBeenCalledWith(
      'npx',
      ['-y', '@restlessai/cli@latest', 'init'],
      expect.objectContaining({ stdio: 'inherit' }),
    );
  });

  it('should forward all original arguments, flags included', () => {
    dispatchToRestlessCli(['debug', 'req_12345', '--verbose']);

    expect(spawn).toHaveBeenCalledWith(
      'npx',
      ['-y', '@restlessai/cli@latest', 'debug', 'req_12345', '--verbose'],
      expect.objectContaining({ stdio: 'inherit' }),
    );
  });

  it("should exit with the child's exit code", () => {
    dispatchToRestlessCli(['init']);

    child.emit('close', 3, null);

    expect(exitSpy).toHaveBeenCalledWith(3);
  });

  it('should forward SIGINT and SIGTERM to the child', () => {
    const sigintListeners = process.listeners('SIGINT');
    const sigtermListeners = process.listeners('SIGTERM');

    dispatchToRestlessCli(['init']);

    const forwardSigint = process.listeners('SIGINT').find(listener => !sigintListeners.includes(listener));
    const forwardSigterm = process.listeners('SIGTERM').find(listener => !sigtermListeners.includes(listener));

    forwardSigint?.('SIGINT');
    expect(child.kill).toHaveBeenCalledWith('SIGINT');

    forwardSigterm?.('SIGTERM');
    expect(child.kill).toHaveBeenCalledWith('SIGTERM');
  });

  it('should unregister its signal listeners once the child exits', () => {
    const sigintListeners = process.listenerCount('SIGINT');
    const sigtermListeners = process.listenerCount('SIGTERM');

    dispatchToRestlessCli(['init']);

    expect(process.listenerCount('SIGINT')).toBe(sigintListeners + 1);
    expect(process.listenerCount('SIGTERM')).toBe(sigtermListeners + 1);

    child.emit('close', 0, null);

    expect(process.listenerCount('SIGINT')).toBe(sigintListeners);
    expect(process.listenerCount('SIGTERM')).toBe(sigtermListeners);
  });

  it('should re-raise the signal that killed the child instead of exiting normally', () => {
    const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => true);

    dispatchToRestlessCli(['init']);

    child.emit('close', null, 'SIGTERM');

    expect(killSpy).toHaveBeenCalledWith(process.pid, 'SIGTERM');
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('should exit with code 1 if the child fails to spawn', () => {
    dispatchToRestlessCli(['init']);

    child.emit('error', new Error('spawn npx ENOENT'));

    expect(stderrSpy).toHaveBeenCalledWith('spawn npx ENOENT\n');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
