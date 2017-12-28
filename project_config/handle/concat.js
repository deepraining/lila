
"use strict";

module.exports = (config) => {
    // if there is need to merge js
    config.needConcatJs = config.concatJs && (!config.useRequireJs || config.requireJsToTagLoad);

    // if there is need to merge css
    config.needConcatCss = config.concatCss && (!config.useInCss || config.inCssToTagLoad);
};