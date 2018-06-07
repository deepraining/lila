
const projectConfig = require('../../project_config');

module.exports = {
    /**
     * next directoriesToSync index
     */
    directoriesToSync: () => {
        // has directories to sync
        if (projectConfig.processing.directoriesToSyncKeys) {
            if (typeof projectConfig.processing.directoriesToSyncIndex == 'undefined')
                projectConfig.processing.directoriesToSyncIndex = 0;

            projectConfig.processing.directoriesToSyncKey =
                projectConfig.processing.directoriesToSyncKeys[projectConfig.processing.directoriesToSyncIndex];

            projectConfig.processing.directoriesToSyncIndex += 1;

            if (projectConfig.processing.directoriesToSyncIndex >= projectConfig.processing.directoriesToSyncKeys.length)
                projectConfig.processing.directoriesToSyncIndex = 0;
        }
    },
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
