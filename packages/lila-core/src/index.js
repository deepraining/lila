import app from './app';
import * as lila from './lila';
import { registerConfigGenerator } from './make-config';
import entry from './entry';

app.lila = lila;

// below code should be executed after register built-in tasks
const configGenerator = entry(lila);

if (typeof configGenerator !== 'function')
  throw new Error('lila.js exported function should return another function');

registerConfigGenerator(configGenerator);

export default lila;
