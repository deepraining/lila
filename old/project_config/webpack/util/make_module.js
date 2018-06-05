
var _ = require('lodash');

var makeBabelLoader = require('../loaders/babel_loader');
var makeCssLoader = require('../loaders/css_loader');
var makeLessLoader = require('../loaders/less_loader');
var makeUrlLoader = require('../loaders/url_loader');
var makeHtmlLoader = require('../loaders/html_loader');
var makeExtractCssLoader = require('../loaders/extract_css_loader');
var makeExtractLessLoader = require('../loaders/extract_less_loader');

module.exports = (config) => {

    var babelLoader = makeBabelLoader(config);
    var urlLoader = makeUrlLoader(config, !0);
    var htmlLoader = makeHtmlLoader(config);

    var module = {};
    var rules = [babelLoader, htmlLoader];

    let excludeMatches = config.cssModulesExclude;
    let browsers = config.browsers;
    if (config.packCssSeparately) {
        if (config.enableCssModules && excludeMatches) {
            rules.push(
                makeExtractCssLoader(!1, excludeMatches, !0, !1, browsers),
                makeExtractCssLoader(!0, excludeMatches, !1, !0, browsers),
                makeExtractLessLoader(!1, excludeMatches, !0, !1, browsers),
                makeExtractLessLoader(!0, excludeMatches, !1, !0, browsers)
            );
        }
        else if (config.enableCssModules) {
            rules.push(
                makeExtractCssLoader(!0, excludeMatches, !1, !1, browsers),
                makeExtractLessLoader(!0, excludeMatches, !1, !1, browsers)
            );
        }
        else {
            rules.push(
                makeExtractCssLoader(!1, [], !1, !1, browsers),
                makeExtractLessLoader(!1, [], !1, !1, browsers)
            );
        }
    }
    else {
        if (config.enableCssModules && excludeMatches) {
            rules.push(
                makeCssLoader(!1, excludeMatches, !0, !1, browsers),
                makeCssLoader(!0, excludeMatches, !1, !0, browsers),
                makeLessLoader(!1, excludeMatches, !0, !1, browsers),
                makeLessLoader(!0, excludeMatches, !1, !0, browsers)
            );
        }
        else if (config.enableCssModules) {
            rules.push(
                makeCssLoader(!0, excludeMatches, !1, !1, browsers),
                makeLessLoader(!0, excludeMatches, !1, !1, browsers)
            );
        }
        else {
            rules.push(
                makeCssLoader(!1, [], !1, !1, browsers),
                makeLessLoader(!1, [], !1, !1, browsers)
            );
        }
    }

    rules.push(urlLoader);
    module.rules = rules;

    return module;
};
