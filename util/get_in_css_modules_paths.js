
var wrapWithSlash = require('./wrap_with_slash');

/**
 * get all in-css modules
 *
 * @param modules
 * @param options In-css config
 * @param config Project config
 * @returns {*}
 */
module.exports = (modules, options, config) => {

    var paths = [],
        baseUrl = config.basePaths.webRoot +
            (options.baseUrl.slice(-1) == '/' ? options.baseUrl : options.baseUrl + '/').replace(
                wrapWithSlash(config.buildPaths.dev.dirName), wrapWithSlash(config.buildPaths.copiedDev.dirName)
            );

    modules.forEach(function (path) {
        paths.push(baseUrl + path + '.css')
    });

    return paths;
};