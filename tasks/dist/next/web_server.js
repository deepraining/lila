
const projectConfig = require('../../../project_config');


/**
 * Next `webServer` index.
 */
module.exports = () => {
    if (!projectConfig.webServers || !projectConfig.webServers.length) return;

    if (typeof projectConfig.processing.webServerIndex === 'undefined') {
        projectConfig.processing.webServerIndex = 0
    }
    else {
        projectConfig.processing.webServerIndex += 1;

        if (projectConfig.processing.webServerIndex >= projectConfig.webServers.length)
            projectConfig.processing.webServerIndex = 0;
    }
};
