import path from 'path';
import dev from './dev';
import start from './start';
import analyze from './analyze';
import task from './task';
import { getAllEntries } from './util';

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
  const [cwd, srcDir, getEntries, servePath] = getSettings([
    'cwd',
    'src',
    'getEntries',
    'servePath',
  ]);
  const srcPath = join(cwd, srcDir);

  // add dev command
  addCommand(commander => {
    const command = commander
      .command('dev <entry>')
      .description('start a local server to develop an entry');

    getCmdOptions('dev').forEach(value => {
      command.option(...value);
    });

    command.action((entry, options) => {
      const argv = makeArgv(options);

      dev({ entry, argv, lila });
    });
  });

  // add build command
  addCommand(commander => {
    const command = commander
      .command('build <entry> [extraEntries...]')
      .description('pack source codes to production bundles');

    getCmdOptions('build').forEach(value => {
      command.option(...value);
    });

    command.action((entry, extraEntries, options) => {
      const entries = [entry, ...extraEntries];
      runTasks({
        entries: getEntries
          ? getAllEntries({ entries, getEntries, srcPath })
          : entries,
        argv: makeArgv(options),
        cmd: 'build',
      });
    });
  });

  // add sync command
  addCommand(commander => {
    const command = commander
      .command('sync <entry> [extraEntries...]')
      .description('make production bundles, then sync to remote servers');

    getCmdOptions('sync').forEach(value => {
      command.option(...value);
    });

    command.action((entry, extraEntries, options) => {
      const entries = [entry, ...extraEntries];
      runTasks({
        entries: getEntries
          ? getAllEntries({ entries, getEntries, srcPath })
          : entries,
        argv: makeArgv(options),
        cmd: 'sync',
      });
    });
  });

  // add start command
  addCommand(commander => {
    const command = commander
      .command('start <entry>')
      .description(
        'make production bundles, then start a local server to preview'
      );

    getCmdOptions('start').forEach(value => {
      command.option(...value);
    });

    command.action((entry, options) => {
      const argv = makeArgv(options);
      runTasks(
        {
          entries: [entry],
          argv,
          cmd: 'start',
        },
        () => {
          start({ entry, argv, lila });
        }
      );
    });
  });

  // add analyze command
  addCommand(commander => {
    const command = commander
      .command('analyze <entry>')
      .description('visualize size of webpack output files');

    getCmdOptions('analyze').forEach(value => {
      command.option(...value);
    });

    command.action((entry, options) => {
      const argv = makeArgv(options);

      analyze({ entry, argv, lila });
    });
  });

  // add serve command
  addCommand(commander => {
    const command = commander
      .command('serve <entry>')
      .description(
        'simulate a backend environment to start a local server to develop an entry'
      );

    getCmdOptions('serve').forEach(value => {
      command.option(...value);
    });

    command.action((entry, options) => {
      const argv = makeArgv(options);

      if (!servePath) throw new Error("setting [servePath] hasn't been set");

      dev({ entry, argv, lila, serve: !0, servePath });
    });
  });

  // register @lila/webpack task
  registerTask('@lila/webpack', task);
};
