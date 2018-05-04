
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
    // whether mini js files
    minJs: !1,
    // whether mini css files
    minCss: !1,
    // whether mini html files
    minHtml: !1,
    // whether record file changes, thus next time only handle changed file
    recordFileChanges: !0,
    // whether to pack css separately into a single css file
    packCssSeparately: !1,
    // whether to ignore files under node_modules directory when transform es6 to es5
    ignoreNodeModules: !0,
    // indicates which files to load
    fileLoaderSuffixes: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2'],
    // dev server port
    devServerPort: 8090,
    // server port for [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
    analyzerPort: 8190,
    // treat all methods as `get` method, thus all methods can access to static file
    treatAllMethodsAsGet: !1,
    // whether to use [css modules](https://github.com/css-modules/css-modules)
    enableCssModules: !1
};

var _ = require('lodash');

module.exports = (config) => {
    config = _.defaults(config, _.cloneDeep(defaults));

    // htmlCdnExtensions
    config.htmlCdnExtensions = _.cloneDeep(config.fileLoaderSuffixes);
    config.htmlCdnExtensions.push('js', 'css');

    return config;
};
