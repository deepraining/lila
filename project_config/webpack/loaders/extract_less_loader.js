
'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * make extract less loader
 *
 * @param useCssModules
 * @param cssModulesExclude
 * @param include
 * @param exclude
 * @returns {{test: RegExp, use: *}}
 */
module.exports = (useCssModules = !1, cssModulesExclude = [], include = !1, exclude = !1) => {
    let loader = {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: useCssModules
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        modules: useCssModules
                    }
                }
            ]
        })
    };

    include && (loader.include = cssModulesExclude);
    exclude && (loader.exclude = cssModulesExclude);

    return loader;
};
