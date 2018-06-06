
const fs = require('fs');
const _ = require('lodash');

module.exports = (config) => {
    /**
     * custom config is defined in a `config.js` file
     */
    const jsFile = config.buildPaths.src.dir + '/' + config.module + '/config.js';

    // no custom
    if (!fs.existsSync(jsFile)) return;

    const json = require(jsFile);

    // config
    if (json) {
        const customEnvConfig = Array.isArray(json) ? json[config.env || 0] : json;

        customEnvConfig && _.forEach(customEnvConfig, (value, key) => {
            config[key] = value;
        });
    }
};
