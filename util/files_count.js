
const rd = require('rd');

/**
 * Get all files count of a directory.
 *
 * @param dir
 * @returns {number}
 */
module.exports = dir => {
    let count = 0;

    rd.eachFileFilterSync(dir, () => {
        count += 1;
    });

    return count;
};
