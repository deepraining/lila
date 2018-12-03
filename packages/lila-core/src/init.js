import fs from 'fs';
import path from 'path';

import { root, initFile } from './app';
import { warn } from './logger';

const { join } = path;
const { existsSync } = fs;

const initPath = join(root, initFile);
const initPathExists = existsSync(initPath);

const init = initPathExists ? require(initPath) : () => () => ({}); // eslint-disable-line

if (!initPathExists) {
  warn(`
missing ${initFile} file: ${initPath}
use default instead: () => () => ({})
  `);
}

if (typeof init !== 'function')
  throw new Error(`${initFile} should export a function`);

export default init;
