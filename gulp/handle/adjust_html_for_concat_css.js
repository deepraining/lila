
"use strict";

var fsExtra = require('fs-extra');
var cheerio = require('cheerio');
var _ = require('lodash');

var selector = require('../../data/selector');

var getConcatFileNme = require('../../util/get_concat_file_name');

module.exports = (config) => {
    // current html file path
    var currentFile = config.buildPaths.extract.html + '/' + config.moduleHtml;
    // file content
    var currentFileContent = fsExtra.readFileSync(currentFile, 'utf8');
    // make $
    var $ = cheerio.load(currentFileContent, {decodeEntities: !1});
    // all css links cheerio objects
    var $links = $(selector.validCss);
    var $lastLink = $($links[0]);
    /**
     * path prefix of js path
     *
     * example: test/index -> ../../
     *
     * @type {string}
     */
    var prefix = _.fill(new Array(config.module.split('/').length), '../').join('') + 'css/' + config.moduleDir + '/';

    config.processingData.concatCssKeys.forEach((key) => {
        var group = config.processingData.concatCssGroup[key];
        var fileName = getConcatFileNme(config.moduleName, key);

        // target file name exist
        if (group && group.length) $lastLink.before(`\n<link rel="stylesheet" href="${prefix}${fileName}.css">\n`);
    });
    // remove all css link tags
    $links.remove();
    // save content to origin file
    fsExtra.outputFileSync(currentFile, $.html());
};