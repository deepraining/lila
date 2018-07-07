
const fs = require('fs');

const argv = require('../data/argv');
const checkConfigFile = require('../util/check_config_file');
const copyDemoFile = require('../project_files/copy_demo_file');
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

let moduleDirPath = projectConfig.basePaths.buildRoot + '/src/' + moduleName;

// Html file path to be created.
let htmlFilePath = moduleDirPath + '/index.html';
// Js file path to be created.
let jsFilePath =  moduleDirPath + '/index.js';

if (fs.existsSync(htmlFilePath) || fs.existsSync(jsFilePath)) {
    logger.error(`
    Module '${moduleName}' has already been added.
    `);
    process.exit(0);
}

// Make js file.
copyDemoFile(moduleDirPath, 'index.js');
// Make html file.
copyDemoFile(moduleDirPath, 'index.html');

logger.success(`
    Lila add module '${moduleName}' successfully!
`);
