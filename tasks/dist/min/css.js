
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
    return cb => {
        logger.log('Start minimizing css files.');

        if (current.config.minCss)
            return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.css')
                .pipe(csso(current.config.minCssOptions || {comments: !1}))
                .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
        else cb();
    }
};
