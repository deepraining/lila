
const _ = require('lodash');

module.exports = (config) => {
    // no directories
    if (!config.directoriesToSync || !_.keys(config.directoriesToSync).length) return;

    config.processingData.directoriesToSyncKeys = _.keys(config.directoriesToSync);

    config.processingData.directoriesToSyncItems = {};

    config.processingData.directoriesToSyncKeys.forEach((key) => {
        // absolute path
        const path = config.basePaths.webRoot + '/' + config.directoriesToSync[key];
        // last slash index
        const lastSlashIndex = path.lastIndexOf('/');
        const item = {
            path: path
        };

        if (lastSlashIndex === -1 ) {
            item.dirName = path;
            item.parentDir = './';
        }
        else {
            item.dirName = path.slice(lastSlashIndex + 1);
            item.parentDir = path.slice(0, lastSlashIndex);
        }

        // add an item
        config.processingData.directoriesToSyncItems[key] = item;
    });
};
