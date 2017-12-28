
var browserSync = require('browser-sync');

var projectConfig = require('../../project_config');
var shareData = require('../../data/share');
var serverStyle = require('../../data/server_style');

module.exports = (gulp) => {

    var startServer = (cb) => {

        // create a browser-sync instance
        shareData.browser = browserSync.create();

        shareData.browser.init({
            server: projectConfig.basePaths.webRoot,
            port: projectConfig.serverPort,
            startPath: projectConfig.basePaths.webPrefix + '/dev/html/' + projectConfig.module + '.html',
            reloadDelay: 0,
            notify: {styles: serverStyle}
        });

        cb();
    };

    // register server task
    gulp.task('server', startServer);
};
