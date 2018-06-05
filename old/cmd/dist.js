
var gulpCli = require('gulp-cli');

var vars = require('../data/vars');
var checkConfigFile = require('../util/check_config_file');

var moduleName = vars.argv.module;

if (!moduleName) {
    logger.error('Missing module name for command: dist.', !0, !0);
    logger.log('You can use this command as follows:');
    logger.log('lila dist <name>');
    process.exit(0);
}

checkConfigFile();

gulpCli();
