
const autoprefixer = require('autoprefixer');

/**
 * make less loader
 *
 * @param useCssModules
 * @param excludeMatches
 * @param include
 * @param exclude
 * @param browsers
 * @returns {{test: RegExp, use: *[]}}
 */
module.exports = (useCssModules = !1, excludeMatches = [], include = !1, exclude = !1, browsers = []) => {
    let loader = {
        test: /\.less$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: useCssModules
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        autoprefixer({browsers})
                    ]
                }
            },
            {
                loader: 'less-loader',
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
