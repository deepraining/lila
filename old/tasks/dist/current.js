const allConfigs = require('../../project_config/all');

/**
 * Processing data.
 *
 * @type {{index: number, config}}
 */
module.exports = {
  /**
   * Current processing module index.
   */
  index: 0,
  /**
   * Current processing module config.
   */
  config: allConfigs[0],
};
