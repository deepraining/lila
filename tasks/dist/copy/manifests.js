
const fs = require('fs');
const fsExtra = require('fs-extra');

const logger = require('../../../util/logger');

const pathInfo = require('../../../data/path_info');
const filesCount = require('../../../util/files_count');

/**
 * Copy last building generated manifests directory.
 *
 * @param cb
 */
module.exports = cb => {
    logger.log('Start backing up manifests.');

    /**
     * No `.keep` file in `manifests` directory, saying it's the first time to build.
     */
    if (!fs.existsSync(pathInfo.manifestsDirKeepFile)) {
        // Create `manifests` directory.
        fsExtra.ensureFileSync(pathInfo.manifestsDirKeepFile);
        // Create `manifests_bak` directory.
        fsExtra.ensureFileSync(pathInfo.manifestsBakDirKeepFile);
    }
    /**
     * Has `manifests` directory, and also has other files despite of `.keep` file under `manifests` directory,
     * that is to say project has ever been built.
     *
     * (If only exist `.keep` file, saying that files changed record is either disabled, or just no record.)
     */
    else if (filesCount(pathInfo.manifestsDir) > 1) {
        /**
         * Has `manifests_bak` directory, saying that last building encountered an error, and program exit improperly.
         * (If only exist `.keep` file, saying that last building is the first time, otherwise N times.)
         */
        if (fs.existsSync(pathInfo.manifestsBakDirKeepFile)) {
            fsExtra.removeSync(pathInfo.manifestsDir);
            fsExtra.copySync(pathInfo.manifestsBakDir, pathInfo.manifestsDir);
        }
        /**
         * Normal state, copy `manifests` to `manifests_bak`.
         */
        else {
            fsExtra.copySync(pathInfo.manifestsDir, pathInfo.manifestsBakDir);
        }
    }

    cb();
};
