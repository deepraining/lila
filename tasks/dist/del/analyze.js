
const del = require('del');

const logger = require('../../../util/logger');

const pathInfo = require('../../../data/path_info');

/**
 * Delete analyze command workspace.
 *
 * @returns {*}
 */
module.exports = function delAnalyze() {
    logger.log('Deleting analyze workspace.', {prefix: !0, preLn: !0, postLn: !0});

    return del([pathInfo.analyzeWorkspace], {force: !0});
};
