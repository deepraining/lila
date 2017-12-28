
'use strict';

var path = require('path');
var fs = require('fs');
var fsExtra = require('fs-extra');

var vars = require('../data/vars');

var cleanConfigPath = vars.projectRoot + '/' + vars.cleanConfigFile;

if (fs.existsSync(cleanConfigPath)) {
    logger.error(`Lila clean config file '${vars.cleanConfigFile}' already exists.`);
    process.exit(0);
}

// copy config file
fsExtra.copySync(path.join(vars.lilaRoot, 'project_files/config' + '/' + vars.cleanConfigFile), cleanConfigPath);

logger.success('Lila init clean successful!');