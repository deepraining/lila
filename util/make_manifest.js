/**
 * Make a manifest file.
 *
 * @param mark Manifest mark.
 * @param env
 * @returns {string}
 */
module.exports = (mark = 'base', env = 0) => {
  return `manifest-${mark}-${env}.json`;
};
