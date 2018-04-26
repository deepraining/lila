
module.exports = config => {
    return {
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: !!config.enableCssModules
                }
            }
        ]
    }
};
