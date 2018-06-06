
const fsExtra = require('fs-extra');
const decompress = require('gulp-decompress');
const vars = require('../../data/vars');
const revertData = require('../../data/revert');

module.exports = (gulp) => {

    // register revert task
    gulp.task('revert', () => {

        const distPath = vars.projectRoot + '/dist';

        // remove old dist directory
        fsExtra.removeSync(distPath);

        return gulp.src(vars.projectRoot + '/' + revertData.archivePackages[revertData.archivePackages.length - revertData.index])
            .pipe(decompress())
            .pipe(gulp.dest(distPath));
    });
};
