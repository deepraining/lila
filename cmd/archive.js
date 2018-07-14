const fs = require('fs');
const gulp = require('gulp');

const pathInfo = require('../data/path_info');
const archiveShare = require('../share/archive');
const logger = require('../util/logger');
const registerTasks = require('../tasks/register');

if (!fs.existsSync(`${pathInfo.projectRoot}/dist`)) {
  logger.error(`
  Missing 'dist' directory for command: archive.
  `);
  process.exit(1);
}

// Register gulp tasks.
registerTasks(gulp);

// Execute task.
gulp.series('archive', archiveShare.endHandler)();
