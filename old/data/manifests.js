
var makeManifest = require('../util/make_manifest');
var projectConfig = require('../project_config');
var manifests = {
    base: makeManifest('base', projectConfig.env)
};

// directoriesToSync keys
projectConfig.processingData.directoriesToSyncKeys &&
projectConfig.processingData.directoriesToSyncKeys.length &&
projectConfig.processingData.directoriesToSyncKeys.forEach((key) => {
    manifests[key] = makeManifest(key, projectConfig.env)
});

module.exports = manifests;