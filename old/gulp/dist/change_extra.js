
const _ = require('lodash');
const fs = require('fs');
const projectConfig = require('../../project_config');
const findChangedFiles = require('../handle/find_changed_files');
const nextIndex = require('../handle/next_index');

module.exports = {
    findChangedDirectoriesToSync: (cb) => {
        nextIndex.directoriesToSync();

        const currentKey = projectConfig.processing.directoriesToSyncKey;
        const currentItem = projectConfig.processing.directoriesToSyncItems[currentKey];
        const dirPath = currentItem.path;

        // enable recording file's changes
        if (projectConfig.recordFileChanges) {
            // get changed files
            const changedFiles = findChangedFiles(dirPath, currentKey);
            const completeChangedFiles = [];

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
