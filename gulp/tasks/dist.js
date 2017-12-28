
module.exports = (gulp) => {
    // register task
    gulp.task('dist', gulp.series('pre_dist', 'delete_manifests_bak'));
};
