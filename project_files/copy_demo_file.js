
const copyFile = require('./copy_file');

/**
 * Copy project's demo file.
 *
 * @param targetDir Project target directory.
 * @param fileName File to copy.
 * @param hasPrefix Whether `fileName` has `_` prefix.
 * @param replaceTarget Whether to replace content.
 * @param replacement What to replace content.
 */
module.exports = (targetDir, fileName, hasPrefix, replaceTarget, replacement) => {
    copyFile('demo', targetDir, fileName, hasPrefix, replaceTarget, replacement);
};
