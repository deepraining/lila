const fs = require('fs');
const pathInfo = require('../data/path_info');
const logger = require('../util/logger');

/**
 *
 * Check if `lila.config.js` file exists in cwd.
 *
 */
module.exports = () => {
  if (!fs.existsSync(pathInfo.configFilePath)) {
    logger.error(`
    'Missing config file '${
      pathInfo.configFile
    }' in project root directory, and it's required by lila.'    
        `);
    process.exit(1);
  }
};
