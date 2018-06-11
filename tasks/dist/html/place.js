
const fsExtra = require('fs-extra');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');
const current = require('../current');


/**
 * Place html in the correct position after webpack build.
 *
 * @param cb
 */
module.exports = cb => {
    logger.log('Start placing html files into correct place.');

    fsExtra.moveSync(
        projectConfig.buildPaths.dist.dir + '/index.html',
        projectConfig.buildPaths.dist.dir + '/html/' + current.config.module + '.html'
    );

    cb();
};
