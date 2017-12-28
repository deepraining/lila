
'use strict';

var less = require('gulp-less');
var babel = require('gulp-babel');
var commonToAmd = require('gulp-common-to-amd');
var projectConfig = require('../../project_config');
var babelPreset = require('../../data/babel_preset');

module.exports = (gulp) => {

    var compileLess = (module) => {
        return gulp.src(projectConfig.buildPaths.src.css + '/' + module, {base: projectConfig.buildPaths.src.css})
            .pipe(less({relativeUrls: true}))
            .pipe(gulp.dest(projectConfig.buildPaths.dev.css))
    };
    
    var compileJs = (module) => {
        return gulp.src(projectConfig.buildPaths.src.js + '/' + module, {base: projectConfig.buildPaths.src.js})
            // es6 to es5
            .pipe(babel({
                    presets: babelPreset
                }))
            // commonjs -> amd
            .pipe(commonToAmd())
            .pipe(gulp.dest(projectConfig.buildPaths.dev.js))
    };

    var compile = () => {
        var module = projectConfig.globModule;

        if (module.slice(-5) == '.less')
            return compileLess(module);
        else if (module.slice(-3) == '.js')
            return compileJs(module);
        else {
            module += '.js';
            return compileJs(module);
        }
    };


    // register compile task
    gulp.task('compile', compile);
};
