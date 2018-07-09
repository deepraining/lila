const checkConfigFile = require('../util/check_config_file');
const logger = require('../util/logger');
const argv = require('../data/argv');
const moduleName = argv.module;

if (!moduleName) {
  logger.error(`
    Missing module name for command: eslint.
    `);
  logger.log(`
    You can use this command as follows:
    
    lila eslint <name>
    `);
  process.exit(0);
}

checkConfigFile();

logger.log(`
    Start 'eslint' for module '${moduleName}'.
`);

require('./util/eslint');

logger.success(`
    No errors occurred under module '${moduleName}'.
`);
