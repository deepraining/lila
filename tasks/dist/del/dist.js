
const del = require('del');

const projectConfig = require('../../../project_config');

/**
 * Delete `dist` directory.
 *
 * @returns {*}
 */
module.exports = () => {

    return del([projectConfig.buildPaths.dist.dir], {force: !0});
};
