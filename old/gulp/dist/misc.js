
const _ = require('lodash');
const fs = require('fs');
const del = require('del');
const fsExtra = require('fs-extra');
const projectConfig = require('../../project_config');

module.exports = {
    // log first module start
    logFirstModule: (cb) => {
        projectConfig.multiple && logger.info('start first module task: ' + projectConfig.allModules[0]);
        cb();
    }
};
