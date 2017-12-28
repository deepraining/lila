
'use strict';

var csso = require('gulp-csso');
var cssUrlToAbsolute = require('gulp-css-url-to-absolute');
var cssUrlPrefix = require('gulp-css-url-prefix');
var cssimport = require("gulp-cssimport");
var autoPrefixer = require('gulp-autoprefixer');

var projectConfig = require('../../project_config');

module.exports = (gulp) => {

    // register task
    gulp.task('dist-css', () => {
        var stream = gulp.src(projectConfig.buildPaths.dev.css + '/' + projectConfig.globModule + '.css', {
            base: projectConfig.buildPaths.dev.css
        }).pipe(cssimport({}));

        if (projectConfig.cssAbsolutePath)
            stream.pipe(cssUrlToAbsolute({root: projectConfig.basePaths.webRoot}));

        if (projectConfig.currentNetworkOption.cssAbsolutePathPrefix)
            stream.pipe(cssUrlPrefix(projectConfig.currentNetworkOption.cssAbsolutePathPrefix, '\/'));

        if (projectConfig.minCss) stream.pipe(csso());

        /**
         * this handle should be done at the last, or the `cssAbsolutePath` and `cssAbsolutePathPrefix` will not take effect
         *
         * todo: find the reason
         */
        if (projectConfig.cssAutoPrefix)
            stream.pipe(autoPrefixer(projectConfig.autoPrefixOption || {}));

        return stream.pipe(gulp.dest(projectConfig.buildPaths.dist.css));
    });
};
