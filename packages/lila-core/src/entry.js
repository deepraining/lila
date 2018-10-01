import fs from 'fs';
import path from 'path';

const { join } = path;
const { existsSync } = fs;

const entryPath = join(process.cwd(), 'lila.js');

if (!existsSync(entryPath)) throw new Error(`file not found ${entryPath}`);

const entry = require(entryPath); // eslint-disable-line

if (typeof entry !== 'function')
  throw new Error('lila.js should export a function');

export default entry;
