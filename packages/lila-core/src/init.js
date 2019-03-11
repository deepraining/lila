import fs from 'fs';
import path from 'path';

import { root, argv } from './app';
import { warn } from './logger';
import { tryDefault } from './util';

const { join } = path;
const { existsSync } = fs;

let initFile;
if (argv.init) initFile = argv.init;
else if (existsSync(join(root, 'lila.init.js'))) initFile = 'lila.init.js';
else initFile = 'lila.js';

const initPath = join(root, initFile);
const initPathExists = existsSync(initPath);

// eslint-disable-next-line
const init = tryDefault(initPathExists ? require(initPath) : () => () => ({}));

if (!initPathExists) {
  warn(`
missing ${initFile} file: ${initPath}
use default instead: () => () => ({})
  `);
}

if (typeof init !== 'function')
  throw new Error(`${initFile} should export a function`);

export const initFileName = initFile;

export default init;
