import fs from 'fs';
import path from 'path';
import * as lila from './lila';

export default lila;

const entryPath = path.join(process.cwd(), 'lila.js');

if (!fs.existsSync(entryPath)) throw new Error(`file not found ${entryPath}`);

const entry = require(entryPath); // eslint-disable-line

if (typeof entry !== 'function')
  throw new Error('lila.js should export a function');

const makeConfig = entry(lila);

console.log(makeConfig);
