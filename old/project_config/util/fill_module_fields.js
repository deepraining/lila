const pathUtil = require('../../util/path');

/**
 * Fill fields of `moduleDir, moduleName` of one module.
 *
 * @param config
 */
module.exports = config => {
  config.moduleDir = pathUtil.getModuleDir(config.module);
  config.moduleName = pathUtil.getModuleName(config.module);
};
