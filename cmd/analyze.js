const webpack = require('webpack');

const checkConfigFile = require('../util/check_config_file');
const logger = require('../util/logger');
const argv = require('../data/argv');
const moduleName = argv.module;

if (!moduleName) {
  logger.error(`
  Missing module name for command: analyze.
  `);
  logger.log(`
  You can use this command as follows:
  
  lila analyze <name>
  `);
  process.exit(0);
}

checkConfigFile();

const projectConfig = require('../project_config');

webpack(projectConfig.webpack, (err, stats) => {
  if (err) {
    logger.error(err.stack || err);
    if (err.details) {
      logger.error(err.details);
    }
    process.exit(1);
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    info.errors.forEach(error => {
      logger.error(error);
    });
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    info.warnings.forEach(function(warning) {
      logger.warn(warning);
    });
  }
});
