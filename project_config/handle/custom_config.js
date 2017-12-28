
var fs = require('fs');
var _ = require('lodash');

module.exports = (config) => {
    /**
     * custom config is defined in a js file whose file name is the same with current module name,
     * and is also in the same directory
     *
     * example:
     *     test/index.html -> test/index.js
     */
    var jsFile = config.buildPaths.dev.html + '/' + config.module + '.js';

    // no custom
    if (!fs.existsSync(jsFile)) return;

    var json = require(jsFile);

    // config
    if (json.config) {
        var customEnvConfig = Array.isArray(json.config) ? json.config[config.env || 0] : json.config;

        customEnvConfig && _.forEach(customEnvConfig, (value, key) => {
            config[key] = value;
        });
    }

    // extra js entry modules despite the main entry module
    if (config.useRequireJs && json.extraJsEntryModules) {
        // ensure it is an array
        !Array.isArray(json.extraJsEntryModules) && (json.extraJsEntryModules = [json.extraJsEntryModules]);

        config.hasExtraJsEntryModules = !0;
        config.extraJsEntryModules = json.extraJsEntryModules;
    }
};