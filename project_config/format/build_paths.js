
/**
 * Get paths.
 *
 * todo: whether can remove `addLilaPrefix`.
 *
 * @param root
 * @param dir
 * @param addLilaPrefix
 * @returns {{dir: string, js: string, less: string, html: string}}
 */
const getPaths = (root, dir, addLilaPrefix) => {

    const dirName = (addLilaPrefix ? 'lila_' : '') + dir;

    return {
        dirName: dirName,
        dir: root + '/' + dirName,
        js: root + '/' + dirName + '/js',
        css: root + '/' + dirName + '/css',
        html: root + '/' + dirName + '/html'
    }
};

/**
 * Make `buildPaths`.
 *
 * @param config
 */
module.exports = config => {
    config.buildPaths = {
        // Source.
        src: getPaths(config.basePaths.buildRoot, 'src', !1),
        // Development.
        dev: getPaths(config.basePaths.buildRoot, 'dev', !1),
        // Distribution.
        dist: getPaths(config.basePaths.buildRoot, 'dist', !1),
        // Temporary.
        // todo: whether this directory can place in `.lila` of root.
        tmp: getPaths(config.basePaths.buildRoot, 'tmp', !0),
        // Temporary directory to store distribution files.
        // todo: whether this directory can place in `.lila` of root.
        store: getPaths(config.basePaths.buildRoot, 'store', !0)
    };
};
