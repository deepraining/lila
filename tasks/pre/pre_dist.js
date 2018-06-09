
const fill = require('lodash/fill');
const concat = require('lodash/concat');

const projectConfig = require('../../project_config');

const delDist = require('../dist/del/dist');
const delStore = require('../dist/del/store');
const delAnalyze = require('../dist/del/analyze');

const copyManifests = require('../dist/copy/manifests');
const copyToDist = require('../dist/copy/to_dist');

const logFirstModule = require('../dist/misc/log_first_module');
const renameHtml = require('../dist/misc/rename_html');
const backupHtml = require('../dist/misc/backup_html');

const distChangeExtra = require('../dist/change_extra');
const distTasks = require('../dist/tasks');

module.exports = (gulp) => {
    const findChangedDirectoriesToSync = distChangeExtra.findChangedDirectoriesToSync;

    const findChangedDirectoriesToSyncTasks = fill(
        new Array(projectConfig.processing.syncDirKeys && projectConfig.processing.syncDirKeys.length || 0),
        findChangedDirectoriesToSync
    );

    const tasks = concat([],
        [
            delAnalyze,
            delDist,
            copyManifests,
            logFirstModule
        ],
            distTasks(gulp),
            findChangedDirectoriesToSyncTasks,
        [
            copyToDist,
            renameHtml,
            backupHtml,
            delStore
        ]);

    // Register task.
    gulp.task('pre_dist', gulp.series.apply(null, tasks));
};

