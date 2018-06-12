
const del = require('del');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Delete `store` directory.
 *
 * @returns {*}
 */
module.exports = function delStore() {
    logger.log('Deleting \'store\' directory.', {prefix: !0, preLn: !0, postLn: !0});

    return del([projectConfig.buildPaths.store.dir], {force: !0});
};
