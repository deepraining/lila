const chalk = require('chalk');
const repeat = require('lodash/repeat');

/**
 * 11 spaces.
 *
 * @type {string}
 */
const prefixSpaces = repeat(' ', 11);

/**
 * Get string to display.
 *
 * @param str
 * @param options
 * @returns {*}
 */
const getStr = (str, options) => {
  // prefix.
  options.prefix && (str = prefixSpaces + str);

  // Prepend ln.
  options.preLn && (str = `\n${str}`);

  // Append ln.
  options.postLn && (str += '\n');

  return str;
};

/**
 * global logger
 *
 * @type {{
 *   log: function(*=),
 *   info: function(*=),
 *   warn: function(*=),
 *   error: function(*=),
 *   success: function(*=)}
 * }
 */
module.exports = {
  /**
   * Log.
   *
   * @param str
   * @param options Whether add prefix.
   */
  log: (str, options = {}) => {
    console.log(getStr(str, options));
  },
  /**
   * Info.
   *
   * @param str
   * @param options Whether add prefix.
   */
  info: (str, options = {}) => {
    console.info(chalk.blue(getStr(str, options)));
  },
  /**
   * Warn.
   *
   * @param str
   * @param options Whether add prefix.
   */
  warn: (str, options = {}) => {
    console.warn(chalk.yellow(getStr(str, options)));
  },
  /**
   * Error.
   *
   * @param str
   * @param options Whether add prefix.
   */
  error: (str, options = {}) => {
    console.error(chalk.red(getStr(str, options)));
  },
  /**
   * Success.
   *
   * @param str
   * @param options Whether add prefix.
   */
  success: (str, options = {}) => {
    console.log(chalk.green(getStr(str, options)));
  },
};
