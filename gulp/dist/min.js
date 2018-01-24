
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

var distData = require('./data');

module.exports = {
    minCss: (gulp) => {
        return function minCss() {
            if (distData.currentConfig.minCss)
                return gulp.src(distData.currentConfig.buildPaths.distTmp.css + '/**/*.css')
                    .pipe(csso({comments: !1}))
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distStore.css));
            else
                return gulp.src(distData.currentConfig.buildPaths.distTmp.css + '/**/*.css')
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distStore.css));
        }
    },
    minJs: (gulp) => {
        return function minJs() {
            if (distData.currentConfig.minJs)
                return gulp.src(distData.currentConfig.buildPaths.dist.js + '/**/*.js')
                    .pipe(uglify())
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distStore.js));
            else
                return gulp.src(distData.currentConfig.buildPaths.dist.js + '/**/*.js')
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distStore.js));
        }
    },
    minHtml: (gulp) => {
        return function minHtml() {
            if (distData.currentConfig.minHtml)
                return gulp.src(distData.currentConfig.buildPaths.distTmp.html + '/**/*.html')
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
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distHandleHtml.html));
            else
                return gulp.src(distData.currentConfig.buildPaths.distTmp.html + '/**/*.html')
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distHandleHtml.html));

        }
    }
};