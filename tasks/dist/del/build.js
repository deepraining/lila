const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `build` directory.
 *
 * @returns {*}
 */
module.exports = function delTmp() {
  logger.log('Deleting \'build\' directory.', {
    prefix: !0,
    preLn: !0,
    postLn: !0,
  });

  return del([projectConfig.buildPaths.build.dir], { force: !0 });
};
