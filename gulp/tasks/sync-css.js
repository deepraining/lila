
module.exports = (gulp) => {

    // register task
    gulp.task('sync-css', gulp.series('dist-css', 'sync_static'));
};
