
const fsExtra = require('fs-extra');

const projectConfig = require('../../../project_config');
const current = require('../current');


/**
 * Place html in the correct position after webpack build.
 *
 * @param cb
 */
module.exports = cb => {
    fsExtra.moveSync(
        projectConfig.buildPaths.dist.dir + '/index.html',
        projectConfig.buildPaths.dist.dir + '/html/' + current.config.module + '.html'
    );

    cb();
};
