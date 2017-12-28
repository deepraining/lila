
'use strict';

var uglify = require('gulp-uglify');

var projectConfig = require('../../project_config');

module.exports = (gulp) => {

    // register task
    gulp.task('dist-js', () => {
        var stream = gulp.src(projectConfig.buildPaths.dev.js + '/' + projectConfig.globModule + '.js', {
            base: projectConfig.buildPaths.dev.js
        });

        if (projectConfig.minJs) stream.pipe(uglify());

        return stream.pipe(gulp.dest(projectConfig.buildPaths.dist.js));
    });
};
