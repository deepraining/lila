
'use strict';

var fs = require('fs');
var _ = require('lodash');
var fsExtra = require('fs-extra');
var path = require('path');

var mkdirp = require('mkdirp');
var vars = require('../data/vars');

var projectName = vars.argv._[1];

// no project name
if (!projectName) {
    logger.error('Missing project name for command: new.\n');
    logger.log('You can use this command like follows:');
    logger.log('lilacs new <name>');
    process.exit(0);
}

var projectPath = path.join(vars.projectRoot, projectName);
var projectSubPath = path.join(projectPath, 'project');

// project has been created
if (fs.existsSync(projectPath)) {
    logger.error('Project ' + projectName + ' has already been created.');
    process.exit(0);
}

// create './[projectName]/project' directory
mkdirp.sync(projectSubPath);

// copy base dirs
fsExtra.copySync(path.join(vars.lilacsRoot, 'project_files/project_dir'), projectSubPath);
// make .gitignore file
fsExtra.outputFileSync(
    projectPath + '/.gitignore',
    fsExtra.readFileSync(vars.lilacsRoot + '/project_files/misc/.gitignore.example', 'utf8')
);
// make package.json file
fsExtra.outputFileSync(
    projectPath + '/package.json',
    fsExtra.readFileSync(vars.lilacsRoot + '/project_files/misc/package.json.example', 'utf8')
);
// make lilacs.config.js file
fsExtra.outputFileSync(
    projectPath + '/lilacs.config.js',
    fsExtra.readFileSync(vars.lilacsRoot + '/project_files/config/lilacs.config.js', 'utf8')
);
// make lilacs.server.config.js file
fsExtra.outputFileSync(
    projectPath + '/lilacs.server.config.js',
    fsExtra.readFileSync(vars.lilacsRoot + '/project_files/config/lilacs.server.config.js', 'utf8')
);
// make README.md file
fsExtra.outputFileSync(
    projectPath + '/README.md',
    fsExtra.readFileSync(vars.lilacsRoot + '/project_files/misc/README.md', 'utf8')
);

logger.success('Lilacs new project ' + projectName + ' successfully!');