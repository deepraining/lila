const projectConfig = require('../../../project_config');

/**
 * Next `directoriesToSync` index.
 */
module.exports = () => {
  if (!projectConfig.processing.syncDirKeys || !projectConfig.processing.syncDirKeys.length) return;

  if (typeof projectConfig.processing.syncDirIndex === 'undefined') projectConfig.processing.syncDirIndex = 0;

  projectConfig.processing.syncDirKey = projectConfig.processing.syncDirKeys[projectConfig.processing.syncDirIndex];

  projectConfig.processing.syncDirIndex += 1;

  if (projectConfig.processing.syncDirIndex >= projectConfig.processing.syncDirKeys.length)
    projectConfig.processing.syncDirIndex = 0;
};
