
const _ = require('lodash');

module.exports = (config) => {

    /**
     * processing data bind to config
     * @type {{}}
     */
    config.processing = {};

    // network of current environment
    config.currentNetwork = config.network && config.network[config.env]  || {};
};
