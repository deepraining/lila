import path from 'path';

const { join } = path;

export const cwd = process.cwd();
export const tmpDir = join(cwd, '.lila');

export default {
  lila: undefined,
};
