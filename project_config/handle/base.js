
"use strict";

var _ = require('lodash');

module.exports = (config) => {

    /**
     * processing data bind to config
     * @type {{}}
     */
    config.processingData = {};

    // network option of current environment
    config.currentNetworkOption = config.networkOptions && config.networkOptions[config.env]  || {};
};