
'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => {
    return {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {url: false}
                }
            ]
        })
    }
};
