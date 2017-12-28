
"use strict";

var networkOption = require('./network_option');

module.exports = (config) => {
    if (config.networkOptions) {
        var networkOptions = config.networkOptions;
        config.networkOptions = [];

        networkOptions.forEach((option) => {
            config.networkOptions.push(networkOption(option))
        })
    }
};