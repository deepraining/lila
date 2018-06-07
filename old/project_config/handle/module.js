
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const rd = require('rd');
const pathUtil = require('../../util/path');
const fillModuleFields = require('../../util/fill_module_fields');

// comma match
const commaMarkRegExp = /,/;
// asterisk match
const asteriskMarkRegExp = /\*/;

/**
 * get modules of a asterisk module
 *
 * example: getModules('test/*', config) = ['test/index', 'test/index2', 'test/index/index', ...]
 *
 * @param module
 * @param config
 * @returns {*}
 */
const getModules = (module, config) => {
    if (!asteriskMarkRegExp.test(module)) return [module];

    const dir;
    const modules = [];

    // all module
    if (module == '*') dir = config.buildPaths.src.dir;
    // test/*
    else if (module.slice(-2) == '/*') dir = config.buildPaths.src.dir + '/' + module.slice(0, -2);
    // other
    else logger.throw('can not resolve module ' + module);

    // get all modules
    rd.readDirFilterSync(dir, (dirPath) => {
        const htmlFile = dirPath + '/index.html';
        const jsFile = dirPath + '/index.js';

        // both `index.html` and `index.js` exist, announcing this is a module
        if (fs.existsSync(htmlFile) && fs.existsSync(jsFile)) {
            const index = path.relative(config.buildPaths.src.dir, dirPath);
            modules.push(pathUtil.replaceBackSlash(index));
        }
    });

    return modules;
};

module.exports = (config) => {
    const module = config.module;
    const hasCommaMark = commaMarkRegExp.test(module);
    const hasAsteriskMark = asteriskMarkRegExp.test(module);

    config.multiple = !1;
    config.processing.moduleIndex = 0;
    config.allModules = [];

    // single module, no comma, no asterisk
    if (!hasCommaMark && !hasAsteriskMark) {
        config.allModules.push(module);
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
    const modules = [];
    /**
     * formatted module array(make all asterisk module to real module)
     *
     * example: ['test/index', 'test2/index', 'test2/index2', ...]
     *
     * @type {Array}
     */
    const allModules = [];

    // handle comma
    if (hasCommaMark) modules = module.split(',');
    else modules = [module];

    modules.forEach((item) => {
        allModules = _.concat(allModules, getModules(item, config));
    });

    config.allModules = allModules;
    config.multiple = !0;
    config.module = config.allModules[config.processing.moduleIndex];
    fillModuleFields(config);
};
