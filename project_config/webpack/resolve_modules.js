
const path = require('path');

const vars = require('../../data/vars');

/**
 * handle resolveModules
 *
 * @param config
 */
module.exports = config => {
    let resolveModules = config.resolveModules || [];
    let realResolveModules = [];

    // string, single dir
    !Array.isArray(resolveModules) && (resolveModules = [resolveModules]);

    resolveModules.forEach(dirPath => {
        realResolveModules.push(path.join(vars.projectRoot, dirPath));
    });

    // config.buildPaths.src.dir
    realResolveModules.unshift(config.buildPaths.src.dir);

    // vars.projectRoot + '/node_modules'
    realResolveModules.push(vars.projectRoot + '/node_modules');

    // 'node_modules'
    realResolveModules.push('node_modules');

    config.resolveModules = realResolveModules;
};