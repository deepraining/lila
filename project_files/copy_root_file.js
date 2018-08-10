const copyFile = require('./copy_file');

/**
 * Copy project's root file.
 *
 * @param targetDir Project target directory.
 * @param fileName File to copy.
 * @param hasPrefix Whether `fileName` has `_` prefix.
 * @param replace Whether to replace content. `[{target, replacement}]`
 */
module.exports = (targetDir, fileName, hasPrefix, replace) => {
  copyFile('root', targetDir, fileName, hasPrefix, replace);
};
