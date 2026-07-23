import { spawn } from 'node:child_process';

/**
 * Commands that are handled by this package's own Commander program. Anything else is dispatched
 * to the Restless CLI.
 */
const CODEGEN_COMMANDS = new Set(['install', 'list', 'uninstall']);

const HELP_AND_VERSION_FLAGS = new Set(['--help', '-h', '--version', '-V']);

export type Route = 'codegen' | 'restless';

/**
 * Determine whether an invocation should be handled by our own Commander program (`codegen`) or
 * dispatched to the separately published Restless CLI.
 *
 * @param args CLI arguments — `process.argv` minus the Node binary and the script path.
 */
export function classifyInvocation(args: string[]): Route {
  for (const arg of args) {
    // A help or version flag ahead of any command (`api --help`, `api -V`) is ours.
    if (HELP_AND_VERSION_FLAGS.has(arg)) {
      return 'codegen';
    }

    // The first non-flag argument is the command.
    if (!arg.startsWith('-')) {
      return CODEGEN_COMMANDS.has(arg) ? 'codegen' : 'restless';
    }
  }

  // No command at all — Commander prints its usage.
  return 'codegen';
}

/**
 * Re-run the invocation against the Restless CLI (published on npm as `@restlessai/cli`) in a
 * child process, forwarding its exit code and any termination signals. The Restless CLI is
 * intentionally **not** a dependency of this package: `npx -y` fetches (and caches) it on
 * demand, keeping the two fully decoupled.
 *
 * @param args CLI arguments — `process.argv` minus the Node binary and the script path.
 */
export function dispatchToRestlessCli(args: string[]): void {
  const child = spawn('npx', ['-y', '@restlessai/cli@latest', ...args], {
    // `npx` is a `.cmd` shim on Windows and can't be spawned directly there.
    shell: process.platform === 'win32',
    stdio: 'inherit',
  });

  const forwardSignal = (signal: NodeJS.Signals) => {
    child.kill(signal);
  };

  // Handling these ourselves keeps the parent alive until the child has finished shutting down.
  process.on('SIGINT', forwardSignal);
  process.on('SIGTERM', forwardSignal);

  child.on('error', err => {
    process.stderr.write(`${err.message}\n`);
    process.exit(1);
  });

  child.on('close', (code, signal) => {
    process.off('SIGINT', forwardSignal);
    process.off('SIGTERM', forwardSignal);

    if (signal) {
      // The child was killed by a signal — re-raise it so our own exit status reflects that.
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}
