import fs from 'fs';
import path from 'path';

import { root } from './app';
import { warn } from './logger';

const { join } = path;
const { existsSync } = fs;

const entryPath = join(root, 'lila.js');
const entryPathExists = existsSync(entryPath);

const entry = entryPathExists ? require(entryPath) : () => () => ({}); // eslint-disable-line

if (!entryPathExists) {
  warn(`
missing lila.js file: ${entryPath}
use default instead: () => () => ({})
  `);
}

if (typeof entry !== 'function')
  throw new Error('lila.js should export a function');

export default entry;
