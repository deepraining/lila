
'use strict';

var fs = require('fs');
var fsExtra = require('fs-extra');
var del = require('del');
var jsdoc = require('gulp-jsdoc3');

var projectConfig = require('../../project_config');

module.exports = (gulp) => {

    var copyFiles = (cb) => {

        // copy dev/js
        fsExtra.copySync(projectConfig.buildPaths.dev.js, projectConfig.buildPaths.doc_tmp.dir);

        // copy src/js
        fsExtra.copySync(projectConfig.buildPaths.src.js, projectConfig.buildPaths.doc_tmp.dir);

        // delete lib
        var libPath = projectConfig.buildPaths.doc_tmp.dir + '/lib';
        fs.existsSync(libPath) && fsExtra.removeSync(libPath);

        // delete lib_extra
        var libExtraPath = projectConfig.buildPaths.doc_tmp.dir + '/lib_extra';
        fs.existsSync(libExtraPath) && fsExtra.removeSync(libExtraPath);

        // delete directories defined in projectConfig.doc.exclude
        if (projectConfig.doc && projectConfig.doc.exclude) {
            projectConfig.doc.exclude.forEach((dir) => {
                var dirPath = projectConfig.buildPaths.doc_tmp.dir + '/' + dir;
                fs.existsSync(dirPath) && fsExtra.removeSync(dirPath);
            });
        }
        cb();
    };

    // generate documents
    var generate = (cb) => {
        gulp.src(projectConfig.docSrc, {read: false})
            .pipe(jsdoc({
                opts: {
                    destination: projectConfig.buildPaths.doc.dir
                }
            }, cb));
    };

    var deleteCopiedFiles = () => {
        // delete tmp directory
        return del([projectConfig.buildPaths.doc_tmp.dir], {force: !0});
    };

    // register task
    gulp.task('doc', gulp.series(copyFiles, generate, deleteCopiedFiles));
};
