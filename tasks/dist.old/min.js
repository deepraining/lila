
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const data = require('./data');

module.exports = {
    minCss: (gulp) => {
        return function minCss(cb) {
            if (current.config.minCss)
                return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.css')
                    .pipe(csso({comments: !1}))
                    .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
            else cb();
        }
    },
    minJs: (gulp) => {
        return function minJs(cb) {
            if (current.config.minJs)
                return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.js')
                    .pipe(uglify())
                    .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
            else cb();
        }
    },
    minHtml: (gulp) => {
        return function minHtml(cb) {
            if (current.config.minHtml)
                return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.html')
                    .pipe(htmlmin({
                        removeComments: !0,
                        collapseWhitespace: !0,
                        collapseBooleanAttributes: !0,
                        removeEmptyAttributes: !0,
                        removeScriptTypeAttributes: !0,
                        removeStyleLinkTypeAttributes: !0,
                        minifyJS: !1,
                        minifyCSS: !0
                    }))
                    .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
            else cb();

        }
    }
};
