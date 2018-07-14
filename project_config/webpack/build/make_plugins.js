const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const checkPlugins = require('../common/check_plugins');
const makeHtmlPlugin = require('../common/make_html_plugin');
const makePlugins = require('../common/make_plugins');

module.exports = config => {
  checkPlugins(config);

  config.webpack.plugins.push(makeHtmlPlugin(config));

  // Pack css alone.
  if (config.packCssSeparately) {
    config.webpack.plugins.push(new ExtractTextPlugin('[contenthash].css'));
  }

  /**
   * Common chunks.
   *
   * ```
   * [
   *   CommonsChunkPlugin({chunks: ['index', 'vendor', 'vendor2', 'common']}),
   *   CommonsChunkPlugin({chunks: ['index', 'vendor2', 'common']}),
   *   CommonsChunkPlugin({chunks: ['index', 'common']})
   * ]
   * ```
   */
  if (config.splitJsKeys) {
    const keysLength = config.splitJsKeys.length;

    config.splitJsKeys.forEach((key, index) => {
      let i = index;
      const chunks = [config.moduleName];

      for (; i < keysLength; i += 1) {
        chunks.push(config.splitJsKeys[i]);
      }

      config.webpack.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: key,
          filename: '[chunkhash].js',
          chunks,
          minChunks: Infinity,
        })
      );
    });
  }

  makePlugins(config);
};
