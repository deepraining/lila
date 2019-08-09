export {
  setSetting,
  setSettings,
  getSetting,
  getSettings,
  getAllSettings,
} from './settings';

export {
  registerTask,
  unregisterTask,
  getTask,
  getTasks,
  getAllTasks,
} from './tasks';

export { addCommand, getCommands } from './commands';

export { default as makeConfig } from './make-config';

export { default as runTasks } from './run-tasks';

export { addCmdOption, getCmdOptions } from './cmd-options';

export { makeArgv } from './util';

export { log, info, warn, error, success } from './logger';
