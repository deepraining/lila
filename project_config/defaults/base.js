
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
    // local server port
    serverPort: 8090,
    // express data mock server port
    mockExpressPort: 8190,
    // directory priority to merge js
    concatJsPriority: {
        /**
         * key(name): directory(string/array, relative to dev/js)
         */

        // lib: ['lib', 'lib_extra']
    },
    // directory priority to merge css
    concatCssPriority: {
        /**
         * key(name): directory(string/array, relative to dev/css)
         */

        // lib: ['lib', 'lib_extra']
    },
    // whether mini js files
    minJs: false,
    // whether mini css files
    minCss: false,
    // whether mini html files
    minHtml: false,
    // whether merge js files
    concatJs: false,
    // whether merge css files
    concatCss: false,
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
    cssAutoPrefix: true,
    // whether use webpack to build project
    useWebpack: false,
    // whether to pack css separately into a single css file
    packCssSeparately: false,
    // whether to split one big js file into many smaller js files
    splitJs: false
};

var _ = require('lodash');

module.exports = (config) => {
    config = _.defaults(config, _.cloneDeep(defaults));

    // confirm concatJsPriority and concatCssPriority has '_' key
    !config.concatJsPriority ? config.concatJsPriority = {_: ''} : config.concatJsPriority._ = '';
    !config.concatCssPriority ? config.concatCssPriority = {_: ''} : config.concatCssPriority._ = '';

    return config;
};