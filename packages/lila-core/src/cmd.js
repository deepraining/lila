import runTasks from './run-tasks';
import { makeArgv } from './util';
import { getCmdOptions } from './cmd-options';

export const run = commander => {
  const cmdOptions = getCmdOptions('run');

  const cmd = commander
    .command('run <entry> [extraEntries...]')
    .description('run tasks')
    .allowUnknownOption();

  if (cmdOptions && cmdOptions.length)
    cmdOptions.forEach(option => {
      cmd.option(...option);
    });

  cmd.action((entry, extraEntries, options) => {
    runTasks({
      entries: [entry, ...extraEntries],
      argv: makeArgv(options),
      cmd: 'run',
    });
  });
};

export default {};
