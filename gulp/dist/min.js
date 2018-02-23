
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

var distData = require('./data');

module.exports = {
    minCss: (gulp) => {
        return function minCss(cb) {
            if (distData.currentConfig.minCss)
                return gulp.src(distData.currentConfig.buildPaths.tmp.dir + '/**/*.css')
                    .pipe(csso({comments: !1}))
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.tmp.dir));
            else cb();
        }
    },
    minJs: (gulp) => {
        return function minJs(cb) {
            if (distData.currentConfig.minJs)
                return gulp.src(distData.currentConfig.buildPaths.tmp.dir + '/**/*.js')
                    .pipe(uglify())
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.tmp.dir));
            else cb();
        }
    },
    minHtml: (gulp) => {
        return function minHtml(cb) {
            if (distData.currentConfig.minHtml)
                return gulp.src(distData.currentConfig.buildPaths.tmp.dir + '/**/*.html')
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
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.tmp.dir));
            else cb();

        }
    }
};