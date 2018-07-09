const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const pathInfo = require('../data/path_info');
const checkConfigFile = require('../util/check_config_file');
const copyRootFile = require('../project_files/copy_root_file');
const logger = require('../util/logger');

checkConfigFile();

const version = packageJson.version;
let copyCount = 0;

if (!fs.existsSync(path.join(pathInfo.projectRoot, '.npmrc'))) {
  // Make `.npmrc` file.
  copyRootFile(pathInfo.projectRoot, '.npmrc', !0);
  logger.success('  Copied .npmrc file.');

  copyCount += 1;
}

if (!fs.existsSync(path.join(pathInfo.projectRoot, '.editorconfig'))) {
  // Make `.editorconfig` file.
  copyRootFile(pathInfo.projectRoot, '.editorconfig', !0);
  logger.success('  Copied .editorconfig file.');

  copyCount += 1;
}

if (!fs.existsSync(path.join(pathInfo.projectRoot, '.eslintrc'))) {
  // Make `.eslintrc` file.
  copyRootFile(pathInfo.projectRoot, '.eslintrc', !0);
  logger.success('  Copied .eslintrc file.');

  copyCount += 1;
}

if (!fs.existsSync(path.join(pathInfo.projectRoot, '.eslintignore'))) {
  // Make `.eslintignore` file.
  copyRootFile(pathInfo.projectRoot, '.eslintignore', !0);
  logger.success('  Copied .eslintignore file.');

  copyCount += 1;
}

if (!fs.existsSync(path.join(pathInfo.projectRoot, '.stylelintrc'))) {
  // Make `.stylelintrc` file.
  copyRootFile(pathInfo.projectRoot, '.stylelintrc', !0);
  logger.success('  Copied .stylelintrc file.');

  copyCount += 1;
}

if (!fs.existsSync(path.join(pathInfo.projectRoot, '.stylelintignore'))) {
  // Make `.stylelintignore` file.
  copyRootFile(pathInfo.projectRoot, '.stylelintignore', !0);
  logger.success('  Copied .stylelintignore file.');

  copyCount += 1;
}

if (!fs.existsSync(path.join(pathInfo.projectRoot, '.prettierrc'))) {
  // Make `.prettierrc` file.
  copyRootFile(pathInfo.projectRoot, '.prettierrc', !0);
  logger.success('  Copied .prettierrc file.');

  copyCount += 1;
}

if (!fs.existsSync(path.join(pathInfo.projectRoot, '.prettierignore'))) {
  // Make `.prettierignore` file.
  copyRootFile(pathInfo.projectRoot, '.prettierignore', !0);
  logger.success('  Copied .prettierignore file.');

  copyCount += 1;
}

if (copyCount) {
  logger.success(`
  Successfully upgrade to version ${version}.
  `);
}
else {
  logger.success(`
  You have already been in version ${version}, nothing to upgrade.
  `);
}










