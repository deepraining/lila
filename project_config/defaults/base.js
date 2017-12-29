
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
    // static server port
    staticServerPort: 8290,
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
    // whether convert relative path to absolute path in css
    cssAbsolutePath: true,
    // whether convert relative path to absolute path and add cdn prefix in html
    htmlAbsoluteAndCdnPath: true,
    // whether skip not existing files when build
    skipNotExistingFiles: false,
    // whether auto add vendor prefixes to rules of css
    cssAutoPrefix: false,
    // whether to pack css separately into a single css file
    packCssSeparately: false,
    // whether to split one big js file into many smaller js files
    splitJs: false
};

var _ = require('lodash');

module.exports = (config) => {
    config = _.defaults(config, _.cloneDeep(defaults));

    return config;
};