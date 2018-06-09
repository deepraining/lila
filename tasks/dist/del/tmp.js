
const del = require('del');

const projectConfig = require('../../../project_config');

/**
 * Delete `tmp` directory.
 *
 * @returns {*}
 */
module.exports = () => {

    return del([projectConfig.buildPaths.tmp.dir], {force: !0});
};
