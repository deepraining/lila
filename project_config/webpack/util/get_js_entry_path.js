/**
 * Get js entry path.
 *
 * @example
 *
 * If current module is `test/inner`, the result is `/path/to/src/test/inner/index.js`.
 *
 * @param config
 */
module.exports = config => {
  return `${config.buildPaths.src.dir}/${config.module}/index.js`;
};
