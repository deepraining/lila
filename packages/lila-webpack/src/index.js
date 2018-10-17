import forEach from 'lodash/forEach';
import dev from './dev';
import analyze from './analyze';
import task from './task';
import { getBuildCmdOptions } from './build-cmd-options';
import { getSyncCmdOptions } from './sync-cmd-options';

export { addBuildCmdOption } from './build-cmd-options';

export { addSyncCmdOption } from './sync-cmd-options';

export default lila => {
  const { addCommand, pureArgv, registerTask, runTasks } = lila;

  // add build command
  addCommand(commander => {
    const buildCommand = commander
      .command('build <page> [extraPages...]')
      .description('pack source codes to production bundles');

    const buildOptions = getBuildCmdOptions();

    if (buildOptions && buildOptions.length) {
      forEach(buildOptions, value => {
        buildCommand.option(...value);
      });
    }

    buildCommand.action((page, extraPages, options) => {
      runTasks([page, ...extraPages], pureArgv(options), 'build');
    });
  });

  // add sync command
  addCommand(commander => {
    const syncCommand = commander
      .command('sync <page> [extraPages...]')
      .description('make production bundles, then sync to remote servers');

    const syncOptions = getSyncCmdOptions();

    if (syncOptions && syncOptions.length) {
      forEach(syncOptions, value => {
        syncCommand.option(...value);
      });
    }

    syncCommand.action((page, extraPages, options) => {
      runTasks([page, ...extraPages], pureArgv(options), 'sync');
    });
  });

  // add dev command
  addCommand(commander => {
    commander
      .command('dev <page>')
      .description('start a local server to develop a page')
      .action((page, options) => {
        const argv = pureArgv(options);

        dev(page, argv, lila);
      });
  });

  // add analyze command
  addCommand(commander => {
    commander
      .command('analyze <page>')
      .description('visualize size of webpack output files')
      .action((page, options) => {
        const argv = pureArgv(options);

        analyze(page, argv, lila);
      });
  });

  // register @lila/webpack task
  registerTask('@lila/webpack', task);
};
