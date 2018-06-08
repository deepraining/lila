
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


/**
 * Append some common plugins.
 *
 * @param config
 */
module.exports = config => {

    // FriendlyErrorsWebpackPlugin
    config.webpack.plugins.push(new FriendlyErrorsWebpackPlugin());

    // ProvidePlugin
    if (config.provide) config.webpack.plugins.push(new webpack.ProvidePlugin(config.provide));

    // DefinePlugin
    if (config.define) config.webpack.plugins.push(new webpack.DefinePlugin(config.define));
};
