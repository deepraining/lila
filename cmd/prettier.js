const checkConfigFile = require('../util/check_config_file');
const logger = require('../util/logger');
const argv = require('../data/argv');

const moduleName = argv.module;

if (!moduleName) {
  logger.error(`
  Missing module name for command: prettier.
  `);
  logger.log(`
  You can use this command as follows:
  
  lila prettier <name>
  `);
  process.exit(0);
}

checkConfigFile();

logger.log(`
  Start 'prettier' for module '${moduleName}'.
`);

require('./util/prettier');

logger.success(`
  Done for formatting code under module '${moduleName}'.
`);
