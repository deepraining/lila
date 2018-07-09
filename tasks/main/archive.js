/**
 * Register `archive` task.
 *
 * @param gulp
 */
module.exports = gulp => {
  gulp.task('archive', gulp.series('pre_archive'));
};
