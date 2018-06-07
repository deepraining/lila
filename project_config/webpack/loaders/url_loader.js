
const cloneDeep = require('lodash/cloneDeep');

/**
 * Make `url-loader`.
 *
 * @param config
 * @param isBuild
 * @returns {{loader: string, options: {limit: number}, test: RegExp}}
 */
module.exports = (config, isBuild) => {
    const loader = config.urlLoader ? cloneDeep(config.urlLoader) : {};

    !loader.options && (loader.options = {});

    loader.loader = 'url-loader';
    loader.test = new RegExp(`\.(${config.fileLoaderSuffixes.join('|')})$`);

    if (isBuild) {
        loader.options.publicPath = config.staticServerDir + config.basePaths.webPrefix + '/dist/'
    }

    return loader;
};
