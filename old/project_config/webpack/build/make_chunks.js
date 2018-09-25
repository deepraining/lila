const keys = require('lodash/keys');
const concat = require('lodash/concat');

/**
 * Make `splitJsChunks`.
 *
 * @example
 *
 * ```
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
 * ```
 *
 * @param config
 */
module.exports = config => {
  if (!config.splitJs) {
    return;
  }

  config.splitJsChunks = {};

  const splitJsKeys = keys(config.splitJs);

  splitJsKeys.forEach((key, index) => {
    let i = index;
    let tmpKey;
    let chunks = [];

    config.splitJsChunks[key] = {};
    for (; i > -1; i -= 1) {
      tmpKey = splitJsKeys[i];
      chunks = concat(chunks, config.splitJs[tmpKey]);
    }

    config.splitJsChunks[key] = chunks;
  });

  config.splitJsKeys = splitJsKeys;
};
