const fs = require('fs');
const rd = require('rd');

const pathInfo = require('../../data/path_info');
const share = require('../../share');
const pathUtil = require('../../util/path');
const makeRegExp = require('./reg_exp');

/**
 * Extract `js` chunk hash codes from all normal js files.
 *
 * @returns {Array}
 */
module.exports = () => {
  const hashCodes = [];

  const dir = `${pathInfo.projectRoot}/dist`;
  const testRegExp = makeRegExp.matchJsFileName(share.hashDigestLength);

  // Find all files and extract hash codes.
  fs.existsSync(dir) &&
    rd.eachFileFilterSync(dir, file => {
      // File path.
      const filePath = pathUtil.replaceBackSlash(file);
      if (!testRegExp.test(filePath)) {
        return;
      }

      // File content.
      const content = fs.readFileSync(file);

      const regExp = makeRegExp.extractFromJs(share.hashDigestLength);
      let result;
      while ((result = regExp.exec(content))) {
        hashCodes.push(result[1]);
      }
    });

  return hashCodes;
};
