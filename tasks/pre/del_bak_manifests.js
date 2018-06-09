
const argv = require('../../data/argv');
const del = require('del');

/**
 * Register Delete bak manifests task.
 * @param gulp
 */
module.exports = gulp => {

    gulp.task('del_bak_manifests', () => {

        return del([argv.manifestsBakDir], {force: !0});
    });
};
