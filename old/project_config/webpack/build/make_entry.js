const getJsEntryPath = require('../util/get_js_entry_path');

/**
 * Make `webpack.entry`.
 *
 * @example
 *
 * Current module: test/index.
 *
 * Current splitJs:
 *
 * ```
 * {
 *     vendor: ['jquery', 'underscore'],
 *     vendor2: ['react', 'react-dom'],
 *     common: ['alias/base', 'alias/common']
 * }
 * ```
 *
 * Result:
 *
 * ```
 * {
 *     index: 'absolute/path/to/test/index/index.js',
 *     vendor: ['jquery', 'underscore'],
 *     vendor2: ['react', 'react-dom', 'jquery', 'underscore'],
 *     common: ['alias/base', 'alias/common', 'react', 'react-dom', 'jquery', 'underscore']
 * }
 * ```
 *
 * @param config
 */
module.exports = config => {
  const entry = {};

  entry[config.moduleName] = getJsEntryPath(config);

  config.splitJsKeys &&
    config.splitJsKeys.forEach(key => {
      entry[key] = config.splitJsChunks[key];
    });

  config.webpack.entry = entry;
};
