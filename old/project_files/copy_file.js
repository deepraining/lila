const path = require('path');
const fse = require('fs-extra');

/**
 * Copy project's files.
 *
 * @param subDir Sub directory in 'project_files'
 * @param targetDir Project target directory.
 * @param fileName File to copy.
 * @param hasPrefix Whether `fileName` has `_` prefix.
 * @param replace Whether to replace content. `[{target, replacement}]`
 */
module.exports = (subDir, targetDir, fileName, hasPrefix, replace) => {
  const filePath = path.join(__dirname, subDir, hasPrefix ? `_${fileName}` : fileName);
  const targetFilePath = path.join(targetDir, fileName);

  let content = fse.readFileSync(filePath, 'utf8');

  if (replace) {
    replace.forEach(item => {
      content = content.replace(item.target, item.replacement);
    });
  }

  fse.outputFileSync(targetFilePath, content);
};
