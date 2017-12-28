
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
    logger.error('Missing module name for command: add.\n');
    logger.log('You can use this command like follows:');
    logger.log('lila add <name>');
    process.exit(0);
}

// check if project config file exists
checkConfigFile();

var projectConfig = require('../project_config');

// project html file path
var htmlFilePath = projectConfig.basePaths.buildRoot + '/dev/html/' + moduleName + '.html';
// project js file path
var jsFilePath =  projectConfig.basePaths.buildRoot + '/dev/js/' + moduleName + '.js';
// project css file path
var cssFilePath = projectConfig.basePaths.buildRoot + '/dev/css/' + moduleName + '.css';

// source html file path
var sourceHtmlFilePath = vars.lilaRoot + '/project_files/demo/base.html';
// source js file path
var sourceJsFilePath = vars.lilaRoot + '/project_files/demo/base.js';
// source css file path
var sourceCssFilePath = vars.lilaRoot + '/project_files/demo/base.css';

/**
 * module directory level
 *
 * example:
 *     index -> 1
 *     test/index -> 2
 *     parent/test/index -> 3
 */
var modulePathLevels = moduleName.split('/').length;
/**
 * module relative prefix
 *
 * example:
 *     index -> ../
 *     test/index -> ../../
 *     parent/test/index -> ../../../
 *
 */
var moduleRelativePrefix = _.repeat('../', modulePathLevels);

var data = {
    module: moduleName,
    cssPath: moduleRelativePrefix + 'css/' + moduleName,
    jsPath: moduleRelativePrefix + 'js/' + moduleName
};

if (fs.existsSync(htmlFilePath) || fs.existsSync(jsFilePath) || fs.existsSync(cssFilePath)) {
    logger.error('Module ' + moduleName + ' has already been added.');
    process.exit(0);
}

// make css file
fsExtra.outputFileSync(cssFilePath, fsExtra.readFileSync(sourceCssFilePath, 'utf8'));
// make js file
fsExtra.outputFileSync(jsFilePath, fsExtra.readFileSync(sourceJsFilePath, 'utf8'));
// make html file
var htmlTmpContent = fsExtra.readFileSync(sourceHtmlFilePath, 'utf8');
_.forEach(data, (value, key) => {
    htmlTmpContent = htmlTmpContent.replace(new RegExp('{{' + key + '}}', 'g'), value);
});
fsExtra.outputFileSync(htmlFilePath, htmlTmpContent);

logger.success('Lila add module ' + moduleName + ' successful!');