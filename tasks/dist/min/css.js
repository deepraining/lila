
const csso = require('gulp-csso');

const current = require('../current');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {minCss}
 */
module.exports = gulp => {
    return function minCss(cb) {
        if (current.config.minCss)
            return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.css')
                .pipe(csso(current.config.minCssOptions || {comments: !1}))
                .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
        else cb();
    }
};
