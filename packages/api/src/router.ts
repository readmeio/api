import { spawn } from 'node:child_process';

/**
 * Commands that are dispatched to the Restless CLI. Anything else is handled by this package's own
 * Commander program.
 */
const RESTLESS_COMMANDS = new Set(['debug']);

const HELP_AND_VERSION_FLAGS = new Set(['--help', '-h', '--version', '-V']);

export type Route = 'codegen' | 'restless';

/**
 * Determine whether an invocation should be dispatched to the separately published Restless CLI
 * (`restless`) or handled by our own Commander program (`codegen`).
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
      return RESTLESS_COMMANDS.has(arg) ? 'restless' : 'codegen';
    }
  }

  // No command at all — Commander prints its usage.
  return 'codegen';
}

/**
 * Re-run the invocation against the Restless CLI (published on npm as `restless`) in a child
 * process, forwarding its exit code and any termination signals. The Restless CLI is intentionally
 * **not** a dependency of this package: `npx -y` fetches (and caches) it on demand, keeping the two
 * fully decoupled.
 *
 * @param args CLI arguments — `process.argv` minus the Node binary and the script path.
 */
export function dispatchToRestlessCli(args: string[]): void {
  const child = spawn('npx', ['-y', 'restless@latest', ...args], {
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
