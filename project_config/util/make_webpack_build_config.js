
'use strict';

var webpack = require('webpack');

var makeResolve = require('./webpack/make_resolve');
var makeChunksMap = require('./webpack/make_chunks_map');
var makeEntry = require('./webpack/make_entry');
var makePlugins = require('./webpack/make_plugins');
var makeModule = require('./webpack/make_module');

module.exports = (config) => {

    makeChunksMap(config);

    var buildConfig = {
        entry: makeEntry(config),
        output: {
            path: config.buildPaths.dist.dir + '/',
            filename: '[chunkhash].js',
            hashDigestLength: 32,
            publicPath: config.cssAbsolutePathPrefix + config.basePaths.webPrefix + '/dist/'
        },
        plugins: makePlugins(config),
        module: makeModule(config),
        resolve: makeResolve(config)
    };

    return buildConfig;
};