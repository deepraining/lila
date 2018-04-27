
'use strict';

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

    if (config.packCssSeparately) {
        if (config.enableCssModules) {
            rules.push(
                makeExtractCssLoader(!1, !0, !1),
                makeExtractCssLoader(!0, !1, !0),
                makeExtractLessLoader(!1, !0, !1),
                makeExtractLessLoader(!0, !1, !0)
            );
        }
        else {
            rules.push(
                makeExtractCssLoader(),
                makeExtractLessLoader()
            );
        }
    }
    else {
        if (config.enableCssModules) {
            rules.push(
                makeCssLoader(!1, !0, !1),
                makeCssLoader(!0, !1, !0),
                makeLessLoader(!1, !0, !1),
                makeLessLoader(!0, !1, !0)
            );
        }
        else {
            rules.push(
                makeCssLoader(),
                makeLessLoader()
            );
        }
    }

    rules.push(urlLoader);
    module.rules = rules;

    return module;
};
