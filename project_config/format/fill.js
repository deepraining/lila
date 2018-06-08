
const cloneDeep = require('lodash/cloneDeep');
const forEach = require('lodash/forEach');

// Default config root attributes.
const defaultValue = {
    // Whether mini js files.
    minJs: !1,
    // Whether mini css files.
    minCss: !1,
    // Whether mini html files.
    minHtml: !1,
    // Whether record file changes, thus next building only handle changed file.
    recordFileChanges: !0,
    // Whether pack css into a single css file separately.
    packCssSeparately: !1,
    // Indicates which files to load.
    fileLoaderSuffixes: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2'],
    // Dev server port.
    devServerPort: 8090,
    // Server port for [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).
    analyzerPort: 8190,
    // Treat all methods as `get` method, thus all methods can access to static file.
    treatAllMethodsAsGet: !1,
    // Whether to use [css modules](https://github.com/css-modules/css-modules).
    enableCssModules: !1,
    // How to exclude files when transform `css-modules`.
    cssModulesExclude: [/node_modules/],
    // `browsers` option for [autoprefixer](https://github.com/postcss/autoprefixer#options).
    browsers: [],
    //  How to exclude files when transform from es6 to es5.
    babelLoaderExclude: [/node_modules/]
};


/**
 * Fill default value to config.
 *
 * @param config
 */
module.exports = config => {

    forEach(defaultValue, (value, key) => {
        if (typeof config[key] === 'undefined')
            config[key] = typeof value === 'object' ? cloneDeep(value) : value;
    });

    // htmlCdnExtensions
    config.htmlCdnExtensions = cloneDeep(config.fileLoaderSuffixes);
    config.htmlCdnExtensions.push('js', 'css');
};
