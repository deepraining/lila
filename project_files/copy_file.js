const path = require('path');
const fse = require('fs-extra');

/**
 * Copy project's files.
 *
 * @param subDir Sub directory in 'project_files'
 * @param targetDir Project target directory.
 * @param fileName File to copy.
 * @param hasPrefix Whether `fileName` has `_` prefix.
 * @param replaceTarget Whether to replace content.
 * @param replacement What to replace content.
 */
module.exports = (subDir, targetDir, fileName, hasPrefix, replaceTarget, replacement) => {
  const filePath = path.join(__dirname, subDir, hasPrefix ? `_${fileName}` : fileName);
  const targetFilePath = path.join(targetDir, fileName);

  let content = fse.readFileSync(filePath, 'utf8');

  if (replaceTarget && replacement) {
    content = content.replace(replaceTarget, replacement);
  }

  fse.outputFileSync(targetFilePath, content);
};
