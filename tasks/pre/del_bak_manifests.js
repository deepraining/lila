const pathInfo = require('../../data/path_info');
const del = require('del');

/**
 * Register Delete bak manifests task.
 * @param gulp
 */
module.exports = gulp => {
  gulp.task('del_bak_manifests', () => {
    return del([pathInfo.manifestsBakDir], { force: !0 });
  });
};
