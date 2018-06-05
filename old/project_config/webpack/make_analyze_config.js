
var webpack = require('webpack');
var _ = require('lodash');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var getJsEntryPath = require('./util/get_js_entry_path');
var makeResolve = require('./util/make_resolve');
var makeBabelLoader = require('./loaders/babel_loader');
var makeCssLoader = require('./loaders/css_loader');
var makeLessLoader = require('./loaders/less_loader');
var makeUrlLoader = require('./loaders/url_loader');
var makeHtmlLoader = require('./loaders/html_loader');

module.exports = (config) => {

    var babelLoader = makeBabelLoader(config);
    var urlLoader = makeUrlLoader(config);
    var htmlLoader = makeHtmlLoader(config);

    var plugins = [
        new BundleAnalyzerPlugin({
            analyzerPort: config.analyzerPort
        }),
        new FriendlyErrorsWebpackPlugin()
    ];

    // ProvidePlugin
    if (config.provide) plugins.push(new webpack.ProvidePlugin(config.provide));

    // DefinePlugin
    if (config.define) plugins.push(new webpack.DefinePlugin(config.define));

    let rules = [babelLoader];

    let excludeMatches = config.cssModulesExclude;
    let browsers = config.browsers;
    if (config.enableCssModules && excludeMatches) {
        rules.push(
            makeCssLoader(!1, excludeMatches, !0, !1, browsers),
            makeCssLoader(!0, excludeMatches, !1, !0, browsers),
            makeLessLoader(!1, excludeMatches, !0, !1, browsers),
            makeLessLoader(!0, excludeMatches, !1, !0, browsers)
        );
    }
    else if (config.enableCssModules) {
        rules.push(
            makeCssLoader(!0, excludeMatches, !1, !1, browsers),
            makeLessLoader(!0, excludeMatches, !1, !1, browsers)
        );
    }
    else {
        rules.push(
            makeCssLoader(!1, [], !1, !1, browsers),
            makeLessLoader(!1, [], !1, !1, browsers)
        );
    }

    rules.push(
        urlLoader,
        htmlLoader
    );

    var devConfig = {
        entry: [
            getJsEntryPath(config)
        ],
        output: {
            path: config.buildPaths.dev.dir + '/',
            filename: 'index.js',
            publicPath: config.basePaths.webPrefix + '/dev/'
        },
        plugins: plugins,
        module: {
            rules: rules
        },
        resolve: makeResolve(config)
    };

    return devConfig;
};
