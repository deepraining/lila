
const next = require('../util/next');

/**
 * Next module.
 *
 * @param cb
 */
module.exports = cb => {
    next(!0);
    cb();
};

