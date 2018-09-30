import { error } from '../../../util/logger';

export const missingGit = (exit = true, code = 1) => {
  error(`
  error: missing git
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
