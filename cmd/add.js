
const fs = require('fs');
const fsExtra = require('fs-extra');

const argv = require('../data/argv');
const pathInfo = require('../data/path_info');
const checkConfigFile = require('../util/check_config_file');
const logger = require('../util/logger');

// Module name.
let moduleName = argv._[1];

// Missing module name.
if (!moduleName) {
    logger.error(`
    Missing module name for command: add.
    `);
    logger.log(`
    You can use this command as follows:
    
    lila add <name>
    `);
    process.exit(0);
}

// Check if project config file exists.
checkConfigFile();

// Project config.
const projectConfig = require('../project_config');

// Html file path to be created.
let htmlFilePath = projectConfig.basePaths.buildRoot + '/src/' + moduleName + '/index.html';
// Js file path to be created.
let jsFilePath =  projectConfig.basePaths.buildRoot + '/src/' + moduleName + '/index.js';

// Html source file path.
let sourceHtmlFilePath = pathInfo.lilaRoot + '/project_files/demo/base.html';
// Js source file path.
let sourceJsFilePath = pathInfo.lilaRoot + '/project_files/demo/base.js';

if (fs.existsSync(htmlFilePath) || fs.existsSync(jsFilePath)) {
    logger.error(`
    Module '${moduleName}' has already been added.
    `);
    process.exit(0);
}

// Make js file.
fsExtra.outputFileSync(jsFilePath, fsExtra.readFileSync(sourceJsFilePath, 'utf8'));
// Make html file.
fsExtra.outputFileSync(htmlFilePath, fsExtra.readFileSync(sourceHtmlFilePath, 'utf8'));

logger.success(`
    Lila add module '${moduleName}' successfully!
`);
