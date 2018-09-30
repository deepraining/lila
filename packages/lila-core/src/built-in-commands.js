import forEach from 'lodash/forEach';
import pureArgv from '../util/pure-argv';

export const buildCmdGenerator = lila => commander => {
  // build cmd
  const buildCmd = commander
    .command('build <page> [extraPages...]')
    .description('pack source codes to production bundles');

  const { getBuildCmdOptions } = lila;
  const buildOptions = getBuildCmdOptions();

  if (buildOptions && buildOptions.length) {
    forEach(buildOptions, value => {
      buildCmd.option(...value);
    });
  }

  buildCmd.action((page, extraPages, options) => {
    const { build } = lila;

    build([page, ...extraPages], pureArgv(options));
  });
};

export const syncCmdGenerator = lila => commander => {
  // sync cmd
  const syncCmd = commander
    .command('sync <page> [extraPages...]')
    .description('make production bundles, then sync to remote servers');

  const { getSyncCmdOptions } = lila;
  const syncOptions = getSyncCmdOptions();

  if (syncOptions && syncOptions.length) {
    forEach(syncOptions, value => {
      syncCmd.option(...value);
    });
  }

  syncCmd.action((page, extraPages, options) => {
    const { sync } = lila;

    sync([page, ...extraPages], pureArgv(options));
  });
};
