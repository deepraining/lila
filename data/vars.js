
'use strict';

var path = require('path');
var minimist = require('minimist');

var vars = {
    // lilacs root directory
    lilacsRoot: path.join(__dirname, '../'),
    // project root directory
    projectRoot: process.cwd(),
    argv: minimist(process.argv.slice(2)),
    // config file
    configFile: 'lilacs.config.js',
    // clean config file
    cleanConfigFile: 'lilacs.clean.config.js'
};

// file changes record manifests dir path
vars.manifestsDir = path.join(vars.projectRoot, 'manifests');
// file changes record dot keep file path
vars.manifestsDirDotKeepFile = path.join(vars.manifestsDir, '.keep');
// backup manifests dir path
vars.manifestsDirBak = path.join(vars.projectRoot, 'manifests_bak');
// backup dot keep file path
vars.manifestsDirBakDotKeepFile = path.join(vars.manifestsDirBak, '.keep');

module.exports = vars;