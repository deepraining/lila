
'use strict';

var webpack = require('webpack');
var devMiddleWare = require('webpack-dev-middleware');
var hotMiddleWare = require('webpack-hot-middleware');
var browserSync = require('browser-sync');

var checkConfigFile = require('../util/check_config_file');
var vars = require('../data/vars');
var moduleName = vars.argv.module;

if (!moduleName) {
    logger.error('Missing module name for command: dev.', !0, !0);
    logger.log('You can use this command like follows:');
    logger.log('lila dev <name>');
    process.exit(0);
}

checkConfigFile();

var projectConfig = require('../project_config');

// use webpack
var compiler = webpack(projectConfig.webpackDevConfig);
var browserSyncConfig = {
    server: {
        baseDir: projectConfig.basePaths.webRoot
    },
    port: projectConfig.devServerPort,
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