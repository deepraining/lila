
var _ = require('lodash');
var del = require('del');
var ftp = require('gulp-ftp');
var sftp = require('gulp-sftp');

var projectConfig = require('../../project_config');
var defaultSyncFn = projectConfig.currentNetworkOption.useSsh ? sftp : ftp;
var nextIndex = require('../handle/next_index');

module.exports = (gulp) => {

    var delDist = () => {
        return del([projectConfig.buildPaths.dist.dir], {force: !0});
    };

    var syncStatic = () => {

        nextIndex.staticServer();

        var syncConfig = projectConfig.currentNetworkOption.staticServers[projectConfig.processingData.staticServerIndex];
        var syncFn = defaultSyncFn;

        typeof syncConfig.useSsh != 'undefined' && (syncFn = syncConfig.useSsh ? sftp : ftp);

        return gulp.src(projectConfig.buildPaths.dist.dir + '/**/*', {base: projectConfig.basePaths.webRoot})
            .pipe(syncFn(syncConfig));
    };

    var syncStaticTasks = _.fill(new Array(projectConfig.currentNetworkOption.staticServers && projectConfig.currentNetworkOption.staticServers.length || 0), syncStatic);

    var tasks = _.concat([],
        syncStaticTasks,
        [
            delDist
        ]

    );

    // register task
    gulp.task('sync_static', gulp.series.apply(this, tasks));
};
