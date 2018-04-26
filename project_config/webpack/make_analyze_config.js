
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
    var cssLoader = makeCssLoader();
    var lessLoader = makeLessLoader();
    var urlLoader = makeUrlLoader(config);
    var htmlLoader = makeHtmlLoader();

    var plugins = [
        new BundleAnalyzerPlugin({
            analyzerPort: config.analyzerPort
        }),
        new FriendlyErrorsWebpackPlugin()
    ];

    // ProvidePlugin
    if (config.provide) plugins.push(new webpack.ProvidePlugin(config.provide));

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
            rules: [babelLoader, cssLoader, lessLoader, urlLoader, htmlLoader]
        },
        resolve: makeResolve(config)
    };

    return devConfig;
};
