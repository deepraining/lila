
var projectConfig = require('../../project_config');
var projectConfigs = require('../../project_config/configs');

var data = {
    // current module index
    currentModuleIndex: 0,
    // current config
    currentConfig: projectConfigs[0]
};

// next module
data.nextModule = (log) => {
    if (!projectConfig.multiple) return;

    log && logger.success('task for module ' + projectConfig.allModules[data.currentModuleIndex] + ' finished');

    data.currentModuleIndex += 1;

    data.currentModuleIndex >= projectConfig.allModules.length && (data.currentModuleIndex = 0);

    log && data.currentModuleIndex > 0 && logger.info('change current module to: ' + projectConfig.allModules[data.currentModuleIndex]);

    data.currentConfig = projectConfigs[data.currentModuleIndex];
};

module.exports = data;
