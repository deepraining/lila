
'use strict';

var webpack = require('webpack');
var _ = require('lodash');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var getJsEntryPath = require('./get_js_entry_path');
var makeResolve = require('./webpack/make_resolve');
var makeBabelLoader = require('../../webpack/loaders/babel_loader');
var makeCssLoader = require('../../webpack/loaders/css_loader');
var makeLessLoader = require('../../webpack/loaders/less_loader');
var makeUrlLoader = require('../../webpack/loaders/url_loader');
var makeHtmlLoader = require('../../webpack/loaders/html_loader');

module.exports = (config) => {

    var babelLoader = makeBabelLoader(config);
    var cssLoader = makeCssLoader();
    var lessLoader = makeLessLoader();
    var urlLoader = makeUrlLoader(config);
    var htmlLoader = makeHtmlLoader();

    var plugins = [
        new BundleAnalyzerPlugin({
            analyzerPort: config.analyzerPort
        })
    ];

    // ProvidePlugin
    if (config.provide) plugins.push(new webpack.ProvidePlugin(config.provide));

    var devConfig = {
        entry: [
            getJsEntryPath(config)
        ],
        output: {
            path: config.buildPaths.dev.dir + '/' + config.module + '/',
            filename: 'index.js',
            publicPath: config.basePaths.webPrefix + '/dev/' + config.module + '/'
        },
        plugins: plugins,
        module: {
            rules: [babelLoader, cssLoader, lessLoader, urlLoader, htmlLoader]
        },
        resolve: makeResolve(config)
    };

    return devConfig;
};