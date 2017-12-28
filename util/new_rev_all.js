
'use strict';

var RevAll = require('gulp-rev-all');

/**
 * new gulp-rev-all instance
 *
 * @param manifestFile
 * @param hashLength
 */
module.exports = (manifestFile, hashLength) => {
    return new RevAll({
        fileNameManifest: manifestFile,
        hashLength: hashLength,
        dontRenameFile: ['.html', '.json'],
        dontUpdateReference: ['.html', '.json']
    });
};
