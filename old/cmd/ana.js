
var webpack = require('webpack');

var checkConfigFile = require('../util/check_config_file');
var vars = require('../data/vars');
var moduleName = vars.argv.module;

if (!moduleName) {
    logger.error('Missing module name for command: ana.', !0, !0);
    logger.log('You can use this command like follows:');
    logger.log('lila ana <name>');
    process.exit(0);
}

require('./analyze');
