/**
 * Execute a command, just like in command line.
 *
 * @param cmd
 */
module.exports = cmd => {
  const cmdArray = cmd.split(/\s+/);

  // Remove `lila`(the first element).
  cmdArray.shift();

  const argv = [process.argv[0], process.argv[1]];

  cmdArray.forEach(item => {
    if (item) argv.push(item);
  });

  process.argv = argv;

  require('../packages/lila-cli/lib'); // eslint-disable-line
};
