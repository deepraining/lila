
module.exports = config => {
    return {
        test: /\.less$/,
        use: [
            {
                loader: 'style-loader'
            },
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
    }
};
