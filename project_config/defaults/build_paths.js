
"use strict";

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
        // copy dev directory
        copiedDev: getPaths(config.basePaths.buildRoot, 'copied_dev', !0),
        // extracted directory
        extract: getPaths(config.basePaths.buildRoot, 'extract', !0),
        // dist temporary directory
        distTmp: getPaths(config.basePaths.buildRoot, 'dist_tmp', !0),
        // dist temporary directory to handle html
        distHandleHtml: getPaths(config.basePaths.buildRoot, 'dist_handle_html', !0),
        // dist temporary directory to store files
        distStore: getPaths(config.basePaths.buildRoot, 'dist_store', !0),
        // resources of building, like images, fonts
        resources: {
            buildDir: config.basePaths.buildRoot + '/lila_build_resources',
            targetDir: config.basePaths.buildRoot + '/dist/resources'
        }
    };
};