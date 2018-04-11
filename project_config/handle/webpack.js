
'use strict';

var makeWebpackDevConfig = require('../util/make_webpack_dev_config');
var makeWebpackBuildConfig = require('../util/make_webpack_build_config');
var makeWebpackAnalyzeConfig = require('../util/make_webpack_analyze_config');

module.exports = (config) => {
    // if is multi modules, no more handling
    if (config.multiModules) return;

    config.webpackDevConfig = makeWebpackDevConfig(config);
    config.webpackBuildConfig = makeWebpackBuildConfig(config);
    config.webpackAnalyzeConfig = makeWebpackAnalyzeConfig(config);
};
