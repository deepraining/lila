
var _ = require('lodash');
var del = require('del');
var ftp = require('gulp-ftp');
var sftp = require('gulp-sftp');

var projectConfig = require('../../project_config');
var defaultSyncFn = projectConfig.currentNetwork.useSsh ? sftp : ftp;
var nextIndex = require('../handle/next_index');

module.exports = (gulp) => {

    var delDist = () => {
        return del([projectConfig.buildPaths.dist.dir], {force: !0});
    };

    var syncStatic = () => {

        nextIndex.staticServer();

        var syncConfig = projectConfig.currentNetwork.staticServers[projectConfig.processingData.staticServerIndex];
        var syncFn = defaultSyncFn;

        typeof syncConfig.useSsh != 'undefined' && (syncFn = syncConfig.useSsh ? sftp : ftp);

        return gulp.src(projectConfig.buildPaths.dist.dir + '/**/*', {base: projectConfig.basePaths.webRoot})
            .pipe(syncFn(syncConfig));
    };

    var syncHtml = () => {

        nextIndex.webServer();

        var syncConfig = projectConfig.currentNetwork.webServers[projectConfig.processingData.webServerIndex];
        var syncFn = defaultSyncFn;

        typeof syncConfig.useSsh != 'undefined' && (syncFn = syncConfig.useSsh ? sftp : ftp);

        return gulp.src(projectConfig.buildPaths.dist.html + '/**/*', {base: projectConfig.buildPaths.dist.html})
            .pipe(syncFn(syncConfig));
    };

    var syncExtraDirectory = (cb) => {
        nextIndex.directoriesToSync();

        var syncConfig = projectConfig.currentNetwork.staticServers[projectConfig.processingData.staticServerIndex];
        var syncFn = defaultSyncFn;

        typeof syncConfig.useSsh != 'undefined' && (syncFn = syncConfig.useSsh ? sftp : ftp);

        var changedFiles = projectConfig.processingData.directoriesToSyncItems[projectConfig.processingData.directoriesToSyncKey].changedFiles;

        if (changedFiles && (typeof changedFiles == 'string' || changedFiles.length))
            return gulp.src(changedFiles, {base: projectConfig.basePaths.webRoot})
                .pipe(syncFn(syncConfig));
        else cb();
    };

    var syncStaticTasks = _.fill(new Array(projectConfig.currentNetwork.staticServers && projectConfig.currentNetwork.staticServers.length || 0), syncStatic);
    var syncWebTasks = _.fill(new Array(projectConfig.currentNetwork.webServers && projectConfig.currentNetwork.webServers.length || 0), syncHtml);

    var syncExtraDirectoryTasks = [];
    projectConfig.currentNetwork.staticServers &&
    projectConfig.currentNetwork.staticServers.length &&
    projectConfig.processingData.directoriesToSyncKeys &&
    projectConfig.processingData.directoriesToSyncKeys.length &&
    projectConfig.currentNetwork.staticServers.forEach(() => {
        syncExtraDirectoryTasks.push(nextIndex.staticServer);
        projectConfig.processingData.directoriesToSyncKeys.forEach(() => {
            syncExtraDirectoryTasks.push(syncExtraDirectory);
        });
    });

    var tasks = _.concat([], [
        'pre_dist'
    ],
        syncStaticTasks,
        syncExtraDirectoryTasks,
        syncWebTasks,
        [
            delDist,
            'delete_manifests_bak'
        ]
    );

    // register task
    gulp.task('sync', gulp.series.apply(this, tasks));
};
