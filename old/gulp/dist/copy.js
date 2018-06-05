
var fs = require('fs');
var fsExtra = require('fs-extra');

var projectConfig = require('../../project_config');
var vars = require('../../data/vars');
var filesCount = require('../../util/files_count');

module.exports = {
    // copy tmp to store
    copyToStore: (cb) =>  {
        fs.existsSync(projectConfig.buildPaths.tmp.dir) &&
        fsExtra.copySync(projectConfig.buildPaths.tmp.dir, projectConfig.buildPaths.store.dir);

        cb();
    },
    // copy store to dist
    copyToDist: (cb) =>  {
        fs.existsSync(projectConfig.buildPaths.store.dir) &&
        fsExtra.copySync(projectConfig.buildPaths.store.dir, projectConfig.buildPaths.dist.dir);

        cb();
    },
    // copy last building generated manifests
    copyManifests: (cb) =>  {
        /**
         * no .keep file in manifests directory,
         * saying it's the first time to build
         */
        if (!fs.existsSync(vars.manifestsDirKeepFile)) {
            // create manifests directory
            fsExtra.ensureFileSync(vars.manifestsDirKeepFile);
            // create manifests_bak directory
            fsExtra.ensureFileSync(vars.manifestsBakDirKeepFile);
        }
        /**
         * has manifests directory, and has other files despite .keep file under manifests directory,
         * that is to say project has ever built.
         * (if only exist .keep file, saying that files changing record is't just not enabled, or just no record )
         */
        else if (filesCount(vars.manifestsDir) > 1) {
            /**
             * has manifests_bak directory, saying that last building encountered an error, and program exit improperly.
             * (if only exist .keep file, saying that last building is the first time, otherwise is N times.)
             */
            if (fs.existsSync(vars.manifestsBakDirKeepFile)) {
                fsExtra.removeSync(vars.manifestsDir);
                fsExtra.copySync(vars.manifestsBakDir, vars.manifestsDir);
            }
            // normal state
            else {
                fsExtra.copySync(vars.manifestsDir, vars.manifestsBakDir);
            }
        }

        cb();
    }
};
