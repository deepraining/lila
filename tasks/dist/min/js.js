
const uglify = require('gulp-uglify');

const current = require('../current');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {minJs}
 */
module.exports = gulp => {
    return function minJs(cb) {
        if (current.config.minJs)
            return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.js')
                .pipe(uglify(current.config.minJsOptions || {}))
                .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
        else cb();
    }
};
