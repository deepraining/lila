
var cdnAbsolutePath = require('gulp-cdn-absolute-path');

var distData = require('./data');

module.exports = {
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