const keys = require('lodash/keys');

/**
 * Processing `directoriesToSync`.
 *
 * @param config
 */
module.exports = config => {
  // No directories.
  if (!config.directoriesToSync || !keys(config.directoriesToSync).length) {
    return;
  }

  /**
   * Keys of directories.
   *
   * @type {Array}
   */
  config.processing.syncDirKeys = keys(config.directoriesToSync);

  /**
   * Items of directories.
   *
   * @example
   *
   * ```
   * {
   *   key1: {
   *     path: Directory absolute path.
   *     path: Directory absolute path.
   *   }
   * }
   * ```
   *
   * @type {{}}
   */
  config.processing.syncDirItems = {};

  // Generate `syncDirItems`.
  config.processing.syncDirKeys.forEach(key => {
    // Absolute path.
    const path = `${config.basePaths.webRoot}/${config.directoriesToSync[key]}`;

    // Add an item.
    config.processing.syncDirItems[key] = { path };
  });
};
