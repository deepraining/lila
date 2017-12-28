
module.exports = {
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
        presets: ['es2015', 'stage-1'],
        plugins: ["transform-react-jsx"]
    },
    test: /\.(js|jsx)$/
};
