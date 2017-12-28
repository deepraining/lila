
var wrapWithSlash = require('./wrap_with_slash');

/**
 * get all require-js modules
 *
 * @param modules
 * @param options Require-js config
 * @param config Project config
 * @returns {*}
 */
module.exports = (modules, options, config) => {

    var paths = [],
        baseUrl = config.basePaths.webRoot +
            (options.baseUrl.slice(-1) == '/' ? options.baseUrl : options.baseUrl + '/').replace(
                wrapWithSlash(config.buildPaths.dev.dirName), wrapWithSlash(config.buildPaths.copiedDev.dirName)
            );

    var configPaths = config.requireJsConfig.paths || {};

    modules.forEach(function (path) {
        var realPath = path;

        /**
         * {
         *     'jquery-ui': 'lib/jquery-ui'
         * }
         *
         * require(['jquery-ui/jquery-ui']);
         */
        if (path.indexOf('/') > -1) {
            var pathArray = path.split('/'),
                pathParent = pathArray.shift();

            if (configPaths[pathParent]) {
                realPath = configPaths[pathParent] + '/' + pathArray.join('/');
            }
        }
        paths.push(baseUrl + realPath + '.js');
    });

    return paths;
};