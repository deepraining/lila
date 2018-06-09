
const fs = require('fs');
const fsExtra = require('fs-extra');

const projectConfig = require('../../../project_config');


/**
 * Copy `store` to `dist`.
 * @param cb
 */
module.exports = cb => {
    if (fs.existsSync(projectConfig.buildPaths.store.dir))
        fsExtra.copySync(projectConfig.buildPaths.store.dir, projectConfig.buildPaths.dist.dir);

    cb();
};
