const webpack = require('webpack');

const logger = require('../../util/logger');

const projectConfig = require('../../project_config');

if (projectConfig.multiple) {
  logger.error(`
  Current mode do not support multiple modules.
  `);
  logger.log(`
  You can use it like this:
  
  lila dist <single-name> -w
  `);

  process.exit(1);
}

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
    info.warnings.forEach(warning => {
      logger.warn(warning);
    });
  }

  logger.success(`
  Webpack build module '${projectConfig.module}' successfully, no errors.
  `);
});
