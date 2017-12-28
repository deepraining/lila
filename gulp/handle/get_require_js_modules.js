
var _ = require('lodash');
var cheerio = require('cheerio');
var fs = require('fs');

var getAllRequireJsModules = require('../../util/get_all_require_js_modules');
var getRequireJsModulesPaths = require('../../util/get_require_js_modules_paths');

module.exports = (config) => {
    // if is multi modules, no more handling
    if (!config.useRequireJs || !config.requireJsToTagLoad || config.multiModules) return;

    var htmlPath = config.buildPaths.copiedDev.html + '/' + config.module + '.html';

    if (!fs.existsSync(htmlPath)) return;

    // make $
    var $ = cheerio.load(fs.readFileSync(htmlPath), {decodeEntities: !1});

    // get all modules, include dependencies
    config.requireJsAllModules = getAllRequireJsModules(config);

    // get all modules paths
    config.requireJsAllModulesPaths = getRequireJsModulesPaths(config.requireJsAllModules, config.requireJsConfig, config);
};