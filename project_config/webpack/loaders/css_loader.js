/**
 * make css loader
 *
 * @param useCssModules
 * @param cssModulesExclude
 * @param include
 * @param exclude
 * @returns {{test: RegExp, use: *[]}}
 */
module.exports = (useCssModules = !1, cssModulesExclude = [], include = !1, exclude = !1) => {

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
    include && (loader.include = cssModulesExclude);
    exclude && (loader.exclude = cssModulesExclude);

    return loader;
};
