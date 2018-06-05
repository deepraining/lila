
var webpack = require('webpack');
var devMiddleWare = require('webpack-dev-middleware');
var hotMiddleWare = require('webpack-hot-middleware');
var browserSync = require('browser-sync');

var checkConfigFile = require('../util/check_config_file');
var treatAllMethodsAsGet = require('../util/treat_all_methods_as_get');
var vars = require('../data/vars');
var moduleName = vars.argv.module;

if (!moduleName) {
    logger.error('Missing module name for command: dev.', !0, !0);
    logger.log('You can use this command as follows:');
    logger.log('lila dev <name>');
    process.exit(0);
}

checkConfigFile();

var projectConfig = require('../project_config');

var compiler = webpack(projectConfig.webpackDevConfig);
let browserSyncConfig = projectConfig.browserSync || {};
browserSyncConfig.server = {
    baseDir: projectConfig.basePaths.webRoot
};
browserSyncConfig.port = projectConfig.devServerPort;
browserSyncConfig.startPath = projectConfig.basePaths.webPrefix + '/dev/' + projectConfig.module + '/index.html';

!browserSyncConfig.middleware && (browserSyncConfig.middleware = []);

// this must in the first place
projectConfig.treatAllMethodsAsGet && browserSyncConfig.middleware.unshift(treatAllMethodsAsGet);

browserSyncConfig.middleware.push(devMiddleWare(compiler, {
    stats: 'errors-only',
    publicPath: projectConfig.basePaths.webPrefix + '/dev/' + projectConfig.module
}));
browserSyncConfig.middleware.push(hotMiddleWare(compiler));

browserSync.init(browserSyncConfig);
