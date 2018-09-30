import forEach from 'lodash/forEach';
import commander from 'commander';

import pkg from '../package.json';
import { lilaCore, lilaCorePkg } from './local';
import { missingCore } from '../util/error';
import pureArgv from '../../../util/pure-argv';

// version
commander.version(
  pkg.version + (lilaCorePkg ? ` (lila-core ${lilaCorePkg.version})` : '')
);

// build cmd
const buildCmd = commander
  .command('build <page> [extraPages...]')
  .description('pack source codes to production bundles');

if (lilaCore) {
  const { getBuildCmdOptions } = lilaCore;
  const buildOptions = getBuildCmdOptions();

  if (buildOptions && buildOptions.length) {
    forEach(buildOptions, value => {
      buildCmd.option(...value);
    });
  }
}

buildCmd.action((page, extraPages, options) => {
  if (!lilaCore) {
    missingCore();
  }

  const { build } = lilaCore;

  build([page, ...extraPages], pureArgv(options));
});

// sync cmd
const syncCmd = commander
  .command('sync <page> [extraPages...]')
  .description('make production bundles, then sync to remote servers');

if (lilaCore) {
  const { getSyncCmdOptions } = lilaCore;
  const syncOptions = getSyncCmdOptions();

  if (syncOptions && syncOptions.length) {
    forEach(syncOptions, value => {
      syncCmd.option(...value);
    });
  }
}

syncCmd.action((page, extraPages, options) => {
  if (!lilaCore) {
    missingCore();
  }

  const { sync } = lilaCore;

  sync([page, ...extraPages], pureArgv(options));
});

if (lilaCore) {
  const { getCommands } = lilaCore;
  const registeredCommands = getCommands();

  if (registeredCommands && registeredCommands.length) {
    registeredCommands.forEach(cmd => {
      cmd(commander);
    });
  }
}

commander.parse(process.argv);
