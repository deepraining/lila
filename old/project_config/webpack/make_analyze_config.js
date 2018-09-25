const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pathInfo = require('../../data/path_info');
const getJsEntryPath = require('./util/get_js_entry_path');
const makeResolve = require('./common/make_resolve');

const checkEntry = require('./common/check_entry');
const checkPlugins = require('./common/check_plugins');
const makePlugins = require('./common/make_plugins');
const makeModule = require('./dev/make_module');

/**
 * Make `analyze config` of webpack.
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

  config.webpack.entry.push(getJsEntryPath(config));

  /**
   * Webpack output config.
   */
  !config.webpack.output && (config.webpack.output = {});
  config.webpack.output.path = pathInfo.analyzeWorkspace;
  config.webpack.output.filename = 'index.js';

  checkPlugins(config);

  config.webpack.plugins.push(new BundleAnalyzerPlugin(config.bundleAnalyzer || { analyzerPort: 8190 }));

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
