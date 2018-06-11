
const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `tmp` directory.
 *
 * @returns {*}
 */
module.exports = () => {
    logger.log('Start deleting \'tmp\' directory.');

    return del([projectConfig.buildPaths.tmp.dir], {force: !0});
};
