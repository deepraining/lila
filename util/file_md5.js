const fs = require('fs');
const md5 = require('crypto-md5');

/**
 * Get md5 of a file.
 *
 * @param filePath
 * @returns {*}
 */
module.exports = filePath => {
  return md5(fs.readFileSync(filePath), 'hex');
};
