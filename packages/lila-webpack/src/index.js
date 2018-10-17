import path from 'path';
import forEach from 'lodash/forEach';
import dev from './dev';
import start from './start';
import analyze from './analyze';
import task from './task';
import { getCmdOptions } from './cmd-options';
import { defaultGetPages } from './defaults';
import { getAllPages } from './util';

export { addCmdOption } from './cmd-options';

const { join } = path;

export default lila => {
  const { addCommand, pureArgv, registerTask, runTasks, getSettings } = lila;
  const [cwd, srcDir, appDir, getPages = defaultGetPages] = getSettings([
    'cwd',
    'srcDir',
    'appDir',
    'getPages',
  ]);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);

  // add build command
  addCommand(commander => {
    const command = commander
      .command('build <page> [extraPages...]')
      .description('pack source codes to production bundles');

    forEach(getCmdOptions('build'), value => {
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

    forEach(getCmdOptions('sync'), value => {
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

    forEach(getCmdOptions('start'), value => {
      command.option(...value);
    });

    command.action((page, options) => {
      runTasks(
        {
          pages: [page],
          argv: pureArgv(options),
          cmd: 'start',
        },
        () => {
          start();
        }
      );
    });
  });

  // add dev command
  addCommand(commander => {
    const command = commander
      .command('dev <page>')
      .description('start a local server to develop a page');

    forEach(getCmdOptions('dev'), value => {
      command.option(...value);
    });

    command.action((page, options) => {
      const argv = pureArgv(options);

      dev(page, argv, lila);
    });
  });

  // add analyze command
  addCommand(commander => {
    const command = commander
      .command('analyze <page>')
      .description('visualize size of webpack output files');

    forEach(getCmdOptions('analyze'), value => {
      command.option(...value);
    });

    command.action((page, options) => {
      const argv = pureArgv(options);

      analyze(page, argv, lila);
    });
  });

  // todo cmd: serve, start

  // register @lila/webpack task
  registerTask('@lila/webpack', task);
};
