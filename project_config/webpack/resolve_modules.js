const path = require('path');

const pathInfo = require('../../data/path_info');

/**
 * Handle `resolveModules`.
 *
 * Sequences to resolve modules:
 *   1. `src` in project
 *   2. `node_modules` in project root
 *   3. `resolveModules` defined in `lila.config.js`
 *   4. `node_modules` of webpack's default.
 *
 * @param config
 */
module.exports = config => {
  let resolveModules = config.resolveModules || [];
  let realResolveModules = [];

  // String, a single dir.
  !Array.isArray(resolveModules) && (resolveModules = [resolveModules]);

  resolveModules.forEach(dirPath => {
    realResolveModules.push(path.join(pathInfo.projectRoot, dirPath));
  });

  // pathInfo.projectRoot + '/node_modules'
  realResolveModules.unshift(pathInfo.projectRoot + '/node_modules');

  // config.buildPaths.src.dir
  realResolveModules.unshift(config.buildPaths.src.dir);

  // 'node_modules'
  realResolveModules.push('node_modules');

  config.resolveModules = realResolveModules;
};
