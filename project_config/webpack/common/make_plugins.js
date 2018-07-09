const webpack = require('webpack');

/**
 * Append some common plugins.
 *
 * @param config
 */
module.exports = config => {
  // ProvidePlugin
  if (config.provide) {
    config.webpack.plugins.push(new webpack.ProvidePlugin(config.provide));
  }

  // DefinePlugin
  if (config.define) {
    config.webpack.plugins.push(new webpack.DefinePlugin(config.define));
  }
};
