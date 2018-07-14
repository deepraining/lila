const fs = require('fs');
const gulp = require('gulp');

const pathInfo = require('../data/path_info');
const logger = require('../util/logger');
const registerTasks = require('../tasks/register');

if (!fs.existsSync(`${pathInfo.projectRoot}/dist`)) {
  logger.error(`
  Missing 'dist' directory for command: clean.
  `);
  process.exit(1);
}

// Register gulp tasks.
registerTasks(gulp);

// Execute task.
gulp.series('clean', cb => {
  logger.success(`
  Clean 'dist' directory successfully.
  `);

  cb();
})();
