
var _ = require('lodash');
var fs = require('fs');
var del = require('del');
var fsExtra = require('fs-extra');
var projectConfig = require('../../project_config');

module.exports = {
    // log first module start
    logFirstModule: (cb) => {
        projectConfig.multiModules && logger.info('start first module task: ' + projectConfig.modules[0]);
        cb();
    }
};