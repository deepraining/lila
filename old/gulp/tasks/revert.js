
var fsExtra = require('fs-extra');
var decompress = require('gulp-decompress');
var vars = require('../../data/vars');
var revertData = require('../../data/revert');

module.exports = (gulp) => {

    // register revert task
    gulp.task('revert', () => {

        var distPath = vars.projectRoot + '/dist';

        // remove old dist directory
        fsExtra.removeSync(distPath);

        return gulp.src(vars.projectRoot + '/' + revertData.archivePackages[revertData.archivePackages.length - revertData.index])
            .pipe(decompress())
            .pipe(gulp.dest(distPath));
    });
};
