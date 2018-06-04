
"use strict";

var chalk = require('chalk');

var prefix = '| ';

/**
 *
 * @param str
 * @param pre Pre next line
 * @param post Post next line
 * @returns {string}
 */
var getString = (str, pre, post) => {
    return (pre ? '\n' : '') + prefix + str + (post ? '\n' : '');
};

module.exports = {
    log: (str, pre, post) => {
        console.log(getString(str, pre, post));
    },
    info: (str, pre, post) => {
        console.info(chalk.blue(getString(str, pre, post)));
    },
    warn: (str, pre, post) => {
        console.warn(chalk.yellow(getString(str, pre, post)));
    },
    error: (str, pre, post) => {
        console.error(chalk.red(getString(str, pre, post)));
    },
    success: (str, pre, post) => {
        console.log(chalk.green(getString(str, pre, post)));
    }
};
