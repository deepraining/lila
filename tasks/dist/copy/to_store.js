
const fs = require('fs');
const fsExtra = require('fs-extra');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');


/**
 * Copy `tmp` to `store`.
 * @param cb
 */
module.exports = function copyToStore(cb) {
    logger.log('Backing up production files.', {prefix: !0, preLn: !0, postLn: !0});

    if (fs.existsSync(projectConfig.buildPaths.tmp.dir))
        fsExtra.copySync(projectConfig.buildPaths.tmp.dir, projectConfig.buildPaths.store.dir);

    cb();
};
