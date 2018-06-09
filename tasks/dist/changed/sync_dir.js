
const isEmpty = require('lodash/isEmpty');
const forEach = require('lodash/forEach');
const capitalize = require('lodash/capitalize');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');
const findChangedFiles = require('../util/changed_files');
const next = require('../next/sync_dir');

/**
 * Get changed files of `directoriesToSync`.
 *
 * @param cb
 */
module.exports = cb => {
    next();

    const currentKey = projectConfig.processing.syncDirKey;
    const currentItem = projectConfig.processing.syncDirItems[currentKey];
    const dirPath = currentItem.path;

    // Enabled.
    if (projectConfig.recordFileChanges) {
        // Get changed files.
        const changedFiles = findChangedFiles(dirPath, currentKey);
        const changedFilesPaths = [];

        // Not empty.
        if (!isEmpty(changedFiles)) {

            forEach(changedFiles, (value, key) => {
                changedFilesPaths.push(dirPath + '/' + key);
                logger.info(`    File changed: ${key}.`);
            });

            currentItem.changedFiles = changedFilesPaths;

        }
        else {
            logger.info(`
    ${capitalize(currentKey)} nothing changed.            
            `);
        }
    }
    // Disabled.
    else {
        currentItem.changedFiles = dirPath + '/**/*';
    }

    cb();

};
