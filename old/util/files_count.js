const rd = require('rd');

/**
 * Get all files count of a directory.
 *
 * @param dir
 * @param extension
 * @returns {number}
 */
module.exports = (dir, extension) => {
  let count = 0;

  rd.eachFileFilterSync(dir, file => {
    if (!extension) count += 1;
    else {
      if (file.slice(0 - extension.length) === extension) count += 1;
    }
  });

  return count;
};
