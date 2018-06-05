
var webpack = require('webpack');

var makeResolve = require('./util/make_resolve');
var makeChunksMap = require('./util/make_chunks_map');
var makeEntry = require('./util/make_entry');
var makePlugins = require('./util/make_plugins');
var makeModule = require('./util/make_module');

const data = require('../../data');

module.exports = (config) => {

    makeChunksMap(config);

    var buildConfig = {
        entry: makeEntry(config),
        output: {
            path: config.buildPaths.dist.dir + '/',
            filename: '[chunkhash].js',
            hashDigestLength: data.hashDigestLength,
            publicPath: config.staticServerDir + config.basePaths.webPrefix + '/dist/'
        },
        plugins: makePlugins(config),
        module: makeModule(config),
        resolve: makeResolve(config)
    };

    return buildConfig;
};
