
var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var makeHtmlPlugin = require('./make_html_plugin');

module.exports = (config) => {

    var plugins = [
        makeHtmlPlugin(config)
    ];

    // pack css alone
    if (config.packCssSeparately) {
        plugins.push(new ExtractTextPlugin('[contenthash].css'));
    }

    // common chunks
    if (config.splitJsKeys) {
        var keysLength = config.splitJsKeys.length;

        config.splitJsKeys.forEach((key, index) => {
            var i = index, chunks = [config.moduleName];

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
