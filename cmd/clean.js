'use strict';

var fs = require('fs');
var gulpCli = require('gulp-cli');
var _ = require('lodash');

var changeCwd = require('../util/change_cwd');
var vars = require('../data/vars');
var cleanData = require('../data/clean');

if (!fs.existsSync(vars.projectRoot + '/dist')) {
    logger.error('Missing `dist` directory for command: clean.');
    process.exit(0);
}

var cleanConfigPath = vars.projectRoot + '/' + vars.cleanConfigFile;

if (fs.existsSync(cleanConfigPath)) {
    var config = require(cleanConfigPath);
    cleanData.config = _.defaults(config, cleanData.defaultConfig);
}
else {
    cleanData.config = cleanData.defaultConfig;
}

changeCwd();

gulpCli();