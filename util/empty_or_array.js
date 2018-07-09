const logger = require('./logger');

/**
 * Check a value is empty or is an array.
 *
 * @param value
 * @param message
 */
module.exports = (value, message) => {
  if (value && !Array.isArray(value)) {
    logger.error(message);

    process.exit(1);
  }
};
