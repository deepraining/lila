const cloneDeep = require('lodash/cloneDeep');

const origin = require('./origin');
const format = require('./format');

const config = require('./');

const allConfigs = [];

// Multiple modules.
if (config.multiple) {
  config.allModules.forEach(moduleName => {
    const clonedConfig = cloneDeep(origin);

    // Change current config's module attribute to `moduleName`.
    clonedConfig.module = moduleName;

    allConfigs.push(format(clonedConfig, !0));
  });
}
// Single module.
else {
  allConfigs.push(config);
}

/**
 * All configs(mainly for multiple modules occasion).
 *
 * @type {Array}
 */
module.exports = allConfigs;
