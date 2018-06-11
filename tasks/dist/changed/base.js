
const isEmpty = require('lodash/isEmpty');
const forEach = require('lodash/forEach');

const logger = require('../../../util/logger');

const current = require('../current');
const findChangedFiles = require('../util/changed_files');


/**
 * Make a function.
 *
 * @param gulp
 * @returns {function}
 */
module.exports = gulp => {
    return cb => {
        logger.log('Start finding changed files.');

        // Don't record files' changes.
        if (!current.config.recordFileChanges) {
            return gulp.src(current.config.buildPaths.dist.dir + '/**/*', {
                    base: current.config.buildPaths.dist.dir
                })
                .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
        }
        // Record files' changes.
        else {
            // Get changed files.
            const changedFiles = findChangedFiles(current.config.buildPaths.dist.dir, 'base');
            const changedFilesPaths = [];

            if (!isEmpty(changedFiles)) {

                forEach(changedFiles, (value, key) => {
                    changedFilesPaths.push(current.config.buildPaths.dist.dir + '/' + key);
                    logger.info(`    File changed: ${key}.`);
                });

                return gulp.src(changedFilesPaths, {base: current.config.buildPaths.dist.dir})
                    .pipe(gulp.dest(current.config.buildPaths.tmp.dir));

            } else {
                logger.info(`
    Nothing changed after webpack's building.            
                `);
                cb();
            }
        }

    }
};
