
var fs = require('fs');
var _ = require('lodash');

module.exports = (config) => {
    /**
     * custom config is defined in a `config.js` file
     */
    var jsFile = config.buildPaths.src.dir + '/' + config.module + '/config.js';

    // no custom
    if (!fs.existsSync(jsFile)) return;

    var json = require(jsFile);

    // config
    if (json) {
        var customEnvConfig = Array.isArray(json) ? json[config.env || 0] : json;

        customEnvConfig && _.forEach(customEnvConfig, (value, key) => {
            config[key] = value;
        });
    }
};