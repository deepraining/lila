const fs = require('fs');
const fse = require('fs-extra');

const logger = require('../../../util/logger');

const pathInfo = require('../../../data/path_info');
const filesCount = require('../../../util/files_count');

/**
 * Copy last building generated manifests directory.
 *
 * @param cb
 */
module.exports = function copyManifests(cb) {
  logger.log("Backing up 'manifests' directory.", {
    prefix: !0,
    preLn: !0,
    postLn: !0,
  });

  /**
   * No `.keep` file in `manifests` directory, saying it's the first time to build.
   */
  if (!fs.existsSync(pathInfo.manifestsDirKeepFile)) {
    // Create `manifests` directory.
    fse.ensureFileSync(pathInfo.manifestsDirKeepFile);
    // Create `manifests_bak` directory.
    fse.ensureFileSync(pathInfo.manifestsBakDirKeepFile);
  } else if (filesCount(pathInfo.manifestsDir) > 1) {
    /**
     * Has `manifests` directory, and also has other files despite of `.keep` file under `manifests` directory,
     * that is to say project has ever been built.
     *
     * (If only exist `.keep` file, saying that files changed record is either disabled, or just no record.)
     */
    /**
     * Has `manifests_bak` directory, saying that last building encountered an error, and program exit improperly.
     * (If only exist `.keep` file, saying that last building is the first time, otherwise N times.)
     */
    if (fs.existsSync(pathInfo.manifestsBakDirKeepFile)) {
      fse.removeSync(pathInfo.manifestsDir);
      fse.copySync(pathInfo.manifestsBakDir, pathInfo.manifestsDir);
    } else {
      /**
       * Normal state, copy `manifests` to `manifests_bak`.
       */
      fse.copySync(pathInfo.manifestsDir, pathInfo.manifestsBakDir);
    }
  }

  cb();
};
