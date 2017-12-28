
var _ = require('lodash');

var projectConfig = require('../../project_config');
var distDel = require('../dist/del');
var distCopyBase = require('../dist/copy_base');
var distMisc = require('../dist/misc');
var distChangeBase = require('../dist/change_base');
var distBackup = require('../dist/backup');
var distTasks = require('../dist/tasks');

module.exports = (gulp) => {

    var delDist = distDel.delDist;
    var delCopiedDev = distDel.delCopiedDev;
    var delDistStore = distDel.delDistStore;

    var copyDev = distCopyBase.copyDev;
    var copyManifests = distCopyBase.copyManifests;
    var copyDistStore = distCopyBase.copyDistStore;

    var logFirstModule = distMisc.logFirstModule;

    var findChangedDirectoriesToSync = distChangeBase.directoriesToSync;

    var backupHtml = distBackup.backupHtml;

    var findChangedDirectoriesToSyncTasks = _.fill(
        new Array(projectConfig.processingData.directoriesToSyncKeys && projectConfig.processingData.directoriesToSyncKeys.length || 0),
        findChangedDirectoriesToSync
    );

    var tasks = _.concat([],
        [
            delCopiedDev,
            delDist,
            copyDev,
            copyManifests,
            logFirstModule
        ],
            distTasks(gulp),
            findChangedDirectoriesToSyncTasks,
        [
            copyDistStore,
            backupHtml,
            delCopiedDev,
            delDistStore
        ]);

    // register task
    gulp.task('pre_dist', gulp.series.apply(this, tasks));
};

