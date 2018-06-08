
/**
 * Make `url-loader`.
 *
 * @param config
 * @param isBuild
 * @returns {{loader: string, options: {limit: number}, test: RegExp}}
 */
module.exports = (config, isBuild) => {
    let options = {
        limit: 0
    };

    if (isBuild) {
        options.publicPath = config.staticServerDir + config.basePaths.webPrefix + '/dist/'
    }

    return {
        loader: 'url-loader',
        options: options,
        test: new RegExp(`\.(${config.fileLoaderSuffixes.join('|')})$`)
    }
};
