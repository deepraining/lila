
var cdnAbsolutePath = require('gulp-cdn-absolute-path');
var cssUrlPrefix = require('gulp-css-url-prefix');

var distData = require('./data');

module.exports = {
    /**
     * 1. add cssAbsolutePathPrefix
     */
    adjustCss: (gulp) => {
        return function adjustCss(cb) {
            if (distData.currentConfig.cssAbsolutePathPrefix)
                return gulp.src(distData.currentConfig.buildPaths.tmp.dir + '/**/*.css')
                    .pipe(cssUrlPrefix(
                        distData.currentConfig.cssAbsolutePathPrefix, '\/'
                    ))
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.tmp.dir));

            else cb();
        }
    },
    /**
     * 1. add htmlAbsolutePathPrefix
     */
    adjustHtml: (gulp) => {
        return function adjustHtml(cb) {
            if (distData.currentConfig.htmlAbsolutePathPrefix)
                return gulp.src(distData.currentConfig.buildPaths.tmp.dir + '/**/*.html')
                    .pipe(cdnAbsolutePath({
                        asset: distData.currentConfig.basePaths.webRoot,
                        cdn: distData.currentConfig.htmlAbsolutePathPrefix || '',
                        exts: distData.currentConfig.htmlAbsoluteSuffixes
                    }))
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.tmp.dir));
            else cb();
        }
    }
};