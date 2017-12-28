
var fs = require('fs');
var path = require('path');
var rd = require('rd');

var pathUtil = require('../util/path');

/**
 * get a file-hash map of all files under a directory
 *
 * @param dir Directory
 * @param ext Extension
 * @param hashLength Hash code length
 * @returns {{}}
 */
module.exports = (dir, ext, hashLength) => {
    // hash code length is default 8
    !hashLength && (hashLength = 8);

    var result = {};
    rd.eachFileFilterSync(dir, (file) => {

        var filePath = pathUtil.replaceBackSlash(path.relative(dir, file));

        var lastDotIndex = filePath.lastIndexOf('.');
        var extName = lastDotIndex < 0 ? '' : filePath.slice(lastDotIndex + 1);
        var fileName = lastDotIndex < 0 ? filePath : filePath.slice(0, lastDotIndex);

        if (!ext || ext == extName) {
            /**
             * index/index/index.12345678.js
             * ->
             * index/index/index: 12345678
             *
             *
             * @type {Map}
             */
            result[fileName.slice(0, fileName.length - hashLength - 1)] = fileName.slice(0 - hashLength);
        }
    });

    return result;
};