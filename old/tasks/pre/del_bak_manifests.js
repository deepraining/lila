const del = require('del');
const pathInfo = require('../../data/path_info');

/**
 * Register Delete bak manifests task.
 * @param gulp
 */
module.exports = gulp => {
  gulp.task('del_bak_manifests', () => {
    return del([pathInfo.manifestsBakDir], { force: !0 });
  });
};
