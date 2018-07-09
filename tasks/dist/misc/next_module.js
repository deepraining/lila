// const logger = require('../../../util/logger');

const next = require('../util/next');

/**
 * Next module.
 *
 * @param cb
 */
module.exports = function nextModule(cb) {
  // logger.log('Changing to next module.', {prefix: !0, preLn: !0, postLn: !0});

  next(!0);
  cb();
};
