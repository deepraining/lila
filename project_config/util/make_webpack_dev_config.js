
'use strict';

var webpack = require('webpack');

var makeResolve = require('./webpack/make_resolve');
var babelLoader = require('../../webpack/loaders/babel_loader');
var cssLoader = require('../../webpack/loaders/css_loader');
var lessLoader = require('../../webpack/loaders/less_loader');
var urlLoader = require('../../webpack/loaders/url_loader');

module.exports = (config) => {

    var devConfig = {
        entry: [
            'webpack-hot-middleware/client?reload=true',
            config.buildPaths.src.js + '/' + config.module + '.js'
        ],
        output: {
            path: config.buildPaths.dev.js + '/' + config.moduleDir,
            filename: config.moduleName + '.js',
            publicPath: config.basePaths.webPrefix + '/dev/js/' + config.moduleDir
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        module: {
            rules: [babelLoader, cssLoader, lessLoader, urlLoader]
        },
        resolve: makeResolve(config)
    };

    return devConfig;
};