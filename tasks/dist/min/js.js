
const uglify = require('gulp-uglify');

const logger = require('../../../util/logger');

const current = require('../current');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {function}
 */
module.exports = gulp => {
    return function minJs(cb) {
        logger.log('Minimizing js files.', {prefix: !0, preLn: !0, postLn: !0});

        if (current.config.minJs)
            return gulp.src(current.config.buildPaths.buildTmp.dir + '/**/*.js')
                .pipe(uglify(current.config.minJsOptions || {}))
                .pipe(gulp.dest(current.config.buildPaths.buildTmp.dir));
        else cb();
    }
};
