const checkConfigFile = require('../util/check_config_file');
const logger = require('../util/logger');
const argv = require('../data/argv');

const moduleName = argv.module;

if (!moduleName) {
  logger.error(`
  Missing module name for command: stylelint.
  `);
  logger.log(`
  You can use this command as follows:
    
  lila stylelint <name>
  `);
  process.exit(1);
}

checkConfigFile();

logger.log(`
  Start 'stylelint' for module '${moduleName}'.
`);

require('./util/stylelint')(() => {
  logger.success(`
  No errors occurred under module '${moduleName}'.
  `);
});
