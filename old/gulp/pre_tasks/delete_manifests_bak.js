
"use strict";

var vars = require('../../data/vars');
var del = require('del');

module.exports = (gulp) => {

    // delete bak manifests
    gulp.task('delete_manifests_bak', () => {
        return del([vars.manifestsDirBak], {force: !0});
    });
};
