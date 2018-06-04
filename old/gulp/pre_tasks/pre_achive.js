
'use strict';

var zip = require('gulp-zip');
var moment = require('moment');
var vars = require('../../data/vars');

module.exports = (gulp) => {

    // register pre_archive task
    gulp.task('pre_archive', () => {
        return gulp.src(vars.projectRoot + '/dist/**/*')
            .pipe(zip('dist-' + moment().format("YYYY-MM-DD-HH-mm-ss") + '.zip'))
            .pipe(gulp.dest(vars.projectRoot))
    });
};
