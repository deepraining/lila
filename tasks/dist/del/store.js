
const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `store` directory.
 *
 * @returns {*}
 */
module.exports = () => {
    logger.log('Start deleting \'store\' directory.');

    return del([projectConfig.buildPaths.store.dir], {force: !0});
};
