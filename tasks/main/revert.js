
const fsExtra = require('fs-extra');
const decompress = require('gulp-decompress');

const pathInfo = require('../../data/path_info');
const revertShare = require('../../share/revert');


/**
 * Register `revert` task.
 * @param gulp
 */
module.exports = gulp => {

    gulp.task('revert', () => {
        let distPath = pathInfo.projectRoot + '/dist';

        // Remove old `dist` directory.
        fsExtra.removeSync(distPath);

        /**
         * Zip file name.
         *
         * Default sequence is from old to new, but actually want the reverse, from new to old.
         */
        revertShare.revertZip = revertShare.packages[revertShare.packages.length - revertShare.index];

        return gulp.src(pathInfo.projectRoot + '/' + revertShare.revertZip)
            .pipe(decompress())
            .pipe(gulp.dest(distPath));
    });
};
