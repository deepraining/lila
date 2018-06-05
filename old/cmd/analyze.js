
var webpack = require('webpack');

var checkConfigFile = require('../util/check_config_file');
var vars = require('../data/vars');
var moduleName = vars.argv.module;

if (!moduleName) {
    logger.error('Missing module name for command: analyze.', !0, !0);
    logger.log('You can use this command as follows:');
    logger.log('lila analyze <name>');
    process.exit(0);
}

checkConfigFile();

var projectConfig = require('../project_config');

webpack(projectConfig.webpackAnalyzeConfig, (err, stats) => {
    if (err) {
        logger.error(err.stack || err);
        if (err.details) {
            logger.error(err.details);
        }
        process.exit(0);
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        info.errors.forEach((error) => {
            logger.error(error);
        });
        process.exit(0);
    }

    if (stats.hasWarnings()) {
        info.warnings.forEach(function (warning) {
            logger.warn(warning);
        });
    }
});
