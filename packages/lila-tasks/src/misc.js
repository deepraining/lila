import chalk from 'chalk';
import child from 'child_process';
import { log, error } from '../../../util/logger';

const { red } = chalk;
const { spawn } = child;

/**
 * execute shell scripts
 *
 * @example
 *
 * ```
 * ['@lila/shell', {command, args, options}]
 * ```
 *
 * @param args
 * @returns {Function}
 */
export const shell = ({ args }) => cb => {
  const { command, args: shellArgs, options } = (args && args[0]) || {};

  if (!command) throw new Error('command not configured');

  const pro = spawn(command, shellArgs, options);

  pro.stdout.on('data', data => {
    log(data);
  });

  pro.stderr.on('data', data => {
    error(red(data));
  });

  pro.on('close', code => {
    if (code < 1) cb();
    else process.exit(1);
  });
};

export default {};
