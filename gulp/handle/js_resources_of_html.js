
"use strict";

var fsExtra = require('fs-extra');
var cheerio = require('cheerio');
var _ = require('lodash');

var selector = require('../../data/selector');

/**
 * extract all js files from html content
 *
 * @param content
 * @returns {Array}
 */
var getResources = (content) => {
    var $ = cheerio.load(content, {decodeEntities: !1});
    // all js scripts
    var $scripts = $(selector.validJs);
    var files = [];

    $scripts.map((index) => {
        files.push($($scripts[index]).attr('src'));
    });

    return files;
};

/**
 * get purified resources
 *
 * example:
 *     ['../../../js/test/index.js']
 *     ->
 *     ['test/index.js']
 *
 * @param resources
 * @returns {Array}
 */
var pureResources = (resources) => {
    var newResources = [];
    resources.forEach((resource) => {
        /**
         * 1. remove all dot and slash
         * 2. remove /js
         *
         * example:
         *     ../../../js/test/index.js
         *     ->
         *     test/index.js
         */
        newResources.push(_.trimStart(resource, './').slice(3));
    });
    return newResources;
};

/**
 * group all resources by concatJsPriority
 *
 * @param config
 * @param resources
 */
var groupResources = (config, resources) => {
    resources.forEach((resource) => {
        // resource file path
        var resourcePath = config.buildPaths.extract.js + '/' + resource;

        // whether current resource has found target
        var findTarget = !1;

        config.processingData.concatJsKeys.forEach((key) => {
            // array
            if (typeof config.concatJsPriority[key] == 'object') {
                config.concatJsPriority[key].forEach((dir) => {
                    if (!findTarget && _.startsWith(resource, dir)) {
                        config.processingData.concatJsGroup[key].push(resourcePath);
                        findTarget = !0;
                        return !1;
                    }
                });
            }
            // string
            else {
                if (!findTarget && _.startsWith(resource, config.concatJsPriority[key])) {
                    config.processingData.concatJsGroup[key].push(resourcePath);
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
     * all js resources
     *
     * example:
     *     [
     *         'test/index.js',
     *         'test/index/index.js'
     *     ]
     *
     * @type {Array}
     */
    var resources = pureResources(getResources(currentFileContent));

    // make processing data
    config.processingData.concatJsKeys = _.keys(config.concatJsPriority);
    config.processingData.concatJsGroup = {};
    config.processingData.concatJsKeys.forEach((key) => {
        config.processingData.concatJsGroup[key] = [];
    });

    // group resources
    groupResources(config, resources);
};