
const logger = require('../../../util/logger');

const next = require('../util/next');

/**
 * Next module.
 *
 * @param cb
 */
module.exports = cb => {
    logger.log('Start changing next module.');

    next(!0);
    cb();
};

