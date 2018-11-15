import path from 'path';
import start from './start';
import task from './task';
import { defaultEntry } from '../../../util/constants';

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
  const [root, srcDir] = getSettings(['root', 'src']);

  const srcPath = join(root, srcDir);

  // add start command
  addCommand(commander => {
    const command = commander
      .command('start <entry>')
      .description('start a local server to develop an entry')
      .allowUnknownOption();

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
      .description('pack source codes to distribution bundles')
      .allowUnknownOption();

    getCmdOptions('build').forEach(value => {
      command.option(...value);
    });

    command.action((entries, options) => {
      const [getEntries] = getSettings(['getEntries']);
      const realEntries = entries.length ? entries : [defaultEntry];

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
