
const fs = require('fs');
const forEach = require('lodash/forEach');

/**
 * Custom config for each module.
 *
 * @param config
 */
module.exports = config => {
    // Custom config is defined in a `config.js` file of each module's workspace.
    const configFile = config.buildPaths.src.dir + '/' + config.module + '/config.js';

    // No custom config.
    if (!fs.existsSync(configFile)) return;

    const customConfig = require(configFile);

    if (!customConfig) return;

    const customEnvConfig = Array.isArray(customConfig) ? customConfig[config.env || 0] : customConfig;

    if (!customEnvConfig) return;

    forEach(customEnvConfig, (value, key) => {
        config[key] = value;
    });
};
