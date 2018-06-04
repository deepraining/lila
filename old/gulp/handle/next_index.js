
"use strict";

var projectConfig = require('../../project_config');

module.exports = {
    /**
     * next directoriesToSync index
     */
    directoriesToSync: () => {
        // has directories to sync
        if (projectConfig.processingData.directoriesToSyncKeys) {
            if (typeof projectConfig.processingData.directoriesToSyncIndex == 'undefined')
                projectConfig.processingData.directoriesToSyncIndex = 0;

            projectConfig.processingData.directoriesToSyncKey =
                projectConfig.processingData.directoriesToSyncKeys[projectConfig.processingData.directoriesToSyncIndex];

            projectConfig.processingData.directoriesToSyncIndex += 1;

            if (projectConfig.processingData.directoriesToSyncIndex >= projectConfig.processingData.directoriesToSyncKeys.length)
                projectConfig.processingData.directoriesToSyncIndex = 0;
        }
    },
    /**
     * next webServer index
     */
    webServer: () => {
        if (projectConfig.currentNetwork.webServers && projectConfig.currentNetwork.webServers.length) {
            if (typeof projectConfig.processingData.webServerIndex == 'undefined') {
                projectConfig.processingData.webServerIndex = 0
            }
            else {
                projectConfig.processingData.webServerIndex += 1;

                if (projectConfig.processingData.webServerIndex >= projectConfig.currentNetwork.webServers.length)
                    projectConfig.processingData.webServerIndex = 0;
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
            if (typeof projectConfig.processingData.staticServerIndex == 'undefined') {
                projectConfig.processingData.staticServerIndex = 0
            }
            else {
                projectConfig.processingData.staticServerIndex += 1;

                if (projectConfig.processingData.staticServerIndex >= projectConfig.currentNetwork.staticServers.length)
                    projectConfig.processingData.staticServerIndex = 0;
            }
        }

        cb && cb();
    }
};