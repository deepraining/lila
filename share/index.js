/**
 * Global shared data.
 *
 * @type {{hashDigestLength: number}}
 */
module.exports = {
  /**
   * hashDigestLength of output
   *
   * @see https://webpack.js.org/configuration/output/#output-hashdigestlength
   */
  hashDigestLength: 32,
  /**
   * Original `process.argv`, it will modified for gulp cli.
   */
  originalProcessArgv: process.argv,
};
