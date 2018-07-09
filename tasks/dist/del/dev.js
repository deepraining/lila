const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `dev` directory.
 *
 * @returns {*}
 */
module.exports = function delDev() {
  logger.log('Deleting \'dev\' directory.', {
    prefix: !0,
    preLn: !0,
    postLn: !0,
  });

  return del([projectConfig.buildPaths.dev.dir], { force: !0 });
};
