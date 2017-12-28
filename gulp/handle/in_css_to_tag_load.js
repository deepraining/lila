
"use strict";

var path = require('path');
var cheerio = require('cheerio');
var fsExtra = require('fs-extra');

var pathUtil = require('../../util/path');
var wrapWithSlash = require('../../util/wrap_with_slash');

module.exports = (config) => {
    var htmlPath = config.buildPaths.extract.html + '/' + config.moduleHtml;
    // current html directory
    var htmlDir = config.buildPaths.extract.html + '/' + config.moduleDir;
    // html content
    var content = fsExtra.readFileSync(htmlPath, 'utf8');
    // make $
    var $ = cheerio.load(content, {decodeEntities: !1});
    // tags
    var relativeAllCssTags = [];

    config.inCssAllModulesPaths.forEach((cssPath) => {
        var extractCssPath = cssPath.replace(
            wrapWithSlash(config.buildPaths.copiedDev.dirName),
            wrapWithSlash(config.buildPaths.extract.dirName)
        );
        var newPath = pathUtil.replaceBackSlash(path.relative(htmlDir, extractCssPath));

        relativeAllCssTags.push(`<link rel="stylesheet" href="${newPath}">`);
    });

    // write new tags
    $('head').append('\n' + relativeAllCssTags.join('\n') + '\n');

    // remove original tags
    $(config.inCssTagSelector).remove();

    // save content to origin file
    fsExtra.outputFileSync(htmlPath, $.html());
};