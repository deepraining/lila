
'use strict';

var fs = require('fs');
var _ = require('lodash');
var fsExtra = require('fs-extra');
var path = require('path');
var vars = require('../data/vars');
var checkConfigFile = require('../util/check_config_file');

// module name
var moduleName = vars.argv._[1];

// missing module name
if (!moduleName) {
    logger.error('Missing module name for command: add.', !0, !0);
    logger.log('You can use this command like follows:');
    logger.log('lila add <name>');
    process.exit(0);
}

// check if project config file exists
checkConfigFile();

var projectConfig = require('../project_config');

// project html file path
var htmlFilePath = projectConfig.basePaths.buildRoot + '/src/' + moduleName + '/index.html';
// project js file path
var jsFilePath =  projectConfig.basePaths.buildRoot + '/src/' + moduleName + '/index.js';

// source html file path
var sourceHtmlFilePath = vars.lilaRoot + '/project_files/demo/base.html';
// source js file path
var sourceJsFilePath = vars.lilaRoot + '/project_files/demo/base.js';

if (fs.existsSync(htmlFilePath) || fs.existsSync(jsFilePath)) {
    logger.error('Module ' + moduleName + ' has already been added.');
    process.exit(0);
}

// make js file
fsExtra.outputFileSync(jsFilePath, fsExtra.readFileSync(sourceJsFilePath, 'utf8'));
// make html file
fsExtra.outputFileSync(htmlFilePath, fsExtra.readFileSync(sourceHtmlFilePath, 'utf8'));

logger.success('Lila add module ' + moduleName + ' successful!');