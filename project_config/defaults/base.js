
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

    /**
     * Indicates which reference extensions to absolute, like `jpg, gif, png, ico, ...`
     *
     * https://github.com/senntyou/gulp-cdn-absolute-path/blob/master/index.js#L12
     */
    // htmlAbsoluteSuffixes: ['jpg', 'jpeg', 'png', 'gif', 'js', 'css', 'ico', 'cur'],

    // whether skip not existing files when build
    skipNotExistingFiles: false,
    // whether auto add vendor prefixes to rules of css
    cssAutoPrefix: false,
    // whether to pack css separately into a single css file
    packCssSeparately: false,
    // whether to split one big js file into many smaller js files
    splitJs: false,
    // whether to ignore files under node_modules directory when transform es6 to es5
    ignoreNodeModules: true,
    // indicates which files to load
    fileLoaderSuffixes: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'eot', 'ttf', 'woff', 'woff2']
};

var _ = require('lodash');

module.exports = (config) => {
    config = _.defaults(config, _.cloneDeep(defaults));

    return config;
};