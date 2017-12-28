
"use strict";

var _ = require('lodash');

module.exports = (config) => {

    /**
     * processing data bind to config
     * @type {{}}
     */
    config.processingData = {};

    // network option of current environment
    config.currentNetworkOption = config.networkOptions && config.networkOptions[config.env]  || {};

    // files map of current environment
    config.currentFilesMap = config.filesMap && config.filesMap[config.env];

    // directories map of current environment
    config.currentDirsMap = config.dirsMap && config.dirsMap[config.env];

    /**
     * files be mapped, used to extract html except it
     *
     * @type {Array}
     */
    config.processingData.mappedFiles = [];
    config.filesMap && config.filesMap.forEach((oneMap) => {
        config.processingData.mappedFiles = _.concat(config.processingData.mappedFiles, _.values(oneMap));
    });
};