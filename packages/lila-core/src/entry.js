import fs from 'fs';
import path from 'path';

const entryPath = path.join(process.cwd(), 'lila.js');

if (!fs.existsSync(entryPath)) throw new Error(`file not found ${entryPath}`);

const entry = require(entryPath); // eslint-disable-line

if (typeof entry !== 'function')
  throw new Error('lila.js should export a function');

export default entry;
