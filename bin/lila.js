#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');

var vars = require('../data/vars');
var packageJson = require('../data/package_json');
var version = packageJson.version;
// here must require manually, for logger is not a global variable
var logger = require('../util/logger');
var showHelp = require('../util/show_help');

// -v --version
if (vars.argv.v || vars.argv.version) {
    logger.log(version);
    process.exit(0);
}
// -h --help
else if (vars.argv.h || vars.argv.help) {
    showHelp();
    process.exit(0);
}

var cwd = process.cwd();

var localLilaPath = path.join(cwd, 'node_modules/lila');
var localLilaPkgPath = path.join(localLilaPath, 'package.json');

if (!fs.existsSync(localLilaPkgPath)) {
    logger.error('missing local lila package', !0, !0);
    logger.log('please install local lila before next running:');
    logger.log('npm install lila --save-dev');
    process.exit(0);
}

var localLilaPkg = require(localLilaPkgPath);
var localLilaIndexPath = path.join(localLilaPath, localLilaPkg.main);

require(localLilaIndexPath);
