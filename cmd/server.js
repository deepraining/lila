
'use strict';

var gulpCli = require('gulp-cli');
var checkConfigFile = require('../util/check_config_file');
var changeCwd = require('../util/change_cwd');

checkConfigFile();
changeCwd();

gulpCli();