
/**
 * Make `html-loader`.
 *
 * @param config
 * @returns {{loader: string, test: RegExp, options: {attrs: string[], interpolate: string}}}
 */
module.exports = config => {
    return {
        loader: 'html-loader',
        test: /\.html$/,
        options: {
            attrs: ['img:src', 'link:href'],
            interpolate: 'require'
        }
    };
};
