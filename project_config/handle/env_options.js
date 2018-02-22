
"use strict";

var _ = require('lodash');

module.exports = (config) => {

    var envOption = config.envOptions && config.envOptions[config.env];
    /**
     * build option of current environment can override config root attribute
     */
    if (envOption) {
        _.forEach(envOption, (value, key) => {
            config[key] = value;
        });
    }
};