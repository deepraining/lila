
var _ = require('lodash');

/**
 * make splitJsChunks
 *
 * example:
 *
 * splitJs: {
 *     vendor: ['jquery', 'underscore'],
 *     vendor2: ['react', 'react-dom'],
 *     common: ['alias/base', 'alias/common']
 * }
 *
 * splitJsChunks: {
 *     vendor: ['jquery', 'underscore'],
 *     vendor2: ['react', 'react-dom', 'jquery', 'underscore'],
 *     common: ['alias/base', 'alias/common', 'react', 'react-dom', 'jquery', 'underscore']
 * }
 *
 * @param config
 */
module.exports = (config) => {
    if (!config.splitJs) return;

    config.splitJsChunks = {};

    var splitJsKeys = _.keys(config.splitJs);

    splitJsKeys.forEach((key, index) => {
        var i = index, tmpKey, chunks = [];

        config.splitJsChunks[key] = {};
        for (; i > -1; i--) {
            tmpKey = splitJsKeys[i];
            chunks = _.concat(chunks, config.splitJs[tmpKey]);
        }

        config.splitJsChunks[key] = chunks;
    });

    config.splitJsKeys = splitJsKeys;
};
