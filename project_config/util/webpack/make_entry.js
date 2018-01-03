
'use strict';

var getJsEntryPath = require('../get_js_entry_path');


/**
 * make entry of webpack.config
 *
 * example:
 *
 * current module: test/index
 *
 * current splitJsMap: {
 *     vendor: ['jquery', 'underscore'],
 *     vendor2: ['react', 'react-dom'],
 *     common: ['alias/base', 'alias/common']
 * }
 *
 * result: {
 *     index: 'absolute/path/to/test/index.js',
 *     vendor: ['jquery', 'underscore'],
 *     vendor2: ['react', 'react-dom', 'jquery', 'underscore'],
 *     common: ['alias/base', 'alias/common', 'react', 'react-dom', 'jquery', 'underscore']
 * }
 *
 * @param config
 */
module.exports = (config) => {

    var entry = {};

    entry[config.moduleName] = getJsEntryPath(config);

    config.splitJsMapKeys && config.splitJsMapKeys.forEach((key) => {
        entry[key] = config.splitJsChunks[key];
    });

    return entry;
};