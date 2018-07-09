const share = require('../../share');

const makeResolve = require('./common/make_resolve');
const makeChunks = require('./build/make_chunks');
const makeEntry = require('./build/make_entry');
const makePlugins = require('./build/make_plugins');
const makeModule = require('./build/make_module');

/**
 * Make `build config` of webpack.
 *
 * @param config
 */
module.exports = config => {
  /**
   * Make `splitJsChunks`.
   */
  makeChunks(config);

  makeEntry(config);

  /**
   * Webpack output config.
   */
  !config.webpack.output && (config.webpack.output = {});
  config.webpack.output.path = `${config.buildPaths.build.dir}/`;
  config.webpack.output.filename = '[chunkhash].js';
  config.webpack.output.hashDigestLength = share.hashDigestLength;
  config.webpack.output.publicPath = `${config.staticServerDir + config.basePaths.webPrefix}/dist/`;

  makePlugins(config);
  makeModule(config);
  makeResolve(config);
};
