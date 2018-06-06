
const pathUtil = require('./path');

/**
 * if `file` is a manifest file
 *
 * @param file
 */
module.exports = (file) => {
    const filePath = pathUtil.replaceBackSlash(file);
    const lastSlashIndex = filePath.lastIndexOf('/');
    const fileName = lastSlashIndex == -1 ? filePath : filePath.slice(lastSlashIndex + 1);

    return fileName.slice(0, 8) == 'manifest' && fileName.slice(-4) == 'json'
};
