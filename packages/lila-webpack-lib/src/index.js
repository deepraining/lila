import path from 'path';
import start from './start';
import task from './task';

const { join } = path;

export default lila => {
  const {
    addCommand,
    makeArgv,
    registerTask,
    runTasks,
    getSettings,
    getCmdOptions,
  } = lila;
  const [root, srcDir, getEntries] = getSettings(['root', 'src', 'getEntries']);

  const srcPath = join(root, srcDir);

  // add start command
  addCommand(commander => {
    const command = commander
      .command('start <entry>')
      .description('start a local server to develop an entry');

    getCmdOptions('start').forEach(value => {
      command.option(...value);
    });

    command.action((entry, options) => {
      const argv = makeArgv(options);

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
        entries: getEntries ? getEntries(realEntries, srcPath) : realEntries,
        argv: makeArgv(options),
        cmd: 'build',
      });
    });
  });

  // register @lila/webpack task
  registerTask('@lila/webpack', task);
};
