
'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = config => {
    return {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: !!config.enableCssModules
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        modules: !!config.enableCssModules
                    }
                }
            ]
        })
    }
};
