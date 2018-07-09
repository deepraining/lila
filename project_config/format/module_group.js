/**
 * Import module is a module group, not an existed module.
 *
 * @param config
 */
module.exports = config => {
  if (config.moduleGroup && config.moduleGroup[config.module]) {
    config.module = config.moduleGroup[config.module].join(',');
  }
};
