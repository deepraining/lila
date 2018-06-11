
const _ = require('lodash');
const del = require('del');
const ftp = require('gulp-ftp');
const sftp = require('gulp-sftp');

const projectConfig = require('../../project_config');
const defaultSyncFn = projectConfig.currentNetwork.useSsh ? sftp : ftp;
const nextIndex = require('../handle/next_index');

module.exports = (gulp) => {

    const delDist = () => {
        return del([projectConfig.buildPaths.dist.dir], {force: !0});
    };

    const syncStatic = () => {

        nextIndex.staticServer();

        const syncConfig = projectConfig.currentNetwork.staticServers[projectConfig.processing.staticServerIndex];
        let syncFn = defaultSyncFn;

        typeof syncConfig.useSsh != 'undefined' && (syncFn = syncConfig.useSsh ? sftp : ftp);

        return gulp.src(projectConfig.buildPaths.dist.dir + '/**/*', {base: projectConfig.basePaths.webRoot})
            .pipe(syncFn(syncConfig));
    };

    const syncHtml = () => {

        nextIndex.webServer();

        const syncConfig = projectConfig.currentNetwork.webServers[projectConfig.processing.webServerIndex];
        let syncFn = defaultSyncFn;

        typeof syncConfig.useSsh != 'undefined' && (syncFn = syncConfig.useSsh ? sftp : ftp);

        return gulp.src(projectConfig.buildPaths.dist.html + '/**/*', {base: projectConfig.buildPaths.dist.html})
            .pipe(syncFn(syncConfig));
    };

    const syncExtraDirectory = (cb) => {
        nextIndex.directoriesToSync();

        const syncConfig = projectConfig.currentNetwork.staticServers[projectConfig.processing.staticServerIndex];
        let syncFn = defaultSyncFn;

        typeof syncConfig.useSsh != 'undefined' && (syncFn = syncConfig.useSsh ? sftp : ftp);

        const changedFiles = projectConfig.processing.syncDirItems[projectConfig.processing.syncDirKey].changedFiles;

        if (changedFiles && (typeof changedFiles == 'string' || changedFiles.length))
            return gulp.src(changedFiles, {base: projectConfig.basePaths.webRoot})
                .pipe(syncFn(syncConfig));
        else cb();
    };

    const syncStaticTasks = _.fill(new Array(projectConfig.currentNetwork.staticServers && projectConfig.currentNetwork.staticServers.length || 0), syncStatic);
    const syncWebTasks = _.fill(new Array(projectConfig.currentNetwork.webServers && projectConfig.currentNetwork.webServers.length || 0), syncHtml);

    const syncExtraDirectoryTasks = [];
    projectConfig.currentNetwork.staticServers &&
    projectConfig.currentNetwork.staticServers.length &&
    projectConfig.processing.syncDirKeys &&
    projectConfig.processing.syncDirKeys.length &&
    projectConfig.currentNetwork.staticServers.forEach(() => {
        syncExtraDirectoryTasks.push(nextIndex.staticServer);
        projectConfig.processing.syncDirKeys.forEach(() => {
            syncExtraDirectoryTasks.push(syncExtraDirectory);
        });
    });

    const tasks = _.concat([], [
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
