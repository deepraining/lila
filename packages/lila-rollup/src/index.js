import path from 'path';
import start from './start';
import task from './task';
import { getCmdOptions } from './cmd-options';

export { addCmdOption } from './cmd-options';

const { join } = path;

export default lila => {
  const { addCommand, pureArgv, registerTask, runTasks, getSettings } = lila;
  const [cwd, srcDir, getEntries] = getSettings(['cwd', 'src', 'getEntries']);

  const realSrcDir = join(cwd, srcDir);

  // add start command
  addCommand(commander => {
    const command = commander
      .command('start <entry>')
      .description('start a local server to develop an entry');

    getCmdOptions('start').forEach(value => {
      command.option(...value);
    });

    command.action((entry, options) => {
      const argv = pureArgv(options);

      start({ entry, argv, lila });
    });
  });

  // add build command
  addCommand(commander => {
    const command = commander
      .command('build [entries...]')
      .description('pack source codes to distribution bundles');

    getCmdOptions('build').forEach(value => {
      command.option(...value);
    });

    command.action((entries, options) => {
      const realEntries = entries.length ? entries : ['index'];

      runTasks({
        entries: getEntries ? getEntries(realEntries, realSrcDir) : realEntries,
        argv: pureArgv(options),
        cmd: 'build',
      });
    });
  });

  // register @lila/rollup task
  registerTask('@lila/rollup', task);
};
