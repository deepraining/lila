
const del = require('del');

const logger = require('../../../util/logger');

const pathInfo = require('../../../data/path_info');

/**
 * Delete analyze command workspace.
 *
 * @returns {*}
 */
module.exports = () => {
    logger.log('Start deleting analyze workspace.');

    return del([pathInfo.analyzeWorkspace], {force: !0});
};
