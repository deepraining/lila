
const webpack = require('webpack');

const share = require('../../share');

const makeResolve = require('./util/make_resolve');
const makeChunksMap = require('./util/make_chunks_map');
const makeEntry = require('./util/make_entry');
const makePlugins = require('./util/make_plugins');
const makeModule = require('./util/make_module');

module.exports = (config) => {

    makeChunksMap(config);

    const buildConfig = {
        entry: makeEntry(config),
        output: {
            path: config.buildPaths.dist.dir + '/',
            filename: '[chunkhash].js',
            hashDigestLength: share.hashDigestLength,
            publicPath: config.staticServerDir + config.basePaths.webPrefix + '/dist/'
        },
        plugins: makePlugins(config),
        module: makeModule(config),
        resolve: makeResolve(config)
    };

    return buildConfig;
};
