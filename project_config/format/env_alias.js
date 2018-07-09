const cloneDeep = require('lodash/cloneDeep');
const defaults = require('lodash/defaults');

// Default value.
const defaultValue = {
  test: 0,
  production: 1,
  prod: 1,
};

/**
 * Env value alias.
 *
 * And this should only be defined in `lila.config.js`
 *
 * @param config
 */
module.exports = config => {
  config.envAlias = !config.envAlias
    ? cloneDeep(defaultValue)
    : defaults(config.envAlias, cloneDeep(defaultValue));
};
