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
  let hashCodes = [];

  let dir = pathInfo.projectRoot + '/dist';
  let testRegExp = makeRegExp.matchJsFileName(share.hashDigestLength);

  // Find all files and extract hash codes.
  fs.existsSync(dir) &&
    rd.eachFileFilterSync(dir, file => {
      // File path.
      let filePath = pathUtil.replaceBackSlash(file);
      if (!testRegExp.test(filePath)) return;

      // File content.
      let content = fs.readFileSync(file);

      let regExp = makeRegExp.extractFromJs(share.hashDigestLength);
      let result;
      while ((result = regExp.exec(content))) {
        hashCodes.push(result[1]);
      }
    });

  return hashCodes;
};
