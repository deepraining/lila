
'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * make extract css loader
 *
 * @param useCssModules
 * @param includeNodeModules
 * @param excludeNodeModules
 * @returns {{test: RegExp, use: *}}
 */
module.exports = (useCssModules = !1, includeNodeModules = !1, excludeNodeModules = !1) => {
    let loader = {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: useCssModules
                    }
                }
            ]
        })
    };

    includeNodeModules && (loader.include = /node_modules/);
    excludeNodeModules && (loader.exclude = /node_modules/);

    return loader;
};
