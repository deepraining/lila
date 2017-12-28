
"use strict";

/**
 * execute a command, just like in command line
 *
 * @param cmd
 */
module.exports = (cmd) => {
    var cmdArray = cmd.split(' ');

    // remove `lilacs` in the first place
    cmdArray.shift();

    cmdArray.forEach(function (item) {
        item && process.argv.push(item);
    });

    require('../');
};