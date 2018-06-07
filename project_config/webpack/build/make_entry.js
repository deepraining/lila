
const getJsEntryPath = require('./get_js_entry_path');


/**
 * make entry of webpack.config
 *
 * example:
 *
 * current module: test/index
 *
 * current splitJs: {
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

    const entry = {};

    entry[config.moduleName] = getJsEntryPath(config);

    config.splitJsKeys && config.splitJsKeys.forEach((key) => {
        entry[key] = config.splitJsChunks[key];
    });

    return entry;
};
