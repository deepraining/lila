
const del = require('del');

const pathInfo = require('../../../data/path_info');

/**
 * Delete analyze command workspace.
 *
 * @returns {*}
 */
module.exports = () => {

    return del([pathInfo.analyzeWorkspace], {force: !0});
};
