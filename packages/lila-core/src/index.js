import app from './app';
import * as lila from './lila';
import { registerConfigGenerator } from './make-config';
import { addCommand } from './commands';
import { rootOption, run } from './cmd';
import entry from './entry';

app.lila = lila;

addCommand(run);
addCommand(rootOption);

// below code should be executed at last
const configGenerator = entry(lila);

if (typeof configGenerator !== 'function')
  throw new Error('lila.js exported function should return another function');

registerConfigGenerator(configGenerator);

export default lila;
