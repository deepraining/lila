
module.exports = () => {
    return {
        loader: 'html-loader',
        test: /\.html$/,
        options: {
            attrs: ['img:src', 'link:href'],
            interpolate: 'require'
        }
    };
};
