
var pathUtil = {
    /**
     * get pure module name of a module
     *
     * example:
     * getModuleName('index') = 'index';
     * getModuleName('test/index') = 'index';
     * getModuleName('parent/test/index') = 'index';
     *
     * @param module
     * @returns {string}
     */
    getModuleName: (module) => {
        var lastSlashIndex = module.lastIndexOf('/');

        return lastSlashIndex == -1 ? module : module.slice(lastSlashIndex + 1);
    },
    /**
     * get module directory of a module
     *
     * example:
     * getModuleDir('index') = '';
     * getModuleDir('test/index') = 'test';
     * getModuleDir('parent/test/index') = 'parent/test';
     *
     * @param module
     * @returns {string}
     */
    getModuleDir: (module) => {
        var lastSlashIndex = module.lastIndexOf('/');

        return lastSlashIndex == -1 ? '' : module.slice(0, lastSlashIndex);
    },
    /**
     * replace back slash with slash
     *
     * example:
     * \\ -> /
     * \\\\ -> /
     *
     * @param str
     * @returns {string}
     */
    replaceBackSlash: (str) => {
        return str.replace(/(\\\\|\\)/g, '/');
    }
};

module.exports = pathUtil;
