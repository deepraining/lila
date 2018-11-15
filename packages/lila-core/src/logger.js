/* eslint-disable no-console */
import chalk from 'chalk';

const makeArgs = (args, color) =>
  args.map(arg => (typeof arg === 'string' ? chalk[color](arg) : arg));

export const log = (...args) => {
  console.log(...args);
};
export const info = (...args) => {
  console.info(...makeArgs(args, 'blue'));
};
export const warn = (...args) => {
  console.warn(...makeArgs(args, 'yellow'));
};
export const error = (...args) => {
  console.error(...makeArgs(args, 'red'));
};

export const plainLog = (...args) => {
  console.log(...args);
};
export const plainInfo = (...args) => {
  console.info(...args);
};
export const plainWarn = (...args) => {
  console.warn(...args);
};
export const plainError = (...args) => {
  console.error(...args);
};

export const colorLog = (color, ...args) => {
  console.log(...makeArgs(args, color));
};
export const colorInfo = (color, ...args) => {
  console.info(...makeArgs(args, color));
};
export const colorWarn = (color, ...args) => {
  console.warn(...makeArgs(args, color));
};
export const colorError = (color, ...args) => {
  console.error(...makeArgs(args, color));
};
