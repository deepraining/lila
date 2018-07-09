const forEach = require('lodash/forEach');

const cliInfo = require('../../data/cli_info');

/**
 * Option for current command, it can override config root attribute.
 *
 * @param config
 */
module.exports = config => {
  const option = config.commandOptions && cliInfo.command && config.commandOptions[cliInfo.command];

  if (!option) {
    return;
  }

  forEach(option, (value, key) => {
    config[key] = value;
  });
};
