import path from 'path';
import minimist from 'minimist';
import commander from 'commander';

import pkg from '../package.json';

const argv = minimist(process.argv.slice(2));
const { join } = path;

// in the first place
commander.option('--core [core]', 'custom lila-core path');

let corePkg;
let core;

if (argv.core) {
  corePkg = require(join(argv.core, 'package.json')); // eslint-disable-line
  core = require(join(argv.core, corePkg.main)); // eslint-disable-line
} else {
  try {
    /**
     * resolved core file path
     *
     * @example
     *
     * ```
     * path/to/project/node_modules/_lila-core@0.5.0@lila-core/lib/index.js
     * ```
     *
     * @type {String}
     */
    const resolvedCore = require.resolve('lila-core');
    const corePath = join(
      resolvedCore.split('node_modules')[0],
      'node_modules/lila-core'
    );

    corePkg = require(join(corePath, 'package.json')); // eslint-disable-line
    core = require(join(argv.core, corePkg.main)); // eslint-disable-line
  } catch (e) {
    // eslint-disable no-empty
  }
}

if (core) {
  const { getCommands } = core;
  const commands = getCommands();

  if (commands && commands.length) {
    commands.forEach(cmd => {
      cmd(commander);
    });
  }
}

// version
commander.version(
  pkg.version + (corePkg ? ` (lila-core ${corePkg.version})` : '')
);

commander.parse(process.argv);
