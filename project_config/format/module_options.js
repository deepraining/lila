
const forEach = require('lodash/forEach');

/**
 * Option for special module, it can override config root attribute.
 *
 * And this should only be defined in `lila.config.js`
 *
 * @param config
 */
module.exports = config => {
    let option = config.moduleOptions && config.moduleOptions[config.module];

    if (!option) return;

    forEach(option, (value, key) => {
        config[key] = value;
    });
};
