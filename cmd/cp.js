
'use strict';

var gulpCli = require('gulp-cli');
var checkConfigFile = require('../util/check_config_file');
var changeCwd = require('../util/change_cwd');
var vars = require('../data/vars');

if (!vars.argv.globModule) {
    logger.error('Missing module for command: cp.\n');
    logger.log('You can use this command like follows:');
    logger.log('lilacs cp <name>');
    process.exit(0);
}

checkConfigFile();
changeCwd();

gulpCli();