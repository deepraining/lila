
const argv = require('../data/argv');
const logger = require('../util/logger');
const checkConfigFile = require('../util/check_config_file');
const registerTasks = require('../tasks/register');

const moduleName = argv.module;

if (!moduleName) {
    logger.error(`
    Missing module name for command: sync.
    `);
    logger.log(`
    You can use this command as follows:
    
    lila sync <name>
    `);
    process.exit(0);
}

checkConfigFile();

const projectConfig = require('../project_config');

if (projectConfig.onlyWebpack) {
    require('./util/webpack');
}
else {
    const gulp = require('gulp');

    // Register gulp tasks.
    registerTasks(gulp);

    // Execute task.
    gulp.series('sync', cb => {
        logger.success(`
    Pack source codes and static files into production, and sync them to remote servers successfully.
    `);

        cb();
    })();
}

