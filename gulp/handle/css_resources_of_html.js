
"use strict";

var fsExtra = require('fs-extra');
var cheerio = require('cheerio');
var _ = require('lodash');

var selector = require('../../data/selector');

/**
 * extract all css files from html content
 *
 * @param content
 * @returns {Array}
 */
var getResources = (content) => {
    var $ = cheerio.load(content, {decodeEntities: !1});
    // all css links
    var $links = $(selector.validCss);
    var files = [];

    $links.map((index) => {
        files.push($($links[index]).attr('href'));
    });

    return files;
};

/**
 * get purified resources
 *
 * example:
 *     ['../../../css/test/index.css']
 *     ->
 *     ['test/index.css']
 *
 * @param resources
 * @returns {Array}
 */
var pureResources = (resources) => {
    var newResources = [];
    resources.forEach((resource) => {
        /**
         * 1. remove all dot and slash
         * 2. remove /css
         *
         * example:
         *     ../../../css/test/index.css
         *     ->
         *     test/index.css
         */
        newResources.push(_.trimStart(resource, './').slice(4));
    });
    return newResources;
};

/**
 * group all resources by concatCssPriority
 *
 * @param config
 * @param resources
 */
var groupResources = (config, resources) => {
    resources.forEach((resource) => {
        // resource file path
        var resourcePath = config.buildPaths.extract.css + '/' + resource;

        // whether current resource has found target
        var findTarget = !1;

        config.processingData.concatCssKeys.forEach((key) => {
            // array
            if (typeof config.concatCssPriority[key] == 'object') {
                config.concatCssPriority[key].forEach((dir) => {
                    if (!findTarget && _.startsWith(resource, dir)) {
                        config.processingData.concatCssGroup[key].push(resourcePath);
                        findTarget = !0;
                        return !1;
                    }
                });
            }
            // string
            else {
                if (!findTarget && _.startsWith(resource, config.concatCssPriority[key])) {
                    config.processingData.concatCssGroup[key].push(resourcePath);
                    findTarget = !0;
                }
            }

            // if found, quit iteration
            if (findTarget) return !1;
        });
    });
};

module.exports = (config) => {
    // current html file path
    var currentFile = config.buildPaths.extract.html + '/' + config.moduleHtml;
    // file content
    var currentFileContent = fsExtra.readFileSync(currentFile, 'utf8');
    /**
     * all css resources
     *
     * example:
     *     [
     *         'test/index.css',
     *         'test/index/index.css'
     *     ]
     *
     * @type {Array}
     */
    var resources = pureResources(getResources(currentFileContent));

    // make processing data
    config.processingData.concatCssKeys = _.keys(config.concatCssPriority);
    config.processingData.concatCssGroup = {};
    config.processingData.concatCssKeys.forEach((key) => {
        config.processingData.concatCssGroup[key] = [];
    });

    // group resources
    groupResources(config, resources);
};