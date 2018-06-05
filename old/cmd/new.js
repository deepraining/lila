
var fs = require('fs');
var _ = require('lodash');
var fsExtra = require('fs-extra');
var path = require('path');

var mkdirp = require('mkdirp');
var vars = require('../data/vars');

var projectName = vars.argv._[1];

// no project name
if (!projectName) {
    logger.error('Missing project name for command: new.', !0, !0);
    logger.log('You can use this command like follows:');
    logger.log('lila new <name>');
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
fsExtra.copySync(path.join(vars.lilaRoot, 'project_files/project_dir'), projectSubPath);
// make .gitignore file
fsExtra.outputFileSync(
    projectPath + '/.gitignore',
    fsExtra.readFileSync(vars.lilaRoot + '/project_files/misc/_.gitignore', 'utf8')
);
// make package.json file
fsExtra.outputFileSync(
    projectPath + '/package.json',
    fsExtra.readFileSync(vars.lilaRoot + '/project_files/misc/_package.json', 'utf8').replace('{{projectName}}', projectName)
);
// make lila.config.js file
fsExtra.outputFileSync(
    projectPath + '/lila.config.js',
    fsExtra.readFileSync(vars.lilaRoot + '/project_files/config/lila.config.js', 'utf8')
);
// make lila.server.config.js file
fsExtra.outputFileSync(
    projectPath + '/lila.server.config.js',
    fsExtra.readFileSync(vars.lilaRoot + '/project_files/config/lila.server.config.js', 'utf8')
);
// make README.md file
fsExtra.outputFileSync(
    projectPath + '/README.md',
    fsExtra.readFileSync(vars.lilaRoot + '/project_files/misc/README.md', 'utf8').replace('{{projectName}}', projectName)
);

logger.success('Lila new project ' + projectName + ' successfully!');
