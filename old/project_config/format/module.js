const fs = require('fs');
const path = require('path');
const concat = require('lodash/concat');
const rd = require('rd');

const pathUtil = require('../../util/path');
const logger = require('../../util/logger');
const fillModuleFields = require('../util/fill_module_fields');

// Match comma.
const commaRegExp = /,/;
// Match asterisk.
const asteriskRegExp = /\*/;

/**
 * Get modules by an asterisk module.
 *
 * @example
 *
 * ```
 * getModules('test/*', config) = ['test/index', 'test/index2', 'test/index/index', ...]
 * ```
 *
 * @param module
 * @param config
 * @returns {*}
 */
const getModules = (module, config) => {
  // No asterisk.
  if (!asteriskRegExp.test(module)) {
    return [module];
  }

  let dir;
  const modules = [];

  // All modules in current project.
  if (module === '*') {
    dir = config.buildPaths.src.dir;
  }
  // test/*
  else if (module.slice(-2) === '/*') {
    dir = `${config.buildPaths.src.dir}/${module.slice(0, -2)}`;
  }
  // The rest.
  else {
    logger.error(`
  Can not resolve module ${module}.
    `);
    process.exit(1);
  }

  // Dir not exist.
  if (!fs.existsSync(dir)) return modules;

  // Get all modules.
  rd.readDirFilterSync(dir, dirPath => {
    const htmlFile = `${dirPath}/index.html`;
    const jsFile = `${dirPath}/index.js`;

    // Both `index.html` and `index.js` exist, means this directory is a module's workspace.
    if (fs.existsSync(htmlFile) && fs.existsSync(jsFile)) {
      const realModule = path.relative(config.buildPaths.src.dir, dirPath);
      modules.push(pathUtil.replaceBackSlash(realModule));
    }
  });

  return modules;
};

/**
 *
 *
 * @param config
 */
module.exports = config => {
  const currentModule = config.module;
  // Has `,` in module.
  const hasComma = commaRegExp.test(currentModule);
  // Has `*` in module.
  const hasAsterisk = asteriskRegExp.test(currentModule);

  // Default is false.
  config.multiple = !1;
  config.allModules = [];

  // No comma, no asterisk, means single module.
  if (!hasComma && !hasAsterisk) {
    config.allModules.push(currentModule);
    fillModuleFields(config);

    return;
  }

  /**
   * Module collection.
   *
   * @example
   *
   * ```
   * ['test/index', 'test2/*']
   * ```
   *
   * @type {Array}
   */
  let modules = [];
  /**
   * Formatted module collection(make all asterisk module to real module).
   *
   * @example
   *
   * ```
   * ['test/index', 'test2/index', 'test2/index2', ...]
   * ```
   *
   * @type {Array}
   */
  let allModules = [];

  // Split by comma.
  if (hasComma) {
    modules = currentModule.split(',');
  } else {
    modules = [currentModule];
  }

  modules.forEach(item => {
    allModules = concat(allModules, getModules(item, config));
  });

  if (!allModules.length) {
    logger.error(`
  No modules found by ${currentModule}.
    `);
    process.exit(1);
  }

  config.multiple = !0;
  config.allModules = allModules;
};
