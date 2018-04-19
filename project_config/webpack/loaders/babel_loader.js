
module.exports = (config) => {
    var loader = {
        loader: 'babel-loader',
        options: {
            presets: ['es2015', 'stage-1'],
            plugins: ["transform-react-jsx"]
        },
        test: /\.(js|jsx)$/
    };

    if (config.ignoreNodeModules) {
        loader.exclude = /node_modules/
    }

    return loader;
};
