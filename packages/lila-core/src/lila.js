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

export { default as pureArgv } from '../util/pure-argv';

export { addBuildCmdOption, getBuildCmdOptions } from './build-cmd-options';

export { addSyncCmdOption, getSyncCmdOptions } from './sync-cmd-options';
