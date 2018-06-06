
const rd = require('rd');
const fsExtra = require('fs-extra');
const moment = require('moment');
const pathUtil = require('../../util/path');
const distData = require('./data');

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
        if (distData.currentConfig.backupHtml){
            const suffix = moment().format('YYYY-MM-DD-HH-mm-ss');

            rd.eachFileFilterSync(distData.currentConfig.buildPaths.dist.html, (file) => {
                // source file path
                const sourcePath = pathUtil.replaceBackSlash(file);

                const lastSlashIndex = sourcePath.lastIndexOf('/');
                const dir = sourcePath.slice(0, lastSlashIndex);
                const fileName = sourcePath.slice(lastSlashIndex + 1);

                const lastDotIndex = fileName.lastIndexOf('.');
                const baseFileName = fileName.slice(0, lastDotIndex);
                const extName = fileName.slice(lastDotIndex + 1);

                const targetPath = dir + '/' + baseFileName + '-' + suffix + '.' + extName;

                fsExtra.copySync(sourcePath, targetPath);
            });
        }
        cb();
    }
};
