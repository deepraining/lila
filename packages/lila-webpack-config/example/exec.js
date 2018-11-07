/**
 * Execute a command, just like in command line.
 *
 * @param cmd
 */
module.exports = cmd => {
  const cmdArray = cmd.split(/\s+/);

  // Remove `sclean`(the first element).
  cmdArray.shift();

  cmdArray.forEach(item => {
    if (item) process.argv.push(item);
  });

  require('../../lila-cli/lib'); // eslint-disable-line
};
