/**
 * Test a file path whether is url or not.
 *
 * @param filePath
 * @returns {boolean}
 */
module.exports = filePath => {
  return filePath.slice(0, 7) === 'http://' || filePath.slice(0, 8) === 'https://' || filePath.slice(0, 2) === '//';
};
