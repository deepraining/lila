
'use strict';

var webpack = require('webpack');
var devMiddleWare = require('webpack-dev-middleware');
var hotMiddleWare = require('webpack-hot-middleware');
var browserSync = require('browser-sync');
var gulpCli = require('gulp-cli');

var checkConfigFile = require('../util/check_config_file');
var changeCwd = require('../util/change_cwd');
var vars = require('../data/vars');
var moduleName = vars.argv.module;

if (!moduleName) {
    logger.error('Missing module name for command: dev.\n');
    logger.log('You can use this command like follows:');
    logger.log('lilacs dev <name>');
    process.exit(0);
}

checkConfigFile();

var projectConfig = require('../project_config');

// not use webpack
if (!projectConfig.useWebpack) {
    changeCwd();
    gulpCli();
    return;
}

// use webpack
var compiler = webpack(projectConfig.webpackDevConfig);
var browserSyncConfig = {
    server: {
        baseDir: projectConfig.basePaths.webRoot
    },
    port: projectConfig.serverPort,
    startPath: projectConfig.basePaths.webPrefix + '/dev/html/' + projectConfig.moduleHtml
};

browserSyncConfig.middleware = [
    devMiddleWare(compiler, {
        stats: 'errors-only',
        publicPath: projectConfig.basePaths.webPrefix + '/dev/js/' + projectConfig.moduleDir
    }),
    hotMiddleWare(compiler)
];

browserSync.init(browserSyncConfig);