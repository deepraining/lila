const logger = require('../../util/logger');
const argv = require('../../data/argv');

/**
 * eslint, stylelint, prettier
 *
 * @param cb
 */
module.exports = cb => {
  const projectConfig = require('../../project_config');
  const moduleName = argv.module;

  // After stylelint
  const postStyleLint = () => {
    // prettier
    if (projectConfig.prettier) {
      logger.log(`
  Start 'prettier' for module '${moduleName}'.
      `);

      require('./prettier');

      logger.success(`
  Done for formatting code under module '${moduleName}'.
      `);
    }

    // Finish.
    cb();
  };

  // eslint
  if (projectConfig.esLint) {
    logger.log(`
  Start 'eslint' for module '${moduleName}'.
    `);

    require('./eslint');

    logger.success(`
  No errors occurred under module '${moduleName}'.
    `);
  }

  // stylelint
  if (projectConfig.styleLint) {
    logger.log(`
  Start 'stylelint' for module '${moduleName}'.
    `);

    require('./stylelint')(() => {
      logger.success(`
  No errors occurred under module '${moduleName}'.
      `);

      postStyleLint();
    });
  } else {
    postStyleLint();
  }
};
