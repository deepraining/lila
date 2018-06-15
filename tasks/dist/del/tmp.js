
const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `build_tmp` directory.
 *
 * @returns {*}
 */
module.exports = function delTmp() {
    logger.log('Deleting \'build_tmp\' directory.', {prefix: !0, preLn: !0, postLn: !0});

    return del([projectConfig.buildPaths.buildTmp.dir], {force: !0});
};
