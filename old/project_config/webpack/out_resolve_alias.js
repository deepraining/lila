const forEach = require('lodash/forEach');

/**
 * Handle `outResolveAlias`.
 *
 * @param config
 */
module.exports = config => {
  if (config.outResolveAlias && config.out) {
    !config.resolveAlias && (config.resolveAlias = {});

    forEach(config.outResolveAlias, (value, key) => {
      config.resolveAlias[key] = value;
    });
  }
};
