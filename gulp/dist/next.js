
var distData = require('./data');

module.exports = {
    extraJsEntryModule: () => {
        if (distData.currentConfig.hasExtraJsEntryModules) {
            typeof distData.currentConfig.processingData.extraJsEntryModuleIndex == 'undefined' && (
                distData.currentConfig.processingData.extraJsEntryModuleIndex = 0
            );

            distData.currentConfig.processingData.extraJsEntryModule =
                distData.currentConfig.extraJsEntryModules[distData.currentConfig.processingData.extraJsEntryModuleIndex];

            distData.currentConfig.processingData.extraJsEntryModuleIndex += 1;

            // reset to 0 if needed
            distData.currentConfig.processingData.extraJsEntryModuleIndex >= distData.currentConfig.extraJsEntryModules.length && (
                distData.currentConfig.processingData.extraJsEntryModuleIndex = 0
            );
        }
    },

    concatJs: () =>  {
        if (distData.currentConfig.needConcatJs) {
            typeof distData.currentConfig.processingData.concatJsIndex == 'undefined' && (
                distData.currentConfig.processingData.concatJsIndex = 0
            );

            distData.currentConfig.processingData.concatJsKey =
                distData.currentConfig.processingData.concatJsKeys[distData.currentConfig.processingData.concatJsIndex];

            distData.currentConfig.processingData.concatJsIndex += 1;

            // reset to 0 if needed
            distData.currentConfig.processingData.concatJsIndex >= distData.currentConfig.processingData.concatJsKeys.length && (
                distData.currentConfig.processingData.concatJsIndex = 0
            );
        }
    },

    concatCss: () =>  {
        if (distData.currentConfig.needConcatCss) {
            typeof distData.currentConfig.processingData.concatCssIndex == 'undefined' && (
                distData.currentConfig.processingData.concatCssIndex = 0
            );

            distData.currentConfig.processingData.concatCssKey =
                distData.currentConfig.processingData.concatCssKeys[distData.currentConfig.processingData.concatCssIndex];

            distData.currentConfig.processingData.concatCssIndex += 1;

            // reset to 0 if needed
            distData.currentConfig.processingData.concatCssIndex >= distData.currentConfig.processingData.concatCssKeys.length && (
                distData.currentConfig.processingData.concatCssIndex = 0
            );
        }
    },

    // used for importing files in css file by mark @import
    inCssModule: () => {
        if (distData.currentConfig.useInCss) {
            typeof distData.currentConfig.processingData.inCssModuleIndex == 'undefined' && (
                distData.currentConfig.processingData.inCssModuleIndex = 0
            );

            distData.currentConfig.processingData.inCssModule =
                distData.currentConfig.inCssAllModules[distData.currentConfig.processingData.inCssModuleIndex];

            distData.currentConfig.processingData.inCssModuleIndex += 1;

            // reset to 0 if needed
            distData.currentConfig.processingData.inCssModuleIndex >= distData.currentConfig.inCssAllModules.length && (
                distData.currentConfig.processingData.inCssModuleIndex = 0
            );
        }
    }
};