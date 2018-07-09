const path = require('path');
const defaults = require('lodash/defaults');
const cloneDeep = require('lodash/cloneDeep');

const pathInfo = require('../../data/path_info');

// `basePaths` default value
const defaultValue = {
  // Build root directory, also the parent directory of `src/dev/dist`.
  buildRoot: './project',
  // Web root directory.
  webRoot: './project',
};

/**
 * Make `basePaths`.
 *
 * And this should only be defined in `lila.config.js`
 *
 * @param config
 */
module.exports = config => {
  let clonedDefaultValue = cloneDeep(defaultValue);
  config.basePaths = !config.basePaths ? clonedDefaultValue : defaults(config.basePaths, clonedDefaultValue);

  /**
   * Make `webPrefix`.
   *
   * For example:
   *
   *     // the same
   *     {
   *         buildRoot: "./project",
   *         webRoot: "./project",
   *         webPrefix: ""
   *     }
   *
   *     // different
   *     {
   *         buildRoot: "./project/static",
   *         webRoot: "./project",
   *         webPrefix: "/static"
   *     }
   */
  let webPrefix = path.relative(config.basePaths.webRoot, config.basePaths.buildRoot);
  config.basePaths.webPrefix = webPrefix ? '/' + webPrefix : '';

  // Make absolute path.
  config.basePaths.buildRoot = path.join(pathInfo.projectRoot, config.basePaths.buildRoot);
  config.basePaths.webRoot = path.join(pathInfo.projectRoot, config.basePaths.webRoot);
};
