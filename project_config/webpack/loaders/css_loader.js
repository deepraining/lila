
/**
 * make css loader
 *
 * @param useCssModules
 * @param excludeMatches
 * @param include
 * @param exclude
 * @returns {{test: RegExp, use: *[]}}
 */
module.exports = (useCssModules = !1, excludeMatches = [], include = !1, exclude = !1) => {

    let loader = {
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: useCssModules
                }
            }
        ]
    };
    include && (loader.include = excludeMatches);
    exclude && (loader.exclude = excludeMatches);

    return loader;
};
