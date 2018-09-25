/**
 * Path utils.
 *
 * @type {{
 *     getModuleName: function(*),
 *     getModuleDir: function(*),
 *     replaceBackSlash: function(*)
 * }}
 */
module.exports = {
  /**
   * Get pure module name of a module.
   *
   * @example
   *
   * ```
   * getModuleName('index') = 'index';
   * getModuleName('test/index') = 'index';
   * getModuleName('parent/test/index') = 'index';
   * ```
   *
   * @param module
   * @returns {string}
   */
  getModuleName: module => {
    const lastSlashIndex = module.lastIndexOf('/');

    return lastSlashIndex === -1 ? module : module.slice(lastSlashIndex + 1);
  },
  /**
   * Get module directory of a module.
   *
   * @example
   *
   * ```
   * getModuleDir('index') = '';
   * getModuleDir('test/index') = 'test';
   * getModuleDir('parent/test/index') = 'parent/test';
   * ```
   *
   * @param module
   * @returns {string}
   */
  getModuleDir: module => {
    const lastSlashIndex = module.lastIndexOf('/');

    return lastSlashIndex === -1 ? '' : module.slice(0, lastSlashIndex);
  },
  /**
   * Replace back slash with slash.
   *
   * @example
   *
   * ```
   * \\ -> /
   * \\\\ -> /
   * ```
   *
   * @param str
   * @returns {string}
   */
  replaceBackSlash: str => {
    return str.replace(/(\\\\|\\)/g, '/');
  },
};
