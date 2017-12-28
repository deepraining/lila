
'use strict';

var fs = require('fs');
var fsExtra = require('fs-extra');
var md5 = require('crypto-md5');
var shell = require('shelljs');

var vars = require('../data/vars');
var pathUtil = require('../util/path');
var checkConfigFile = require('../util/check_config_file');
var changeCwd = require('../util/change_cwd');
var createServerFile = require('../util/create_server_file');
var createMockExpressFile = require('../util/create_mock_express_file');

// forever command name
var foreverCmdName = vars.argv._[1];

if (!foreverCmdName) {
    logger.error('Missing forever command name for lila command: forever.\n');
    logger.log('You can use this command like follows:');
    logger.log('lila forever <forever command name>');
    process.exit(0);
}

checkConfigFile();

// server types: default[local server], mock-express[express mock server]
var serverTypes = ['default', 'mock-express'];
// current server type
var serverType = vars.argv._[2];
// current server type index
var serverTypeIndex = serverTypes.indexOf(serverType);
// if specify server type
var specifiedServerType;

if (serverTypeIndex < 0) {
    specifiedServerType = !1;
    serverTypeIndex = 0;
    serverType = 'default'
}
else {
    specifiedServerType = !0;
}

var projectConfig = require('../project_config');
// web root
var webRootPath = pathUtil.replaceBackSlash(projectConfig.basePaths.webRoot);
// build root
var buildRoot = pathUtil.replaceBackSlash(projectConfig.basePaths.buildRoot);
// server port
var serverPort = [projectConfig.serverPort, projectConfig.mockExpressPort][serverTypeIndex];

changeCwd();

var pathMd5 = md5(vars.projectRoot, 'hex');
var serverFilePath = `./.tmp/${serverType}-${pathMd5}.js`;

var serverFileExist = fs.existsSync(serverFilePath);
var existContent = serverFileExist && fsExtra.readFileSync(serverFilePath, 'utf8');
var newContent;

if (serverTypeIndex === 1) {
    newContent = createMockExpressFile({dataPath: buildRoot + '/data', webRootPath: webRootPath, port: serverPort});
}
else {
    newContent = createServerFile({path: webRootPath, port: serverPort});
}

// make server file
if (existContent != newContent) {
    fsExtra.outputFileSync(serverFilePath, newContent);
    serverFileExist && logger.info('Server config file changed');
}

var shellResult = shell.exec('forever ' + process.argv[3] + ' ' + serverFilePath + ' ' +  process.argv.slice(specifiedServerType ? 5 : 4).join(' '));
if (shellResult.code !== 0) {
    shell.echo(`Lilacs handle server failed for action [${process.argv[3]}], please try again`);
    shell.exit(1);
}

logger.success(`Lilacs ${process.argv[3]} ${serverType} server success for port[${serverPort}]`);