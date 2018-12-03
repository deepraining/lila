import runTasks from './run-tasks';
import { makeArgv } from './util';
import { getCmdOptions } from './cmd-options';
import { defaultEntry } from '../../../util/constants';

export const rootOption = commander => {
  commander.option('--root [root]', 'custom root path');
  commander.option('--init [init]', 'custom init file');
};

export const run = commander => {
  const cmdOptions = getCmdOptions('run');

  const cmd = commander
    .command('run [entries...]')
    .description('run tasks')
    .allowUnknownOption();

  if (cmdOptions && cmdOptions.length)
    cmdOptions.forEach(option => {
      cmd.option(...option);
    });

  cmd.action((entries, options) => {
    const realEntries = entries.length ? entries : [defaultEntry];

    runTasks({
      entries: realEntries,
      argv: makeArgv(options),
      cmd: 'run',
    });
  });
};

export default {};
