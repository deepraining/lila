const path = require('path');

const pathInfo = {
  // lila root directory
  lilaRoot: path.join(__dirname, '../'),
  // project root directory
  projectRoot: process.cwd(),
  // config file
  configFile: 'lila.config.js',
};

// Config file path.
pathInfo.configFilePath = path.join(pathInfo.projectRoot, pathInfo.configFile);

// Lila workspace of project is in `.lila` directory of project root.
pathInfo.lilaWorkspace = path.join(pathInfo.projectRoot, '.lila');

// Manifests directory for file changes records.
pathInfo.manifestsDir = path.join(pathInfo.lilaWorkspace, 'manifests');

// `.keep` file of manifests directory.
pathInfo.manifestsDirKeepFile = path.join(pathInfo.manifestsDir, '.keep');

// Backup manifests directory.
pathInfo.manifestsBakDir = path.join(pathInfo.lilaWorkspace, 'manifests_bak');

// `.keep` file of backup manifests directory.
pathInfo.manifestsBakDirKeepFile = path.join(pathInfo.manifestsBakDir, '.keep');

// Analyze command workspace is `.lila/analyze` directory of project root.
pathInfo.analyzeWorkspace = path.join(pathInfo.lilaWorkspace, 'analyze');

// gulpfile.js
pathInfo.gulpFile = path.join(pathInfo.lilaRoot, 'gulpfile.js');

/**
 * Some path information.
 *
 * @type {{lilaRoot: *|string, projectRoot: *|String, configFile: string}}
 */
module.exports = pathInfo;
