const isEmpty = require('lodash/isEmpty');
const forEach = require('lodash/forEach');

const logger = require('../../../util/logger');

const current = require('../current');
const findChangedFiles = require('../util/changed_files');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {changedFiles}
 */
module.exports = gulp => {
  return function changedFiles(cb) {
    logger.log('Finding changed files.', { prefix: !0, preLn: !0, postLn: !0 });

    // Don't record files' changes.
    if (!current.config.recordFileChanges) {
      return gulp
        .src(`${current.config.buildPaths.build.dir}/**/*`, {
          base: current.config.buildPaths.build.dir,
        })
        .pipe(gulp.dest(current.config.buildPaths.buildTmp.dir));
    }
    // Record files' changes.
    else {
      // Get changed files.
      const foundChangedFiles = findChangedFiles(current.config.buildPaths.build.dir, 'base');
      const changedFilesPaths = [];

      if (!isEmpty(foundChangedFiles)) {
        logger.info('');
        forEach(foundChangedFiles, (value, key) => {
          changedFilesPaths.push(`${current.config.buildPaths.build.dir}/${key}`);
          logger.info(`File changed: ${key}.`, { prefix: !0 });
        });
        logger.info('');

        return gulp
          .src(changedFilesPaths, { base: current.config.buildPaths.build.dir })
          .pipe(gulp.dest(current.config.buildPaths.buildTmp.dir));
      } else {
        logger.info(`Nothing changed after webpack's building.`, {
          prefix: !0,
          preLn: !0,
          postLn: !0,
        });
        cb();
      }
    }
  };
};
