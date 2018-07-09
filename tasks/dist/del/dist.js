const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `dist` directory.
 *
 * @returns {*}
 */
module.exports = function delDist() {
  logger.log('Deleting \'dist\' directory.', {
    prefix: !0,
    preLn: !0,
    postLn: !0,
  });

  return del([projectConfig.buildPaths.dist.dir], { force: !0 });
};
