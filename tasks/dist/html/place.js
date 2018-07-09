const fsExtra = require('fs-extra');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');
const current = require('../current');

/**
 * Place html in the correct position after webpack build.
 *
 * @param cb
 */
module.exports = function placeHtml(cb) {
  logger.log('Placing html files into correct place.', {
    prefix: !0,
    preLn: !0,
    postLn: !0,
  });

  fsExtra.moveSync(
    `${projectConfig.buildPaths.build.dir  }/index.html`,
    `${projectConfig.buildPaths.build.dir  }/html/${  current.config.module  }.html`
  );

  cb();
};
