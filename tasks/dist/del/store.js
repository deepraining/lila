
const del = require('del');

const projectConfig = require('../../../project_config');

/**
 * Delete `store` directory.
 *
 * @returns {*}
 */
module.exports = () => {

    return del([projectConfig.buildPaths.store.dir], {force: !0});
};
