
const changedFiles = require('../util/changed_files');

module.exports = gulp => {
    return function findChangedBase(cb) {

        // do not record files' changes
        if (!current.config.recordFileChanges) {
            return gulp.src(current.config.buildPaths.dist.dir + '/**/*', {
                base: current.config.buildPaths.dist.dir
            })
                .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
        }
        // record files' changes
        else {
            // get changed files
            const changedFiles = changedFiles(current.config.buildPaths.dist.dir, 'base');
            const completeChangedFiles = [];

            if (!_.isEmpty(changedFiles)) {

                _.forEach(changedFiles, (value, key) => {
                    completeChangedFiles.push(current.config.buildPaths.dist.dir + '/' + key);
                    logger.info('changed: ' + key);
                });

                return gulp.src(completeChangedFiles, {base: current.config.buildPaths.dist.dir})
                    .pipe(gulp.dest(current.config.buildPaths.tmp.dir));

            } else {
                logger.info('Base nothing changed!');
                cb();
            }
        }

    }
};
