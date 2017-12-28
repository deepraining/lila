
"use strict";

var wrapWithSlash = require('../../util/wrap_with_slash');

module.exports = (config) => {

    /**
     * because all building is in buildPaths.copiedDev directory, so must ensure requireJs and InCss config path
     */
    config.requireJsConfigPath && (config.requireJsConfigPath = config.requireJsConfigPath.replace(
        wrapWithSlash(config.buildPaths.dev.dirName),
        wrapWithSlash(config.buildPaths.copiedDev.dirName)
    ));
    config.inCssConfigPath && (config.inCssConfigPath = config.inCssConfigPath.replace(
        wrapWithSlash(config.buildPaths.dev.dirName),
        wrapWithSlash(config.buildPaths.copiedDev.dirName)
    ));
};