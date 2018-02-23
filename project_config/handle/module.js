
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var rd = require('rd');
var pathUtil = require('../../util/path');
var fillModuleFields = require('../../util/fill_module_fields');

// comma match
var commaMarkRegExp = /,/;
// asterisk match
var asteriskMarkRegExp = /\*/;

/**
 * get modules of a asterisk module
 *
 * example: getModules('test/*', config) = ['test/index', 'test/index2', 'test/index/index', ...]
 *
 * @param module
 * @param config
 * @returns {*}
 */
var getModules = (module, config) => {
    if (!asteriskMarkRegExp.test(module)) return [module];

    var dir;
    var modules = [];

    // all module
    if (module == '*') dir = config.buildPaths.src.dir;
    // test/*
    else if (module.slice(-2) == '/*') dir = config.buildPaths.src.dir + '/' + module.slice(0, -2);
    // other
    else logger.throw('can not resolve module ' + module);

    // get all modules
    rd.readDirFilterSync(dir, (dirPath) => {
        var htmlFile = dirPath + '/index.html';
        var jsFile = dirPath + '/index.js';

        // both `index.html` and `index.js` exist, announcing this is a module
        if (fs.existsSync(htmlFile) && fs.existsSync(jsFile)) {
            var index = path.relative(config.buildPaths.src.dir, dirPath);
            modules.push(pathUtil.replaceBackSlash(index));
        }
    });

    return modules;
};

module.exports = (config) => {
    var module = config.module;
    var hasCommaMark = commaMarkRegExp.test(module);
    var hasAsteriskMark = asteriskMarkRegExp.test(module);

    config.multiModules = !1;
    config.processingData.moduleIndex = 0;
    config.modules = [];

    // single module, no comma, no asterisk
    if (!hasCommaMark && !hasAsteriskMark) {
        config.modules.push(module);
        fillModuleFields(config);

        return;
    }

    /**
     * module array
     *
     * example: ['test/index', 'test2/*']
     *
     * @type {Array}
     */
    var modules = [];
    /**
     * formatted module array(make all asterisk module to real module)
     *
     * example: ['test/index', 'test2/index', 'test2/index2', ...]
     *
     * @type {Array}
     */
    var allModules = [];

    // handle comma
    if (hasCommaMark) modules = module.split(',');
    else modules = [module];

    modules.forEach((item) => {
        allModules = _.concat(allModules, getModules(item, config));
    });

    config.modules = allModules;
    config.multiModules = !0;
    config.module = config.modules[config.processingData.moduleIndex];
    fillModuleFields(config);
};