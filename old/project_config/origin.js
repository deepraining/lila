const fs = require('fs');

const pathInfo = require('../data/path_info');

const config = fs.existsSync(pathInfo.configFilePath) ? require(pathInfo.configFilePath) : {};

/**
 *
 * Original project config.
 *
 */
module.exports = config;
