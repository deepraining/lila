
'use strict';

var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var getConcatFileName = require('../../../util/get_concat_file_name');

module.exports = (config) => {

    var plugins = [];

    // pack css alone
    if (config.packCssSeparately) {
        /**
         * example:
         *     current module is: test/index
         *     result is: ../../css/test/index.css
         */
        plugins.push(new ExtractTextPlugin(_.repeat('../', config.module.split('/').length) + 'css/' + config.module + '.css'));
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
                filename: getConcatFileName(config.moduleName, key) + '.js',
                chunks: chunks,
                minChunks: Infinity
            }));
        });
    }

    // ProvidePlugin
    if (config.provide) plugins.push(new webpack.ProvidePlugin(config.provide));

    return plugins;
};