/**
 * Register `dist` task.
 * @param gulp
 */
module.exports = gulp => {
  gulp.task('dist', gulp.series('pre_dist', 'del_bak_manifests'));
};
