
const cloneDeep = require('lodash/cloneDeep');

/**
 * Make `html-loader`.
 *
 * @param config
 * @returns {{loader: string, test: RegExp, options: {attrs: string[], interpolate: string}}}
 */
module.exports = config => {
    const loader = config.htmlLoader ? cloneDeep(config.htmlLoader) : {};

    loader.loader = 'html-loader';
    loader.test = /\.html$/;

    return loader;
};
