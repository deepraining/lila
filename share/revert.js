module.exports = {
  /**
   * Existing archived packages.
   *
   * @type {array} Zip files collection.
   */
  packages: [],
  /**
   * Which package to revert.
   *
   * @type {int} Use this to confirm package(from old to new).
   * @default 1 Index is started by 1.
   */
  index: 1,
  // Zip file name to revert.
  revertZip: '',
};
