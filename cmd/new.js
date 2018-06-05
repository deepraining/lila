
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const mkdirp = require('mkdirp');

const argv = require('../data/argv');
const pathInfo = require('../data/path_info');
const logger = require('../util/logger');

// Project name to be created.
let projectName = argv._[1];

// No project name.
if (!projectName) {
    logger.error(`
    Missing project name for command: new.
    `);
    logger.log(`
    You can use this command as follow:
    
    lila new <name>
    `);
    process.exit(0);
}

let projectPath = path.join(pathInfo.projectRoot, projectName);
let projectSubPath = path.join(projectPath, 'project');

// Project has been created.
if (fs.existsSync(projectPath)) {
    logger.error(`
    Project ${projectName} has already been created.
    `);
    process.exit(0);
}

// Create './[projectName]/project' directory.
mkdirp.sync(projectSubPath);

// Copy base dirs.
fsExtra.copySync(path.join(pathInfo.lilaRoot, 'project_files/project_dir'), projectSubPath);

// Make `.gitignore` file.
fsExtra.outputFileSync(
    projectPath + '/.gitignore',
    fsExtra.readFileSync(pathInfo.lilaRoot + '/project_files/misc/_.gitignore', 'utf8')
);

// Make `package.json` file.
fsExtra.outputFileSync(
    projectPath + '/package.json',
    fsExtra.readFileSync(pathInfo.lilaRoot + '/project_files/misc/_package.json', 'utf8').replace('{{projectName}}', projectName)
);

// Make `README.md` file.
fsExtra.outputFileSync(
    projectPath + '/README.md',
    fsExtra.readFileSync(pathInfo.lilaRoot + '/project_files/misc/README.md', 'utf8').replace('{{projectName}}', projectName)
);

// Make `lila.config.js` file.
fsExtra.outputFileSync(
    projectPath + '/lila.config.js',
    fsExtra.readFileSync(pathInfo.lilaRoot + '/project_files/config/lila.config.js', 'utf8')
);

// Make `lila.server.config.js` file.
fsExtra.outputFileSync(
    projectPath + '/lila.server.config.js',
    fsExtra.readFileSync(pathInfo.lilaRoot + '/project_files/config/lila.server.config.js', 'utf8')
);

logger.success(`
    Lila new project ${projectName} successfully!
`);
