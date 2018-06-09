
const projectConfig = require('../../project_config');

module.exports = {
    /**
     * next webServer index
     */
    webServer: () => {
        if (projectConfig.currentNetwork.webServers && projectConfig.currentNetwork.webServers.length) {
            if (typeof projectConfig.processing.webServerIndex == 'undefined') {
                projectConfig.processing.webServerIndex = 0
            }
            else {
                projectConfig.processing.webServerIndex += 1;

                if (projectConfig.processing.webServerIndex >= projectConfig.currentNetwork.webServers.length)
                    projectConfig.processing.webServerIndex = 0;
            }
        }
    },
    /**
     * next staticServer index
     *
     * @param cb
     */
    staticServer: (cb) => {
        if (projectConfig.currentNetwork.staticServers && projectConfig.currentNetwork.staticServers.length) {
            if (typeof projectConfig.processing.staticServerIndex == 'undefined') {
                projectConfig.processing.staticServerIndex = 0
            }
            else {
                projectConfig.processing.staticServerIndex += 1;

                if (projectConfig.processing.staticServerIndex >= projectConfig.currentNetwork.staticServers.length)
                    projectConfig.processing.staticServerIndex = 0;
            }
        }

        cb && cb();
    }
};
