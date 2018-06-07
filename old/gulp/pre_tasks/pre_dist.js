
const _ = require('lodash');

const projectConfig = require('../../project_config');
const distDel = require('../dist/del');
const distCopy = require('../dist/copy');
const distMisc = require('../dist/misc');
const distChangeExtra = require('../dist/change_extra');
const distBackup = require('../dist/backup');
const distRename = require('../dist/rename');
const distTasks = require('../dist/tasks');

module.exports = (gulp) => {

    const delDev = distDel.delDev;
    const delDist = distDel.delDist;
    const delStore = distDel.delStore;

    const copyManifests = distCopy.copyManifests;
    const copyToDist = distCopy.copyToDist;

    const logFirstModule = distMisc.logFirstModule;

    const findChangedDirectoriesToSync = distChangeExtra.findChangedDirectoriesToSync;

    const backupHtml = distBackup.backupHtml;

    const renameHtml = distRename.renameHtml;

    const findChangedDirectoriesToSyncTasks = _.fill(
        new Array(projectConfig.processing.syncDirKeys && projectConfig.processing.syncDirKeys.length || 0),
        findChangedDirectoriesToSync
    );

    const tasks = _.concat([],
        [
            delDev,
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

    // register task
    gulp.task('pre_dist', gulp.series.apply(this, tasks));
};

