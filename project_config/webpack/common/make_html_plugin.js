const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Make `html-webpack-plugin` instance.
 *
 * @param config
 */
module.exports = config => {
  !config.htmlWebpack && (config.htmlWebpack = {});

  config.htmlWebpack.template = `${config.buildPaths.src.dir}/${config.module}/index.html`;

  return new HtmlWebpackPlugin(config.htmlWebpack);
};
