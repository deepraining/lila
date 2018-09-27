import forEach from 'lodash/forEach';
import commander from 'commander';

import pkg from '../package.json';
import { core, corePkg } from './local';

// version
commander.version(
  pkg.version + (corePkg ? ` (lila-core ${corePkg.version})` : '')
);

// build cmd
const buildCmd = commander
  .command('build <page>')
  .description('pack source codes to production bundles');

if (core) {
  const { getBuildCmdOptions } = core;
  const buildOptions = getBuildCmdOptions();

  if (buildOptions && buildOptions.length) {
    forEach(buildOptions, value => {
      buildCmd.option(...value);
    });
  }
}

buildCmd.action((page, options) => {
  // todo
  console.log(page, options);
});

// sync cmd
const syncCmd = commander
  .command('sync <page>')
  .description('make production bundles, then sync to remote servers');

if (core) {
  const { getSyncCmdOptions } = core;
  const syncOptions = getSyncCmdOptions();

  if (syncOptions && syncOptions.length) {
    forEach(syncOptions, value => {
      syncCmd.option(...value);
    });
  }
}

syncCmd.action((page, options) => {
  // todo
  console.log(page, options);
});

if (core) {
  const { getCommands } = core;
  const registeredCommands = getCommands();

  if (registeredCommands && registeredCommands.length) {
    registeredCommands.forEach(cmd => {
      cmd(commander);
    });
  }
}

commander.parse(process.argv);
