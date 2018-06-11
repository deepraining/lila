
const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `dist` directory.
 *
 * @returns {*}
 */
module.exports = () => {
    logger.log('Start deleting \'dist\' directory.');

    return del([projectConfig.buildPaths.dist.dir], {force: !0});
};
