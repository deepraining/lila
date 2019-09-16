import fs from 'fs';
import path from 'path';

import { root, argv } from './app';
import { warn } from './logger';
import { tryDefault } from '../../../util/index';

const { join } = path;
const { existsSync } = fs;

const initFile = argv.init || 'lila.init.js';

const initPath = join(root, initFile);
const initPathExists = existsSync(initPath);

// eslint-disable-next-line
const init = tryDefault(initPathExists ? require(initPath) : () => () => ({}));

if (!initPathExists) {
  warn(`
Missing ${initFile} file: ${initPath}
Use default instead: () => () => ({})
  `);
}

if (typeof init !== 'function')
  throw new Error(`${initFile} should export a function`);

export { initFile };

export default init;
