/* eslint-disable no-console */
import chalk from 'chalk';

export default function logger(log: string, error?: boolean) {
  if (error) {
    console.error(chalk.red(log));
  } else {
    console.log(log);
  }
}
