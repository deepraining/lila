
const fs = require('fs');
const fsExtra = require('fs-extra');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');


/**
 * Copy `store` to `dist`.
 * @param cb
 */
module.exports = cb => {
    logger.log('Start moving production files to \'dist\'.');

    if (fs.existsSync(projectConfig.buildPaths.store.dir))
        fsExtra.copySync(projectConfig.buildPaths.store.dir, projectConfig.buildPaths.dist.dir);

    cb();
};
