
const cdnAbsolutePath = require('gulp-cdn-absolute-path');

const data = require('./data');

module.exports = {
    /**
     * 1. add staticServerDomain
     */
    adjustHtml: (gulp) => {
        return function adjustHtml(cb) {
            if (current.config.staticServerDomain)
                return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.html')
                    .pipe(cdnAbsolutePath({
                        asset: current.config.basePaths.webRoot,
                        cdn: current.config.staticServerDomain || '',
                        exts: current.config.htmlCdnExtensions
                    }))
                    .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
            else cb();
        }
    }
};
