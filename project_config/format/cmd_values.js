const forEach = require('lodash/forEach');
const argv = require('../../data/argv');

/**
 * Some command arguments must be firstly loaded into config.
 *
 * @type {string[]}
 */
const preFields = ['env', 'module', 'local'];

/**
 * Load command arguments to config.
 *
 * @param config
 * @param pre Whether just load `preFields`.
 * @param custom Whether is custom config.
 */
module.exports = (config, pre, custom) => {
  forEach(argv, (value, key) => {
    // Get real key, for some key has alias.
    const realKey = config.cmdAlias[key] ? config.cmdAlias[key] : key;

    if (pre && preFields.indexOf(realKey) < 0) {
      return;
    }
    if (!pre && preFields.indexOf(realKey) > -1) {
      return;
    }

    // If is custom config, should not modify `config.module`.
    if (custom && realKey === 'module') {
      return;
    }

    // -e test, --env prod
    if (realKey === 'env' && config.envAlias && typeof config.envAlias[value] !== 'undefined') {
      config[realKey] = config.envAlias[value];
    }
    // `--module all` means `--module *`
    else if (realKey === 'module' && value === 'all') {
      config[realKey] = '*';
    }
    // Normal occasion.
    else {
      config[realKey] = value;
    }
  });

  // Guarantee fields having value.
  if (pre) {
    // Current handling module name.
    typeof config.module === 'undefined' && (config.module = 'test/index');
    /**
     * Environment index.
     *
     * @example
     *
     * ```
     * 0 -> test
     * 1 -> prod
     * 2 -> other
     * ...
     * ```
     */
    typeof config.env === 'undefined' && (config.env = 0);
    // Local name.
    typeof config.local === 'undefined' && (config.local = '');
  }
};
