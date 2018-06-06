
const vars = require('../../data/vars');
const del = require('del');

module.exports = (gulp) => {

    // delete bak manifests
    gulp.task('delete_manifests_bak', () => {
        return del([vars.manifestsBakDir], {force: !0});
    });
};
