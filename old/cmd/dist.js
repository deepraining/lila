const argv = require('../data/argv');
const logger = require('../util/logger');
const checkConfigFile = require('../util/check_config_file');

const moduleName = argv.module;

if (!moduleName) {
  logger.error(`
  Missing module name for command: dist.
  `);
  logger.log(`
  You can use this command as follows:
  
  lila dist <name>
  `);
  process.exit(1);
}

checkConfigFile();

// Guarantee `share.originalProcessArgv` has been loaded.
const share = require('../share');
const pathInfo = require('../data/path_info');

// Modify `process.argv` for `gulp-cli`.
process.argv = [share.originalProcessArgv[0], share.originalProcessArgv[1], 'dist', '--gulpfile', pathInfo.gulpFile];

require('gulp-cli')(err => {
  if (err) {
    logger.error(`
  Error occurred when lila build modules, you should resolve those errors, and try again.
    `);
    logger.error(err.stack || err);
  } else {
    logger.success(`
  Pack source codes and static files into production successfully.
    `);
  }
});