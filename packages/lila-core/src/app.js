import path from 'path';
import minimist from 'minimist';

const { join, isAbsolute } = path;

export const argv = minimist(process.argv.slice(2));

const cwd = process.cwd();
const { root: customRoot = '' } = argv;

export const root = isAbsolute(customRoot) ? customRoot : join(cwd, customRoot);

export const initFile = argv.init || 'lila.js';

export default {
  lila: undefined,
};
