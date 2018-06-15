
/**
 * Execute a command, just like in command line.
 *
 * @param cmd
 */
module.exports = cmd => {
    let cmdArray = cmd.split(/\s+/);

    // Remove `lila`(the first element).
    cmdArray.shift();

    cmdArray.forEach(item => {
        item && process.argv.push(item);
    });

    require('../');
};
