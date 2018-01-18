
var _ = require('lodash');

var projectConfig = require('../../project_config');
var distDel = require('../dist/del');
var distCopy = require('../dist/copy');
var distMisc = require('../dist/misc');
var distChangeExtra = require('../dist/change_extra');
var distBackup = require('../dist/backup');
var distTasks = require('../dist/tasks');

module.exports = (gulp) => {

    var delDist = distDel.delDist;
    var delCopiedDev = distDel.delCopiedDev;
    var delDistStore = distDel.delDistStore;
    var delBuildResources = distDel.delBuildResources;
    var delBuildResourcesJs = distDel.delBuildResourcesJs;

    var copyDev = distCopy.copyDev;
    var copyManifests = distCopy.copyManifests;
    var copyDistStore = distCopy.copyDistStore;

    var logFirstModule = distMisc.logFirstModule;

    var findChangedDirectoriesToSync = distChangeExtra.directoriesToSync;
    var findChangedBuildResources = distChangeExtra.findChangedBuildResources(gulp);

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
        [
            delBuildResourcesJs,
            findChangedBuildResources
        ],
            findChangedDirectoriesToSyncTasks,
        [
            copyDistStore,
            backupHtml,
            delBuildResources,
            delCopiedDev,
            delDistStore
        ]);

    // register task
    gulp.task('pre_dist', gulp.series.apply(this, tasks));
};

