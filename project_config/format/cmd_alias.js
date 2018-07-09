const cloneDeep = require('lodash/cloneDeep');
const defaults = require('lodash/defaults');

// Default value.
const defaultValue = {
  e: 'env', // Environment.
  l: 'local', // Local name
  o: 'out', // Whether to use out resolve alias.
  w: 'onlyWebpack', // Only run webpack task, without gulp, for dist and sync command.
};

/**
 * Command argument alias.
 *
 * And this should only be defined in `lila.config.js`
 *
 * @param config
 */
module.exports = config => {
  config.cmdAlias = !config.cmdAlias
    ? cloneDeep(defaultValue)
    : defaults(config.cmdAlias, cloneDeep(defaultValue));
};
