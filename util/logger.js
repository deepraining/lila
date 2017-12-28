
"use strict";

var chalk = require('chalk');

var prefix = '| ';

module.exports = {
    log: (str) => {
        console.log(prefix + str);
    },
    info: (str) => {
        console.info(chalk.blue(prefix + str));
    },
    warn: (str) => {
        console.warn(chalk.yellow(prefix + str));
    },
    error: (str) => {
        console.error(chalk.red(prefix + str));
    },
    success: (str) => {
        console.log(chalk.green(prefix + str));
    }
};
