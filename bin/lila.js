#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const argv = require('../data/argv');
const pathInfo = require('../data/path_info');
const packageJson = require('../package.json');
const logger = require('../util/logger');
const help = require('../util/help');

// Commands not need to go to local to execute.
const notToLocalToExec = ['new', 'add', 'archive', 'arc', 'clean', 'revert'];

// command name
const command = argv._[0];
// package version
const version = packageJson.version;

// -v --version
if (argv.v || argv.version) {
  logger.log(version);
  process.exit(0);
}
// -h --help
if (argv.h || argv.help) {
  help();
  process.exit(0);
}

// no command
if (!command) {
  help();
  process.exit(0);
}

// Do not need go to local.
if (notToLocalToExec.indexOf(command) > -1) {
  require('../index');
}
// Need to go to local to execute.
else {
  const localPkgPath = path.join(pathInfo.projectRoot, 'node_modules/lila/package.json');
  if (!fs.existsSync(localPkgPath)) {
    logger.error(`
  Missing local lila.    
    `);
    logger.log(`
  Please install local lila before next running:
    
  npm install lila --save-dev
  `);

    process.exit(0);
  }

  const localPkg = require(localPkgPath);

  // Get package.json main attribute.
  const localPkgIndexPath = path.join(pathInfo.projectRoot, 'node_modules/lila', localPkg.main);
  require(localPkgIndexPath);
}
