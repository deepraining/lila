
const chalk = require('chalk');

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
    log: str => {
        console.log(str);
    },
    info: str => {
        console.info(chalk.blue(str));
    },
    warn: str => {
        console.warn(chalk.yellow(str));
    },
    error: str => {
        console.error(chalk.red(str));
    },
    success: str => {
        console.log(chalk.green(str));
    }
};
