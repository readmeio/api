/* eslint-disable no-console */
import type { Options as OraOptions } from 'ora';

import chalk from 'chalk';

export default function logger(log: string, error?: boolean) {
  if (error) {
    console.error(chalk.red(log));
  } else {
    console.log(log);
  }
}

export function oraOptions() {
  // Disables spinner in tests so it doesn't pollute test output
  const opts: OraOptions = { isSilent: process.env.NODE_ENV === 'test' };

  return opts;
}
