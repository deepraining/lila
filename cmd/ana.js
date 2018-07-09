const logger = require('../util/logger');
const argv = require('../data/argv');
const moduleName = argv.module;

if (!moduleName) {
  logger.error(`
    Missing module name for command: ana.
    `);
  logger.log(`
    You can use this command as follows:
    
    lila ana <name>
    `);
  process.exit(0);
}

require('./analyze');
