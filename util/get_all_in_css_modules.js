
var _ = require('lodash');

/**
 * get all in-css modules
 *
 * @param modules
 * @param options
 * @returns {*}
 */
module.exports = (modules, options) => {

    /**
     * in-css config and path, deps
     * @type {*|{}}
     */
    var config = options || {};
    var configPaths = config.paths || {};
    var configDeps = config.deps || {};

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

        var currentDep = configDeps[name] || [];
        !Array.isArray(currentDep) && (currentDep = [currentDep]);

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

    modules.forEach((name) => {
        if (typeof name != 'string') {
            throw new Error('module ' + name + ' is not a valid in-css module name.');
        }
        getDependencies(name);
        loadModule(name);
    });

    return ultimateModules;
};