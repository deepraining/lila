
var vars = require('../../data/vars');

/**
 * get paths
 * @param root
 * @param dir
 * @param addLilaPrefix
 * @returns {{dir: string, js: string, less: string, html: string}}
 */
var getPaths = (root, dir, addLilaPrefix) => {

    var dirName = (addLilaPrefix ? 'lila_' : '') + dir;

    return {
        dirName: dirName,
        dir: root + '/' + dirName,
        js: root + '/' + dirName + '/js',
        css: root + '/' + dirName + '/css',
        html: root + '/' + dirName + '/html'
    }
};

module.exports = (config) => {

    config.buildPaths = {
        src: getPaths(config.basePaths.buildRoot, 'src', !1),
        dev: getPaths(config.basePaths.buildRoot, 'dev', !1),
        dist: getPaths(config.basePaths.buildRoot, 'dist', !1),
        // temporary directory
        tmp: getPaths(config.basePaths.buildRoot, 'tmp', !0),
        // dist temporary directory to store files
        store: getPaths(config.basePaths.buildRoot, 'store', !0)
    };
};
