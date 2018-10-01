import forEach from 'lodash/forEach';
import pureArgv from '../util/pure-argv';
import build from './build-cmd';
import { getBuildCmdOptions } from './build-cmd-options';
import sync from './sync-cmd';
import { getSyncCmdOptions } from './sync-cmd-options';

export const buildCmd = commander => {
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
    build([page, ...extraPages], pureArgv(options));
  });
};

export const syncCmd = commander => {
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
    sync([page, ...extraPages], pureArgv(options));
  });
};
