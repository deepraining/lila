
var _ = require('lodash');
var fs = require('fs');
var del = require('del');
var fsExtra = require('fs-extra');
var projectConfig = require('../../project_config');

module.exports = {
    // log first module start
    logFirstModule: (cb) => {
        projectConfig.multiple && logger.info('start first module task: ' + projectConfig.allModules[0]);
        cb();
    }
};
