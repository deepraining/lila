
var _ = require('lodash');
var fs = require('fs');
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

    },
    findChangedBuildResources: (gulp) => {
        return function findChangedBuildResources(cb) {

            // do not record files' changes
            if (!projectConfig.recordFileChanges) {
                return gulp.src(projectConfig.buildPaths.resources.buildDir + '/**/*')
                    .pipe(gulp.dest(projectConfig.buildPaths.resources.targetDir));
            }
            // record files' changes
            else if (fs.existsSync(projectConfig.buildPaths.resources.buildDir)) {
                // get changed files
                var changedFiles = findChangedFiles(projectConfig.buildPaths.resources.buildDir, 'resources');
                var completeChangedFiles = [];

                if (!_.isEmpty(changedFiles)) {

                    _.forEach(changedFiles, (value, key) => {
                        completeChangedFiles.push(projectConfig.buildPaths.resources.buildDir + '/' + key);
                        logger.info('changed: ' + key);
                    });

                    return gulp.src(completeChangedFiles, {base: projectConfig.buildPaths.resources.buildDir})
                        .pipe(gulp.dest(projectConfig.buildPaths.resources.targetDir));

                } else {
                    logger.info('Resources nothing changed!');
                    cb();
                }
            }
            else cb();

        }
    }
};