
var distData = require('./data');
var getRequireJsModules = require('../handle/get_require_js_modules');

module.exports = {
    /**
     * find require-js modules
     */
    findRequireJsModules: (cb) => {
        if (distData.currentConfig.useRequireJs && distData.currentConfig.requireJsToTagLoad) {
            getRequireJsModules(distData.currentConfig);
        }
        cb();
    }
};