
var _ = require('lodash');
var fs = require('fs');
var del = require('del');
var fsExtra = require('fs-extra');
var projectConfig = require('../../project_config');

module.exports = {
    // files map
    filesMap: (cb) =>  {
        _.forEach(projectConfig.currentFilesMap, (value, key) => {

            var sourcePath = projectConfig.buildPaths.copiedDev.dir + '/' + value;
            var targetPath = projectConfig.buildPaths.copiedDev.dir + '/' + key;

            if (fs.existsSync(sourcePath)) {
                fsExtra.copySync(sourcePath, targetPath);
                del.sync([sourcePath], {force: !0});
            }
        });

        cb();
    },
    // directories map
    dirsMap: (cb) =>  {
        _.forEach(projectConfig.currentDirsMap, (value, key) => {

            var sourcePath = projectConfig.buildPaths.copiedDev.dir + '/' + value;
            var targetPath = projectConfig.buildPaths.copiedDev.dir + '/' + key;
            if (fs.existsSync(sourcePath)) {
                // if target directory exists, should remove it first.
                fs.existsSync(targetPath) && del.sync([targetPath], {force: !0});
                fsExtra.copySync(sourcePath, targetPath);
                del.sync([sourcePath], {force: !0});
            }
        });

        cb();
    },
    // log first module start
    logFirstModule: (cb) => {
        projectConfig.multiModules && logger.info('start first module task: ' + projectConfig.modules[0]);
        cb();
    }
};