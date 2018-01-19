
var cssUrlToAbsolute = require('gulp-css-url-to-absolute');
var cdnAbsolutePath = require('gulp-cdn-absolute-path');
var cssUrlPrefix = require('gulp-css-url-prefix');
var autoPrefixer = require('gulp-autoprefixer');

var distData = require('./data');

module.exports = {
    /**
     * 1. add vendor css prefix
     *
     * 2. relative to absolute
     *
     * 3. add cssAbsolutePathPrefix
     */
    adjustCss: (gulp) => {
        return function adjustCss() {
            var stream = gulp.src(distData.currentConfig.buildPaths.dist.css + '/**/*.css');

            if (distData.currentConfig.currentNetwork.cssAbsolutePathPrefix)
                stream.pipe(cssUrlPrefix(
                    distData.currentConfig.currentNetwork.cssAbsolutePathPrefix, '\/'
                ));

            /**
             * this handle should be done at the last, or the `cssAbsolutePathPrefix` will not take effect
             *
             * todo: find the reason
             */
            if (distData.currentConfig.cssAutoPrefix)
                stream.pipe(autoPrefixer(distData.currentConfig.autoPrefixOption || {}));

            return stream.pipe(gulp.dest(distData.currentConfig.buildPaths.distTmp.css));
        }
    },
    /**
     * 1. relative to absolute
     *
     * 2. add cdn
     */
    adjustHtml: (gulp) => {
        return function adjustHtml() {
            if (distData.currentConfig.htmlAbsoluteAndCdnPath)
                return gulp.src(distData.currentConfig.buildPaths.dist.html + '/**/*.html')
                    .pipe(cdnAbsolutePath({
                        asset: distData.currentConfig.basePaths.webRoot,
                        cdn: distData.currentConfig.currentNetwork.staticDomain || '',
                        exts: distData.currentConfig.htmlAbsoluteSuffixes
                    }))
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distTmp.html));
            else
                return gulp.src(distData.currentConfig.buildPaths.dist.html + '/**/*.html')
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distTmp.html));
        }
    }
};