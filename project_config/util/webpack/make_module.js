
'use strict';

var _ = require('lodash');

var makeBabelLoader = require('../../../webpack/loaders/babel_loader');
var makeCssLoader = require('../../../webpack/loaders/css_loader');
var makeLessLoader = require('../../../webpack/loaders/less_loader');
var makeUrlLoader = require('../../../webpack/loaders/url_loader');
var makeHtmlLoader = require('../../../webpack/loaders/html_loader');
var makeExtractCssLoader = require('../../../webpack/loaders/extract_css_loader');
var makeExtractLessLoader = require('../../../webpack/loaders/extract_less_loader');

module.exports = (config) => {

    var babelLoader = makeBabelLoader(config);
    var cssLoader = makeCssLoader();
    var lessLoader = makeLessLoader();
    var urlLoader = makeUrlLoader(config, !0);
    var htmlLoader = makeHtmlLoader();
    var extractCssLoader = makeExtractCssLoader();
    var extractLessLoader = makeExtractLessLoader();

    var module = {};
    var rules = [babelLoader, htmlLoader];

    if (config.packCssSeparately) {
        rules.push(extractCssLoader);
        rules.push(extractLessLoader);
    }
    else {
        rules.push(cssLoader);
        rules.push(lessLoader);
    }

    rules.push(urlLoader);
    module.rules = rules;

    return module;
};