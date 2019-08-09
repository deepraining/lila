/* eslint-disable no-console */
import chalk from 'chalk';

const makeArgs = (args, color) =>
  args.map(arg => (typeof arg === 'string' ? chalk[color](arg) : arg));

export const log = (...args) => {
  if (!args.length) return;

  const [first, ...lastArgs] = args;

  // plain log
  if (first === false) {
    console.log(...lastArgs);
    return;
  }

  // custom color
  if (typeof first === 'string' && chalk[first]) {
    console.log(...makeArgs(lastArgs, first));
    return;
  }

  // default color
  console.log(...args);
};

export const info = (...args) => {
  if (!args.length) return;

  const [first, ...lastArgs] = args;

  // plain info
  if (first === false) {
    console.info(...lastArgs);
    return;
  }

  // custom color
  if (typeof first === 'string' && chalk[first]) {
    console.info(...makeArgs(lastArgs, first));
    return;
  }

  // default color
  console.info(...makeArgs(args, 'blueBright'));
};

export const warn = (...args) => {
  if (!args.length) return;

  const [first, ...lastArgs] = args;

  // plain warn
  if (first === false) {
    console.warn(...lastArgs);
    return;
  }

  // custom color
  if (typeof first === 'string' && chalk[first]) {
    console.warn(...makeArgs(lastArgs, first));
    return;
  }

  // default color
  console.warn(...makeArgs(args, 'yellowBright'));
};

export const error = (...args) => {
  if (!args.length) return;

  const [first, ...lastArgs] = args;

  // plain error
  if (first === false) {
    console.error(...lastArgs);
    return;
  }

  // custom color
  if (typeof first === 'string' && chalk[first]) {
    console.error(...makeArgs(lastArgs, first));
    return;
  }

  // default color
  console.error(...makeArgs(args, 'redBright'));
};

export const success = (...args) => {
  if (!args.length) return;

  const [first, ...lastArgs] = args;

  // plain log
  if (first === false) {
    console.log(...lastArgs);
    return;
  }

  // custom color
  if (typeof first === 'string' && chalk[first]) {
    console.log(...makeArgs(lastArgs, first));
    return;
  }

  // default color
  console.log(...makeArgs(args, 'greenBright'));
};
