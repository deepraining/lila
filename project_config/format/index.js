
const basePaths = require('./base_paths');

/**
 * Format import config to a new one which lila needed.
 *
 * @param config
 */
module.exports = config => {
    basePaths(config);

    return config;
};
