
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
    var cssLoader = makeCssLoader(config);
    var lessLoader = makeLessLoader(config);
    var urlLoader = makeUrlLoader(config, !0);
    var htmlLoader = makeHtmlLoader(config);
    var extractCssLoader = makeExtractCssLoader(config);
    var extractLessLoader = makeExtractLessLoader(config);

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
