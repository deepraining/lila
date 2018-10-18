import path from 'path';
import dev from './dev';
import start from './start';
import analyze from './analyze';
import task from './task';
import { getCmdOptions } from './cmd-options';
import { defaultGetPages, defaultServePath } from './defaults';
import { getAllPages } from './util';

export { addCmdOption } from './cmd-options';

const { join } = path;

export default lila => {
  const { addCommand, pureArgv, registerTask, runTasks, getSettings } = lila;
  const [
    cwd,
    srcDir,
    appDir,
    getPages = defaultGetPages,
    servePath = defaultServePath,
  ] = getSettings(['cwd', 'srcDir', 'appDir', 'getPages', 'servePath']);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);

  // add dev command
  addCommand(commander => {
    const command = commander
      .command('dev <page>')
      .description('start a local server to develop a page');

    getCmdOptions('dev').forEach(value => {
      command.option(...value);
    });

    command.action((page, options) => {
      const argv = pureArgv(options);

      dev({ page, argv, lila });
    });
  });

  // add build command
  addCommand(commander => {
    const command = commander
      .command('build <page> [extraPages...]')
      .description('pack source codes to production bundles');

    getCmdOptions('build').forEach(value => {
      command.option(...value);
    });

    command.action((page, extraPages, options) => {
      runTasks({
        pages: getAllPages({
          pages: [page, ...extraPages],
          getPages,
          srcPath: realSrcDir,
        }),
        argv: pureArgv(options),
        cmd: 'build',
      });
    });
  });

  // add sync command
  addCommand(commander => {
    const command = commander
      .command('sync <page> [extraPages...]')
      .description('make production bundles, then sync to remote servers');

    getCmdOptions('sync').forEach(value => {
      command.option(...value);
    });

    command.action((page, extraPages, options) => {
      runTasks({
        pages: getAllPages({
          pages: [page, ...extraPages],
          getPages,
          srcPath: realSrcDir,
        }),
        argv: pureArgv(options),
        cmd: 'sync',
      });
    });
  });

  // add start command
  addCommand(commander => {
    const command = commander
      .command('start <page>')
      .description(
        'make production bundles, then start a local server to preview'
      );

    getCmdOptions('start').forEach(value => {
      command.option(...value);
    });

    command.action((page, options) => {
      const argv = pureArgv(options);
      runTasks(
        {
          pages: [page],
          argv,
          cmd: 'start',
        },
        () => {
          start({ page, argv, lila });
        }
      );
    });
  });

  // add analyze command
  addCommand(commander => {
    const command = commander
      .command('analyze <page>')
      .description('visualize size of webpack output files');

    getCmdOptions('analyze').forEach(value => {
      command.option(...value);
    });

    command.action((page, options) => {
      const argv = pureArgv(options);

      analyze({ page, argv, lila });
    });
  });

  // add serve command
  addCommand(commander => {
    const command = commander
      .command('serve <page>')
      .description(
        'simulate a backend environment to start a local server to develop a page'
      );

    getCmdOptions('serve').forEach(value => {
      command.option(...value);
    });

    command.action((page, options) => {
      const argv = pureArgv(options);

      dev({ page, argv, lila, serve: !0, servePath });
    });
  });

  // register @lila/webpack task
  registerTask('@lila/webpack', task);
};
