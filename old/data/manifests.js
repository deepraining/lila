
const makeManifest = require('../util/make_manifest');
const projectConfig = require('../project_config');
const manifests = {
    base: makeManifest('base', projectConfig.env)
};

// directoriesToSync keys
projectConfig.processing.directoriesToSyncKeys &&
projectConfig.processing.directoriesToSyncKeys.length &&
projectConfig.processing.directoriesToSyncKeys.forEach((key) => {
    manifests[key] = makeManifest(key, projectConfig.env)
});

module.exports = manifests;
