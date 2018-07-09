const forEach = require('lodash/forEach');

/**
 * Option for current environment, it can override config root attribute.
 *
 * @param config
 */
module.exports = config => {
  const option = config.envOptions && config.envOptions[config.env];

  if (!option) {
    return;
  }

  forEach(option, (value, key) => {
    config[key] = value;
  });
};
