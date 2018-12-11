import './register';
import app from './app';
import * as lila from './lila';
import { registerConfigGenerator } from './make-config';
import { addCommand } from './commands';
import { rootOption, run } from './cmd';
import init, { initFileName } from './init';

app.lila = lila;

addCommand(run);
addCommand(rootOption);

// below code should be executed at last
const configGenerator = init(lila);

if (typeof configGenerator !== 'function')
  throw new Error(
    `${initFileName} exported function should return another function`
  );

registerConfigGenerator(configGenerator);

export default lila;
