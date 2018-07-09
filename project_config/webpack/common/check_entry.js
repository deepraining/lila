const emptyOrArray = require('../../../util/empty_or_array');
const pathInfo = require('../../../data/path_info');

/**
 * Check entry.
 *
 * @param config
 */
module.exports = config => {
  // Entry must be an array.
  emptyOrArray(
    config.webpack.entry,
    `
  'webpack.entry' defined in '${pathInfo.configFile}' must be an array.
    `
  );
  !config.webpack.entry && (config.webpack.entry = []);
};
