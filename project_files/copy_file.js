const path = require('path');
const fsExtra = require('fs-extra');

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
  let filePath = path.join(__dirname, subDir, hasPrefix ? '_' + fileName : fileName);
  let targetFilePath = path.join(targetDir, fileName);

  let content = fsExtra.readFileSync(filePath, 'utf8');

  if (replaceTarget && replacement) content = content.replace(replaceTarget, replacement);

  fsExtra.outputFileSync(targetFilePath, content);
};
