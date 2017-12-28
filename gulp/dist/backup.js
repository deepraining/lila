
var rd = require('rd');
var fsExtra = require('fs-extra');
var moment = require('moment');
var pathUtil = require('../../util/path');
var distData = require('./data');

module.exports = {
    /**
     * backup html or file converted from html with time suffix
     *
     * example:
     *     dist/html/test/index.html
     *     copy ->
     *     dist/html/test/index-2016-07-01-12-12-12.html
     *
     * @param cb
     */
    backupHtml: (cb) =>  {
        if (distData.currentConfig.currentNetworkOption.backupHtml){
            var suffix = moment().format('YYYY-MM-DD-HH-mm-ss');

            rd.eachFileFilterSync(distData.currentConfig.buildPaths.dist.html, (file) => {
                // source file path
                var sourcePath = pathUtil.replaceBackSlash(file);

                var lastSlashIndex = sourcePath.lastIndexOf('/');
                var dir = sourcePath.slice(0, lastSlashIndex);
                var fileName = sourcePath.slice(lastSlashIndex + 1);

                var lastDotIndex = fileName.lastIndexOf('.');
                var baseFileName = fileName.slice(0, lastDotIndex);
                var extName = fileName.slice(lastDotIndex + 1);

                var targetPath = dir + '/' + baseFileName + '-' + suffix + '.' + extName;

                fsExtra.copySync(sourcePath, targetPath);
            });
        }
        cb();
    }
};