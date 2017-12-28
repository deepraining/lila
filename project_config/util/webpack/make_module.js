
'use strict';

var babelLoader = require('../../../webpack/loaders/babel_loader');
var cssLoader = require('../../../webpack/loaders/css_loader');
var lessLoader = require('../../../webpack/loaders/less_loader');
var urlLoader = require('../../../webpack/loaders/url_loader');
var extractCssLoader = require('../../../webpack/loaders/extract_css_loader');
var extractLessLoader = require('../../../webpack/loaders/extract_less_loader');

module.exports = (config) => {

    var module = {};
    var rules = [babelLoader];

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