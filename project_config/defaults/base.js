
// default config root attributes
var defaults = {
    // current handling module name
    module: 'test/index',
    /**
     * environment index
     *
     * example: 0 -> test
     *          1 -> prod
     *          2 -> other
     *          ...
     */
    env: 0,
    // dev server port
    devServerPort: 8090,
    // express data mock server port
    mockExpressServerPort: 8190,
    // whether mini js files
    minJs: false,
    // whether mini css files
    minCss: false,
    // whether mini html files
    minHtml: false,
    // whether record file changes, thus next time only handle changed file
    recordFileChanges: true,
    // whether rename js/css file by appending hash code to file name
    revisionFiles: true,
    // revision hash code length
    revisionHashLength: 8,
    // whether convert relative path to absolute path and add cdn prefix in html
    htmlAbsoluteAndCdnPath: true,
    // whether to pack css separately into a single css file
    packCssSeparately: false,
    // whether to ignore files under node_modules directory when transform es6 to es5
    ignoreNodeModules: true,
    // indicates which files to load
    fileLoaderSuffixes: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']
};

var _ = require('lodash');

module.exports = (config) => {
    config = _.defaults(config, _.cloneDeep(defaults));

    return config;
};