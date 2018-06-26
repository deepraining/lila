
const fs = require('fs');
const path = require('path');

const logger = require('../util/logger');
const projectConfig = require('../project_config');

/**
 * Try mock data.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    let { url, method } = req;

    let urls = url.split('/');
    let filename = urls[urls.length - 1];

    // Don't have `.`
    if (filename.indexOf('.') < 0) {
        let filePath = path.join(projectConfig.basePaths.webRoot, url + '.js');
        if (fs.existsSync(filePath)) {
            logger.success(`
Mock[${method}] ${url}
=>
${filePath}            
            `);
            // Disable cache.
            require.cache[filePath] && delete require.cache[filePath];
            require(filePath)(req, res);
            return;
        }
    }

    next();
};
