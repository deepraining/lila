
module.exports = (gulp) => {

    // register task
    gulp.task('sync-js', gulp.series('dist-js', 'sync_static'));
};
