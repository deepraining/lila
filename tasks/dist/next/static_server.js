
const projectConfig = require('../../../project_config');


/**
 * Next `staticServer` index.
 */
module.exports = function nextStaticServer(cb) {
    if (!projectConfig.staticServers || !projectConfig.staticServers.length) return cb();

    if (typeof projectConfig.processing.staticServerIndex === 'undefined') {
        projectConfig.processing.staticServerIndex = 0
    }
    else {
        projectConfig.processing.staticServerIndex += 1;

        if (projectConfig.processing.staticServerIndex >= projectConfig.staticServers.length)
            projectConfig.processing.staticServerIndex = 0;
    }

    cb && cb();
};
