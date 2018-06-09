
const gulp = require('gulp');

const argv = require('../data/argv');
const logger = require('../util/logger');
const checkConfigFile = require('../util/check_config_file');
const registerTasks = require('../tasks/register');

const moduleName = argv.module;

if (!moduleName) {
    logger.error(`
    Missing module name for command: dist.
    `);
    logger.log(`
    You can use this command as follows:
    
    lila dist <name>
    `);
    process.exit(0);
}

checkConfigFile();

// Register gulp tasks.
registerTasks(gulp);

// Execute task.
gulp.series('dist', cb => {
    logger.success(`
    Pack source codes and static files into production successfully.
    `);

    cb();
})();

