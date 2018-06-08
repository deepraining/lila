
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Make `html-webpack-plugin` instance.
 *
 * @param config
 */
module.exports = config => {
    !config.htmlWebpackPlugin && (config.htmlWebpackPlugin = {});

    config.htmlWebpackPlugin.template = config.buildPaths.src.dir + '/' + config.module + '/index.html';

    return new HtmlWebpackPlugin(config.htmlWebpackPlugin);
};
