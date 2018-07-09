/**
 * Make `webpack.resolve` of config.
 *
 * @param config
 * @returns {{modules: *}|*}
 */
module.exports = config => {
  !config.webpack.resolve && (config.webpack.resolve = {});

  config.resolveModules && (config.webpack.resolve.modules = config.resolveModules);
  config.resolveAlias && (config.webpack.resolve.alias = config.resolveAlias);
};
