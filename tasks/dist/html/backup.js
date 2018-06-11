
const fsExtra = require('fs-extra');
const moment = require('moment');
const rd = require('rd');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');
const pathUtil = require('../../../util/path');
const current = require('../current');


/**
 * Backup html or file converted from html with time suffix.
 *
 * @example
 *
 * ```
 * dist/html/test/index.html -> dist/html/test/index-2016-07-01-12-12-12.html
 * ```
 *
 * @param cb
 */
module.exports = cb => {
    logger.log('Start backing up html files.');

    if (current.config.backupHtml){
        const suffix = moment().format('YYYY-MM-DD-HH-mm-ss');

        rd.eachFileFilterSync(projectConfig.buildPaths.dist.html, file => {
            // Source file path.
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
};
