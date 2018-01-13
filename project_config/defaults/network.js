
"use strict";

var fillNetwork = require('./fill_network');

module.exports = (config) => {
    if (config.network) {
        var network = config.network;
        config.network = [];

        network.forEach((option) => {
            config.network.push(fillNetwork(option))
        })
    }
};