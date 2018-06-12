
const fill = require('lodash/fill');
const concat = require('lodash/concat');
const sftp = require('gulp-sftp');

const projectConfig = require('../../project_config');
const delDist = require('../dist/del/dist');
const nextWebServer = require('../dist/next/web_server');
const nextStaticServer = require('../dist/next/static_server');
const nextSyncDir = require('../dist/next/sync_dir');

/**
 * Register `sync` task.
 *
 * @param gulp
 */
module.exports = gulp => {

    const syncStatic = () => {
        nextStaticServer();

        const server = projectConfig.staticServers[projectConfig.processing.staticServerIndex];

        return gulp.src(projectConfig.buildPaths.dist.dir + '/**/*', {base: projectConfig.basePaths.webRoot})
            .pipe(sftp(server.options));
    };

    const syncHtml = () => {
        nextWebServer();

        const server = projectConfig.webServers[projectConfig.processing.webServerIndex];

        return gulp.src(projectConfig.buildPaths.dist.html + '/**/*', {base: projectConfig.buildPaths.dist.html})
            .pipe(sftp(server.options));
    };

    const syncDir = cb => {
        nextSyncDir();

        const server = projectConfig.staticServers[projectConfig.processing.staticServerIndex];

        const changedFiles = projectConfig.processing.syncDirItems[projectConfig.processing.syncDirKey].changedFiles;

        if (changedFiles && (typeof changedFiles === 'string' || changedFiles.length))
            return gulp.src(changedFiles, {base: projectConfig.basePaths.webRoot})
                .pipe(sftp(server.options));
        else cb();
    };

    const syncStaticTasks = fill(new Array(projectConfig.staticServers && projectConfig.staticServers.length || 0), syncStatic);
    const syncWebTasks = fill(new Array(projectConfig.webServers && projectConfig.webServers.length || 0), syncHtml);

    const syncDirTasks = [];
    projectConfig.staticServers &&
    projectConfig.staticServers.length &&
    projectConfig.processing.syncDirKeys &&
    projectConfig.processing.syncDirKeys.length &&
    projectConfig.staticServers.forEach(() => {
        syncDirTasks.push(nextStaticServer);
        projectConfig.processing.syncDirKeys.forEach(() => {
            syncDirTasks.push(syncDir);
        });
    });

    const tasks = concat([], [
        'pre_dist'
    ],
        syncStaticTasks,
        syncDirTasks,
        syncWebTasks,
        [
            delDist,
            'del_bak_manifests'
        ]
    );

    // Register task.
    gulp.task('sync', gulp.series.apply(null, tasks));
};
