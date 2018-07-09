const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `build_store` directory.
 *
 * @returns {*}
 */
module.exports = function delStore() {
  logger.log("Deleting 'build_store' directory.", {
    prefix: !0,
    preLn: !0,
    postLn: !0,
  });

  return del([projectConfig.buildPaths.buildStore.dir], { force: !0 });
};
