
const emptyOrArray = require('../../../util/empty_or_array');
const pathInfo = require('../../../data/path_info');


/**
 * Check plugins defined in `lila.config.js` is valid.
 *
 * @param config
 */
module.exports = config => {
    if (config.plugins) {
        // Plugins must be an array.
        emptyOrArray(config.plugins, `
    'plugins' defined in '${pathInfo.configFile}' must be an array.    
        `);
        config.webpack.plugins = config.plugins;
    }
    else if (config.webpack.plugins) {
        emptyOrArray(config.webpack.plugins, `
    'webpack.plugins' defined in '${pathInfo.configFile}' must be an array.    
        `);
    }
    else {
        config.webpack.plugins = [];
    }
};
