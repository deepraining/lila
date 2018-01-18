
'use strict';

var webpack = require('webpack');
var _ = require('lodash');

var getJsEntryPath = require('./get_js_entry_path');
var makeResolve = require('./webpack/make_resolve');
var makeBabelLoader = require('../../webpack/loaders/babel_loader');
var makeCssLoader = require('../../webpack/loaders/css_loader');
var makeLessLoader = require('../../webpack/loaders/less_loader');
var makeUrlLoader = require('../../webpack/loaders/url_loader');

module.exports = (config) => {

    var babelLoader = makeBabelLoader(config);
    var cssLoader = makeCssLoader();
    var lessLoader = makeLessLoader();
    var urlLoader = makeUrlLoader(config);

    var plugins = [
        new webpack.HotModuleReplacementPlugin()
    ];

    // ProvidePlugin
    if (config.provide) plugins.push(new webpack.ProvidePlugin(config.provide));

    var devConfig = {
        entry: [
            'webpack-hot-middleware/client?reload=true',
            getJsEntryPath(config)
        ],
        output: {
            path: config.buildPaths.dev.js + '/' + (config.moduleDir ? config.moduleDir + '/' : ''),
            filename: config.moduleName + '.js',
            publicPath: config.basePaths.webPrefix + '/dev/js/' + (config.moduleDir ? config.moduleDir + '/' : '')
        },
        plugins: plugins,
        module: {
            rules: [babelLoader, cssLoader, lessLoader, urlLoader]
        },
        resolve: makeResolve(config)
    };

    return devConfig;
};