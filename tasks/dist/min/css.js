
const csso = require('gulp-csso');

const logger = require('../../../util/logger');

const current = require('../current');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {function}
 */
module.exports = gulp => {
    return function minCss(cb) {
        logger.log('Minimizing css files.', {prefix: !0, preLn: !0, postLn: !0});

        if (current.config.minCss)
            return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.css')
                .pipe(csso(current.config.minCssOptions || {comments: !1}))
                .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
        else cb();
    }
};
