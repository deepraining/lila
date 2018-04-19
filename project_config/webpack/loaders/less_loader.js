
module.exports = () => {
    return {
        loader: 'style-loader!css-loader!less-loader',
        test: /\.less$/
    }
};
