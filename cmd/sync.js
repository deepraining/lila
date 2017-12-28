
'use strict';

var gulpCli = require('gulp-cli');

var vars = require('../data/vars');
var checkConfigFile = require('../util/check_config_file');
var changeCwd = require('../util/change_cwd');

var moduleName = vars.argv.module;

if (!moduleName) {
    logger.error('Missing module name for command: sync.\n');
    logger.log('You can use this command like follows:');
    logger.log('lilacs sync <name>');
    process.exit(0);
}

checkConfigFile();
changeCwd();

gulpCli();