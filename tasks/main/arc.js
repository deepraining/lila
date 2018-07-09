/**
 * Register `arc` task.
 *
 * @param gulp
 */
module.exports = gulp => {
  gulp.task('arc', gulp.series('pre_archive'));
};
