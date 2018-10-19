import start from './start';
import task from './task';
import { getCmdOptions } from './cmd-options';

export { addCmdOption } from './cmd-options';

export default lila => {
  const { addCommand, pureArgv, registerTask, runTasks, getSetting } = lila;
  const getPages = getSetting('getPages');

  // add start command
  addCommand(commander => {
    const command = commander
      .command('start <page>')
      .description('start a local server to develop a page');

    getCmdOptions('start').forEach(value => {
      command.option(...value);
    });

    command.action((page, options) => {
      const argv = pureArgv(options);

      start({ page, argv, lila });
    });
  });

  // add build command
  addCommand(commander => {
    const command = commander
      .command('build [pages...]')
      .description('pack source codes to distribution bundles');

    getCmdOptions('build').forEach(value => {
      command.option(...value);
    });

    command.action((pages, options) => {
      const realPages = pages.length ? pages : ['index'];

      runTasks({
        pages: getPages ? getPages(realPages) : realPages,
        argv: pureArgv(options),
        cmd: 'build',
      });
    });
  });

  // register @lila/webpack task
  registerTask('@lila/webpack', task);
};
