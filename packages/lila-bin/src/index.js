import path from 'path';
import minimist from 'minimist';
import commander from 'commander';

// this should be dynamically imported, for lerna will modify package.json
const pkg = require('../package.json');

const argv = minimist(process.argv.slice(2));
const { join } = path;

// in the first place
commander.option('--core [core]', 'custom lila-core path');

const cwd = process.cwd();

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
      /**
       * Windows only find lila-core under cwd/node_modules, not cwd
       */
      paths: [cwd, join(cwd, 'node_modules')],
    });
    corePath = join(
      resolvedCore.split('node_modules')[0],
      'node_modules/lila-core'
    );
  } catch (e) {
    // has commands (every command need local lila-core)
    if (argv._.length) {
      console.log('error: local lila-core package not found');
      process.exit(1);
    }
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
