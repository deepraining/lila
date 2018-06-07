
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const makeHtmlPlugin = require('./make_html_plugin');

module.exports = (config) => {

    const plugins = [
        makeHtmlPlugin(config)
    ];

    // pack css alone
    if (config.packCssSeparately) {
        plugins.push(new ExtractTextPlugin('[contenthash].css'));
    }

    // common chunks
    if (config.splitJsKeys) {
        const keysLength = config.splitJsKeys.length;

        config.splitJsKeys.forEach((key, index) => {
            const i = index, chunks = [config.moduleName];

            for (; i < keysLength; i++) {
                chunks.push(config.splitJsKeys[i]);
            }

            plugins.push(new webpack.optimize.CommonsChunkPlugin({
                name: key,
                filename: '[chunkhash].js',
                chunks: chunks,
                minChunks: Infinity
            }));
        });
    }

    // ProvidePlugin
    if (config.provide) plugins.push(new webpack.ProvidePlugin(config.provide));

    // DefinePlugin
    if (config.define) plugins.push(new webpack.DefinePlugin(config.define));

    plugins.push(new FriendlyErrorsWebpackPlugin());

    return plugins;
};
