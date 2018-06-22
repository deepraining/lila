
const startsWith = require('lodash/startsWith');
const forEach = require('lodash/forEach');
const keys = require('lodash/keys');

/**
 * Option for special module, it can override config root attribute.
 *
 * And this should only be defined in `lila.config.js`
 *
 * @param config
 */
module.exports = config => {
    if (!config.moduleOptions) return;

    let option = config.moduleOptions[config.module];

    // Exist single module options.
    if (option) {
        forEach(option, (value, key) => {
            config[key] = value;
        });
        return;
    }

    // `moduleOptions` keys.
    let moduleKeys = keys(config.moduleOptions);

    moduleKeys.forEach(key => {
        // Found.
        if (option) return;

        let moduleOption = config.moduleOptions[key];

        /**
         * Multiple modules splitting by ',', `test-2/index,test-3/index,test-4/*`
         *
         * @type {*|string[]}
         */
        let keyArray = key.split(',');

        // Found.
        if (keyArray.indexOf(config.module) > -1) {
            option = moduleOption;
            return;
        }

        keyArray.forEach(oneModule => {
            // Found.
            if (option) return;

            // Not wildcard mode.
            if (oneModule.slice(-1) !== '*') return;

            // Wildcard, `test-4/*`.
            if (startsWith(config.module, oneModule.slice(0, -1))) {
                option = moduleOption;
            }
        });
    });

    option && forEach(option, (value, key) => {
        config[key] = value;
    });
};
