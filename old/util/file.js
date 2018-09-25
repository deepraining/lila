const fs = require('fs');

/**
 * File utils.
 *
 * @type {{
 *     dirExist: function(*=),
 *     fileExist: function(*=)
 * }}
 */
module.exports = {
  /**
   * Check directory if exists.
   *
   * @param dirPath
   * @returns {boolean}
   */
  dirExist: dirPath => {
    try {
      const stat = fs.statSync(dirPath);

      return stat.isDirectory();
    } catch (err) {
      if (err.code === 'ENOENT') {
        return !1;
      } else {
        throw new Error(err);
      }
    }
  },
  /**
   * Check file if exists.
   *
   * @param filePath
   * @returns {boolean}
   */
  fileExist: filePath => {
    try {
      const stat = fs.statSync(filePath);

      return stat.isFile();
    } catch (err) {
      if (err.code === 'ENOENT') {
        return !1;
      } else {
        throw new Error(err);
      }
    }
  },
};
