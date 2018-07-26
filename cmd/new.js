const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const argv = require('../data/argv');
const pathInfo = require('../data/path_info');
const logger = require('../util/logger');
const copyRootFile = require('../project_files/copy_root_file');

// Project name to be created.
const projectName = argv._[1];

// No project name.
if (!projectName) {
  logger.error(`
  Missing project name for command: new.
  `);
  logger.log(`
  You can use this command as follows:
  
  lila new <name>
  `);
  process.exit(1);
}

const projectPath = path.join(pathInfo.projectRoot, projectName);

// Project has been created.
if (fs.existsSync(projectPath)) {
  logger.error(`
  Project '${projectName}' has already been created.
  `);
  process.exit(1);
}

// Copy base dirs.
fse.ensureFileSync(path.join(projectPath, 'project/src/.gitkeep'));

// Make `.gitignore` file.
copyRootFile(projectPath, '.gitignore', !0);

// Make `.npmrc` file.
copyRootFile(projectPath, '.npmrc', !0);

// Make `.editorconfig` file.
copyRootFile(projectPath, '.editorconfig', !0);

// Make `.eslintrc` file.
copyRootFile(projectPath, '.eslintrc', !0);

// Make `.eslintignore` file.
copyRootFile(projectPath, '.eslintignore', !0);

// Make `.stylelintrc` file.
copyRootFile(projectPath, '.stylelintrc', !0);

// Make `.stylelintignore` file.
copyRootFile(projectPath, '.stylelintignore', !0);

// Make `.prettierrc` file.
copyRootFile(projectPath, '.prettierrc', !0);

// Make `.prettierignore` file.
copyRootFile(projectPath, '.prettierignore', !0);

// Make `package.json` file.
copyRootFile(projectPath, 'package.json', !0, '{{projectName}}', projectName);

// Make `README.md` file.
copyRootFile(projectPath, 'README.md', !0, '{{projectName}}', projectName);

// Make `lila.config.js` file.
copyRootFile(projectPath, 'lila.config.js');

// Make `lila.server.config.js` file.
copyRootFile(projectPath, 'lila.server.config.js');

logger.success(`
  Lila new project '${projectName}' successfully!
`);
