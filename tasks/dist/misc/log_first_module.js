
const logger = require('../../../util/logger');
const projectConfig = require('../../../project_config');

/**
 * Log first module's starts.
 *
 * @param cb
 */
module.exports = cb => {

    if (projectConfig.multiple)
        logger.info(`
    Start building module '${projectConfig.allModules[0]}'.    
        `);


    cb();
};
