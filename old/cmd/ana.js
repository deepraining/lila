
const webpack = require('webpack');

const checkConfigFile = require('../util/check_config_file');
const vars = require('../data/vars');
const moduleName = vars.argv.module;

if (!moduleName) {
    logger.error('Missing module name for command: ana.', !0, !0);
    logger.log('You can use this command as follows:');
    logger.log('lila ana <name>');
    process.exit(0);
}

require('./analyze');
