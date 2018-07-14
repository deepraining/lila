const glob = require('glob');
const gulp = require('gulp');

const argv = require('../data/argv');
const logger = require('../util/logger');
const sequenceSuffix = require('../util/sequence_suffix');
const revertShare = require('../share/revert');
const registerTasks = require('../tasks/register');

/**
 * Find all existing packages, from old to new.
 *
 * @type {*|{define}}
 */
revertShare.packages = glob.sync('dist-*.zip');

if (!revertShare.packages || !revertShare.packages.length) {
  logger.error(`
  No archive packages in current directory.
  `);
  process.exit(1);
}

const index = parseInt(argv.i, 10) || parseInt(argv.index, 10) || 0;

// Index is greater than total length.
if (index > revertShare.packages.length) {
  logger.error(`
  Index "${index}" is greater than packages' length "${revertShare.packages.length}".
  `);
  process.exit(1);
}

revertShare.index = index || 1;

// Register gulp tasks.
registerTasks(gulp);

// Execute task.
gulp.series('revert', cb => {
  logger.success(`
  Revert 'dist' directory to last ${revertShare.index}${sequenceSuffix(revertShare.index)} archive state successfully, 
  with filename of '${revertShare.revertZip}'.
  `);

  cb();
})();
