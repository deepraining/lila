
'use strict';

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

    let rules = [babelLoader];

    if (config.enableCssModules && config.excludeCssNodeModules) {
        rules.push(
            makeCssLoader(!1, !0, !1),
            makeCssLoader(!0, !1, !0),
            makeLessLoader(!1, !0, !1),
            makeLessLoader(!0, !1, !0)
        );
    }
    else if (config.enableCssModules) {
        rules.push(
            makeCssLoader(!0, !1, !1),
            makeLessLoader(!0, !1, !1)
        );
    }
    else {
        rules.push(
            makeCssLoader(),
            makeLessLoader()
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
