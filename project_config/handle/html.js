
"use strict";

var _ = require('lodash');

module.exports = (config) => {

    // has replacing in html
    config.hasHtmlReplace = config.htmlReplace && !!_.keys(config.htmlReplace).length;
    // has inserting in html
    config.hasHtmlInsert = config.htmlInsert && !!_.keys(config.htmlInsert).length;
    // has converting to other extension file in html
    config.hasHtmlToSpecifiedExt = !!config.htmlExtension;
};