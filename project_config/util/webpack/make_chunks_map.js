
'use strict';

var _ = require('lodash');

/**
 * make splitJsChunks
 *
 * example:
 *
 * splitJsMap: {
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
    if (!config.splitJsMap) return;

    config.splitJsChunks = {};

    var splitJsMapKeys = _.keys(config.splitJsMap);

    splitJsMapKeys.forEach((key, index) => {
        var i = index, tmpKey, chunks = [];

        config.splitJsChunks[key] = {};
        for (; i > -1; i--) {
            tmpKey = splitJsMapKeys[i];
            chunks = _.concat(chunks, config.splitJsMap[tmpKey]);
        }

        config.splitJsChunks[key] = chunks;
    });

    config.splitJsMapKeys = splitJsMapKeys;
};