
var _ = require('lodash');
var fsExtra = require('fs-extra');

var getAmdDependenciesFromContent = require('./get_amd_dependencies_from_content');
var getRealJsModules = require('./get_real_js_modules');

/**
 * get all require-js modules
 *
 * @returns {*}
 * @param projectConfig
 */
module.exports = (projectConfig) => {

    /**
     * require-js config and path, deps
     * @type {*|{}}
     */
    var config = projectConfig.requireJsConfig || {};
    var configPaths = config.paths || {};
    var configShim = config.shim || {};

    /**
     * ultimate result
     * @type {[]}
     */
    var ultimateModules = [];
    /**
     * dependencies
     *
     * example: moduleName -> deps(array)
     *
     * @type {{}}
     */
    var moduleDeps = {};
    /**
     * find module dependency record
     * @type {Array}
     */
    var foundModules = [];
    /**
     * get module list record
     *
     * @type {Array}
     */
    var loadedModules = [];

    /**
     * get all module dependencies
     * @param name
     */
    var getDependencies = (name) => {
        if (foundModules.indexOf(name) != -1) return;

        foundModules.push(name);

        // make default
        var realJsModule = name;

        /**
         * {
         *     jquery: 'lib/jquery/jquery'
         * }
         *
         * require(['jquery']);
         */
        if (configPaths[name]) realJsModule = configPaths[name];
        /**
         * {
         *     'jquery-ui': 'lib/jquery-ui'
         * }
         *
         * require(['jquery-ui/jquery-ui']);
         */
        else if (name.indexOf('/') > -1) {
            var nameArray = name.split('/'),
                nameParent = nameArray.shift();

            if (configPaths[nameParent]) {
                realJsModule = configPaths[nameParent] + '/' + nameArray.join('/');
            }
        }

        var jsFilePath = projectConfig.buildPaths.copiedDev.js + '/' + realJsModule + '.js',
            jsFileContent = fsExtra.readFileSync(jsFilePath, 'utf8'),
            configDep = configShim[name] && configShim[name].deps || [],
            contentDep = getRealJsModules(getAmdDependenciesFromContent(jsFileContent), realJsModule),
            currentDep = _.concat([], configDep, contentDep);

        moduleDeps[name] = currentDep;

        currentDep.forEach((subName) => {
            getDependencies(subName);
        });
    };

    /**
     * load module
     * @param name
     */
    var loadModule = (name) => {
        if (loadedModules.indexOf(name) != -1) return;

        loadedModules.push(name);

        var deps = moduleDeps[name] || [];
        deps.length && deps.forEach((subName) => {
            loadModule(subName);
        });

        var realName = configPaths[name] ? configPaths[name] : name;
        if (ultimateModules.indexOf(realName) === -1) {
            ultimateModules.push(realName);
        }
    };

    getDependencies(projectConfig.module);
    loadModule(projectConfig.module);

    return ultimateModules;
};