import path from 'path';
import minimist from 'minimist';
import commander from 'commander';

const pkg = require('../package.json');

const argv = minimist(process.argv.slice(2));
const { join } = path;

// in the first place
commander.option('--core [core]', 'custom lila-core path');

let corePath;
let corePkg;
let core;

if (argv.core) corePath = argv.core;
else {
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
    const resolvedCore = require.resolve('lila-core', {
      paths: [process.cwd()],
    });
    corePath = join(
      resolvedCore.split('node_modules')[0],
      'node_modules/lila-core'
    );
  } catch (e) {
    // eslint-disable no-empty
  }
}

if (corePath) {
  corePkg = require(join(corePath, 'package.json')); // eslint-disable-line
  core = require(join(corePath, corePkg.main)); // eslint-disable-line
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
