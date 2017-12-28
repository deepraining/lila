
"use strict";

var _ = require('lodash');

module.exports = (config) => {

    var buildOption = config.buildOptions && config.buildOptions[config.env];
    /**
     * build option of current environment can override config root attribute
     */
    if (buildOption) {
        _.forEach(buildOption, (value, key) => {
            config[key] = value;
        });
    }
};