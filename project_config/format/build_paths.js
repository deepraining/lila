const pathInfo = require('../../data/path_info');

/**
 * Get paths.
 *
 * @param root
 * @param dir
 * @returns {{dir: string, js: string, less: string, html: string}}
 */
const getPaths = (root, dir) => {
  return {
    dirName: dir,
    dir: `${root  }/${  dir}`,
    js: `${root  }/${  dir  }/js`,
    css: `${root  }/${  dir  }/css`,
    html: `${root  }/${  dir  }/html`,
  };
};

/**
 * Make `buildPaths`.
 *
 * @param config
 */
module.exports = config => {
  config.buildPaths = {
    // Source.
    src: getPaths(config.basePaths.buildRoot, 'src'),
    // Development.
    dev: getPaths(config.basePaths.buildRoot, 'dev'),
    // Distribution.
    dist: getPaths(config.basePaths.buildRoot, 'dist'),
    // Build.
    build: getPaths(pathInfo.lilaWorkspace, 'build'),
    // Build tmp.
    buildTmp: getPaths(pathInfo.lilaWorkspace, 'build_tmp'),
    // Build store.
    buildStore: getPaths(pathInfo.lilaWorkspace, 'build_store'),
  };
};
