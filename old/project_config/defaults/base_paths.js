
// basePaths defaults
var defaults = {
    // build root directory, also the parent directory of src/dev/dist
    buildRoot: "./project",
    // web root directory
    webRoot: "./project"
};

var _ = require('lodash');
var path = require('path');

var vars = require('../../data/vars');

module.exports = (config) => {
    config.basePaths = !config.basePaths ? _.cloneDeep(defaults) : _.defaults(config.basePaths, _.cloneDeep(defaults));

    /**
     * webPrefix
     * for instance:
     *
     *     // the same
     *     {
     *         buildRoot: "./project",
     *         webRoot: "./project",
     *         webPrefix: ""
     *     }
     *
     *     // different
     *     {
     *         buildRoot: "./project/static",
     *         webRoot: "./project",
     *         webPrefix: "/static"
     *     }
     */
    var webPrefix = path.relative(config.basePaths.webRoot, config.basePaths.buildRoot);
    config.basePaths.webPrefix = webPrefix ? '/' + webPrefix : '';

    // make absolute path
    config.basePaths.buildRoot = path.join(vars.projectRoot, config.basePaths.buildRoot);
    config.basePaths.webRoot = path.join(vars.projectRoot, config.basePaths.webRoot);

};