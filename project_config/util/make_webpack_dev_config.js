
'use strict';

var webpack = require('webpack');
var _ = require('lodash');

var getJsEntryPath = require('./get_js_entry_path');
var makeResolve = require('./webpack/make_resolve');
var babelLoader = require('../../webpack/loaders/babel_loader');
var cssLoader = require('../../webpack/loaders/css_loader');
var lessLoader = require('../../webpack/loaders/less_loader');
var urlLoader = require('../../webpack/loaders/url_loader');

module.exports = (config) => {

    var newBabelLoader = _.cloneDeep(babelLoader);

    if (!config.ignoreNodeModules) delete newBabelLoader.exclude;

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
            path: config.buildPaths.dev.js + '/' + config.moduleDir,
            filename: config.moduleName + '.js',
            publicPath: config.basePaths.webPrefix + '/dev/js/' + config.moduleDir
        },
        plugins: plugins,
        module: {
            rules: [newBabelLoader, cssLoader, lessLoader, urlLoader]
        },
        resolve: makeResolve(config)
    };

    return devConfig;
};