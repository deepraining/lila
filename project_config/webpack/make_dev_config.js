const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

const getJsEntryPath = require('./util/get_js_entry_path');
const makeResolve = require('./common/make_resolve');
const makeHtmlPlugin = require('./common/make_html_plugin');

const checkEntry = require('./common/check_entry');
const checkPlugins = require('./common/check_plugins');
const makePlugins = require('./common/make_plugins');
const makeModule = require('./dev/make_module');

/**
 * Make `dev config` of webpack.
 *
 * @param config
 * @returns {{
 *   entry: *[],
 *   output: {path: string, filename: string, publicPath: string},
 *   plugins: *[],
 *   module: {rules: *[]}, resolve: resolve}
 * }
 */
module.exports = config => {
  checkEntry(config);

  config.webpack.entry.push('webpack-hot-middleware/client?reload=true', getJsEntryPath(config));

  /**
   * Webpack output config.
   */
  !config.webpack.output && (config.webpack.output = {});
  config.webpack.output.path = `${config.buildPaths.dev.dir}/${config.module}/`;
  config.webpack.output.filename = 'index.js';
  config.webpack.output.publicPath = `${config.basePaths.webPrefix}/dev/${config.module}/`;

  checkPlugins(config);

  config.webpack.plugins.push(
    new webpack.HotModuleReplacementPlugin(config.hotModuleReplacement || {}),
    makeHtmlPlugin(config)
  );

  /**
   * Whether write bundle files to the file system.
   *
   * In webpack 4, webpack-dev-middleware 3, use `writeToDisk` instead.
   */
  config.writeFile && config.webpack.plugins.push(new WriteFilePlugin());

  /**
   * Common plugins
   */
  makePlugins(config);

  /**
   * Webpack module config.
   */
  makeModule(config);

  /**
   * Webpack resolve config.
   */
  makeResolve(config);
};
