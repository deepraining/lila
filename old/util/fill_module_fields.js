
var pathUtil = require('./path');

module.exports = (config) => {
    config.moduleDir = pathUtil.getModuleDir(config.module);
    config.moduleName = pathUtil.getModuleName(config.module);
};
