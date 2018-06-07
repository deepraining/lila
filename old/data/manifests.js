
const makeManifest = require('../util/make_manifest');
const projectConfig = require('../project_config');
const manifests = {
    base: makeManifest('base', projectConfig.env)
};

// directoriesToSync keys
projectConfig.processing.syncDirKeys &&
projectConfig.processing.syncDirKeys.length &&
projectConfig.processing.syncDirKeys.forEach((key) => {
    manifests[key] = makeManifest(key, projectConfig.env)
});

module.exports = manifests;
