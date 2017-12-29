
var _ = require('lodash');
var projectConfig = require('../../project_config');
var findChangedFiles = require('../handle/find_changed_files');
var nextIndex = require('../handle/next_index');

module.exports = {
    directoriesToSync: (cb) => {
        nextIndex.directoriesToSync();

        var currentKey = projectConfig.processingData.directoriesToSyncKey;
        var currentItem = projectConfig.processingData.directoriesToSyncItems[currentKey];
        var dirPath = currentItem.path;

        // enable recording file's changes
        if (projectConfig.recordFileChanges) {
            // get changed files
            var changedFiles = findChangedFiles(dirPath, currentKey);
            var completeChangedFiles = [];

            // not empty
            if (!_.isEmpty(changedFiles)) {

                _.forEach(changedFiles, (value, key) => {
                    completeChangedFiles.push(dirPath + '/' + key);
                    logger.info('changed: ' + key);
                });

                currentItem.changedFiles = completeChangedFiles;

            }
            // empty
            else {
                logger.info(_.capitalize(currentKey) + ' nothing changed!');
            }
        }
        // otherwise is all files
        else {
            currentItem.changedFiles = dirPath + '/**/*';
        }

        cb();

    }
};