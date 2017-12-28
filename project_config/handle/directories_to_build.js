
var _ = require('lodash');

module.exports = (config) => {
    // no directories
    if (!config.directoriesToBuild || !config.directoriesToBuild.length) return;

    // ensure is an array
    !Array.isArray(config.directoriesToBuild) && (config.directoriesToBuild = [config.directoriesToBuild]);

    // make it a complete absolute path
    config.processingData.directoriesToBuild = [];
    config.directoriesToBuild.forEach((dir) => {
        config.processingData.directoriesToBuild.push(config.buildPaths.dev.dir + '/' + dir + '/**/*');
    });
};