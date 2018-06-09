
const htmlmin = require('gulp-htmlmin');

const current = require('../current');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {minHtml}
 */
module.exports = gulp => {
    return function minHtml(cb) {
        if (current.config.minHtml){
            let options = current.config.minHtmlOptions || {
                removeComments: !0,
                collapseWhitespace: !0,
                collapseBooleanAttributes: !0,
                removeEmptyAttributes: !0,
                removeScriptTypeAttributes: !0,
                removeStyleLinkTypeAttributes: !0,
                minifyJS: !1,
                minifyCSS: !0
            };

            return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.html')
                .pipe(htmlmin(options))
                .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
        }
        else cb();

    }
};
