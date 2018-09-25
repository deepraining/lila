const copyFile = require('./copy_file');

/**
 * Copy project's demo file.
 *
 * @param targetDir Project target directory.
 * @param fileName File to copy.
 * @param hasPrefix Whether `fileName` has `_` prefix.
 * @param replace Whether to replace content. `[{target, replacement}]`
 */
module.exports = (targetDir, fileName, hasPrefix, replace) => {
  copyFile('demo', targetDir, fileName, hasPrefix, replace);
};
