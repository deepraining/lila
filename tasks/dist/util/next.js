
const projectConfig = require('../../../project_config');
const allConfigs = require('../../../project_config/all');
const logger = require('../../../util/logger');

const current = require('../current');

/**
 * Get next module to process.
 *
 * @param log
 */
module.exports = log => {
    if (!projectConfig.multiple) return;

    log && logger.success(`
    Finish building module '${projectConfig.allModules[current.index]}'.
    `);

    current.index += 1;

    current.index >= projectConfig.allModules.length && (current.index = 0);

    // If current index has go to the first, don't log.
    log && current.index > 0 && logger.success(`
    Start building module '${projectConfig.allModules[current.index]}'.
    `);

    current.config = allConfigs[current.index];
};
