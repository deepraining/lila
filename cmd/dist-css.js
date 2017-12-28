
'use strict';

var gulpCli = require('gulp-cli');

var vars = require('../data/vars');
var checkConfigFile = require('../util/check_config_file');
var changeCwd = require('../util/change_cwd');

if (!vars.argv.globModule) {
    logger.error('Missing module name for command: dist-css.\n');
    logger.log('You can use this command like follows:');
    logger.log('lila dist-css <name>');
    process.exit(0);
}

checkConfigFile();
changeCwd();

gulpCli();