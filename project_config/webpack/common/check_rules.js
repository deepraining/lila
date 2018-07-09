const emptyOrArray = require('../../../util/empty_or_array');
const pathInfo = require('../../../data/path_info');

/**
 * Check rules defined in `lila.config.js` is valid.
 *
 * @param config
 */
module.exports = config => {
  !config.webpack.module && (config.webpack.module = {});
  if (config.rules) {
    // Rules must be an array.
    emptyOrArray(
      config.rules,
      `
    'rules' defined in '${pathInfo.configFile}' must be an array.    
        `
    );
    config.webpack.module.rules = config.rules;
  } else if (config.webpack.module.rules) {
    emptyOrArray(
      config.webpack.module.rules,
      `
    'webpack.module.rules' defined in '${pathInfo.configFile}' must be an array.    
        `
    );
  } else {
    config.webpack.module.rules = [];
  }
};
