
var _ = require('lodash');
var cheerio = require('cheerio');
var fs = require('fs');
var inCssUtil = require('../../util/in_css');
var getAllInCssModules = require('../../util/get_all_in_css_modules');
var getInCssModulesPaths = require('../../util/get_in_css_modules_paths');

/**
 * in-css modules must gotten before gulp run tasks.
 *
 * @param config
 */
module.exports = (config) => {
    // if is multi modules, no more handling
    if (!config.useInCss || config.multiModules) return;

    var moduleHtml = config.currentFilesMap && config.currentFilesMap[config.moduleHtml] || config.moduleHtml;

    var htmlPath = config.buildPaths.dev.html + '/' + moduleHtml;

    if (!fs.existsSync(htmlPath)) {
        config.inCssModules = [];
        config.inCssAllModules = [];
        return;
    }

    // make $
    var $ = cheerio.load(fs.readFileSync(htmlPath), {decodeEntities: !1});
    // get InCss.use() content
    var useContent = $(config.inCssLoadTagSelector).text();

    // get modules
    config.inCssModules = inCssUtil.getModulesFromUseContent(useContent);

    // get all modules, include dependencies
    config.inCssAllModules = getAllInCssModules(config.inCssModules, config.inCssConfig);

    // get all modules paths
    config.inCssAllModulesPaths = getInCssModulesPaths(config.inCssAllModules, config.inCssConfig, config);
};