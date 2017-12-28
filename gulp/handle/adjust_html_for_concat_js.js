
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
    // all js scripts cheerio objects
    var $scripts = $(selector.validJs);
    var $lastScript = $($scripts[0]);
    /**
     * path prefix of js path
     *
     * example: test/index -> ../../
     *
     * @type {string}
     */
    var prefix = _.fill(new Array(config.module.split('/').length), '../').join('') + 'js/' + config.moduleDir + '/';

    config.processingData.concatJsKeys.forEach((key) => {
        var group = config.processingData.concatJsGroup[key];
        var fileName = getConcatFileNme(config.moduleName, key);

        // target file name exist
        if (group && group.length) $lastScript.before(`\n<script src="${prefix}${fileName}.js"></script>\n`);
    });
    // remove all js tags
    $scripts.remove();
    // save content to origin file
    fsExtra.outputFileSync(currentFile, $.html());
};