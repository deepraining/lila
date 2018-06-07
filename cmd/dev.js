
const webpack = require('webpack');
const devMiddleWare = require('webpack-dev-middleware');
const hotMiddleWare = require('webpack-hot-middleware');
const browserSync = require('browser-sync');

const logger = require('../util/logger');
const checkConfigFile = require('../util/check_config_file');
const treatAllMethodsAsGet = require('../util/treat_all_methods_as_get');
const argv = require('../data/argv');

// Currently developing module name.
const moduleName = argv.module;

if (!moduleName) {
    logger.error(`
    Missing module name for command: dev.
    `);
    logger.log(`
    You can use this command as follows:
    
    lila dev <name>
    `);
    process.exit(0);
}

checkConfigFile();

// Project config.
const projectConfig = require('../project_config');

// todo: to be continued.

const compiler = webpack(projectConfig.webpackDevConfig);
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
