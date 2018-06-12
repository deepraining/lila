
const fs = require('fs');
const fsExtra = require('fs-extra');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');


/**
 * Copy `store` to `dist`.
 * @param cb
 */
module.exports = function copyToDist(cb) {
    logger.log('Moving production files to \'dist\'.', {prefix: !0, preLn: !0, postLn: !0});

    if (fs.existsSync(projectConfig.buildPaths.store.dir))
        fsExtra.copySync(projectConfig.buildPaths.store.dir, projectConfig.buildPaths.dist.dir);

    cb();
};
