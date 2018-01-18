
'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => {
    return {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {url: false}
                },
                {
                    loader: 'less-loader',
                    options: {url: false}
                }
            ]
        })
    }
};
