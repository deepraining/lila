#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var cwd = process.cwd();

// here must require manually, for logger is not a global variable
var logger = require('../util/logger');

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
