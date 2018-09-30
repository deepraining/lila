import { error } from '../../../util/logger';

export const missingCore = (exit = true, code = 1) => {
  error(`
  error: missing lila-core
  `);

  if (exit) process.exit(code);
};

// placeholder
export const missing = (exit = true, code = 1) => {
  error(`
  error: missing
  `);

  if (exit) process.exit(code);
};
