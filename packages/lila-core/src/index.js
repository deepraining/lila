import app from './app';
import * as lila from './lila';
import { registerTask } from './tasks';
import { addCommand } from './commands';
import { registerConfigGenerator } from './make-config';
import entry from './entry';
import {
  correctHtml,
  replaceHtml,
  insertHtml,
  convertHtml,
  renameHtml,
  syncAll,
  saveCache,
  syncHtml,
} from './built-in-tasks';
import { buildCmd, syncCmd } from './built-in-commands';

registerTask('@lila/correct-html', correctHtml);
registerTask('@lila/replace-html', replaceHtml);
registerTask('@lila/insert-html', insertHtml);
registerTask('@lila/convert-html', convertHtml);
registerTask('@lila/rename-html', renameHtml);
registerTask('@lila/sync-all', syncAll);
registerTask('@lila/save-cache', saveCache);
registerTask('@lila/sync-html', syncHtml);

addCommand(buildCmd);
addCommand(syncCmd);

app.lila = lila;

// below code should be executed after register built-in tasks
const configGenerator = entry(lila);

if (typeof configGenerator !== 'function')
  throw new Error('lila.js exported function should return another function');

registerConfigGenerator(configGenerator);

export default lila;
