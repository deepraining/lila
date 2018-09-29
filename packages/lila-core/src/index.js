import * as lila from './lila';
import { registerConfigGenerator } from './make-config';
import entry from './entry';

const configGenerator = entry(lila);

if (typeof configGenerator !== 'function')
  throw new Error('lila.js exported function should return a another function');

registerConfigGenerator(entry);

export default lila;
