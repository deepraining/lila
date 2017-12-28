
"use strict";

var path = require('path');
var pathUtil = require('./path');

module.exports = (modules, relativeModule) => {
    relativeModule = pathUtil.replaceBackSlash(relativeModule);
    var relativeModuleLastSlashIndex = relativeModule.lastIndexOf('/');
    var relativeModuleDir = relativeModuleLastSlashIndex != -1 ?
        relativeModule.slice(0, relativeModuleLastSlashIndex) : relativeModule;

    var newModules = [];
    modules.forEach((module) => {
        var newModule = module;
        if (module.slice(0, 1) == '.') {
            newModule = pathUtil.replaceBackSlash(path.join(relativeModuleDir, module));
        }
        newModules.push(newModule);
    });

    return newModules;
};
