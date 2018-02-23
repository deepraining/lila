/**
 * @author senntyou <jiangjinbelief@163.com>
 */

var fs = require('fs');

/**
 * get js entry path
 *
 * if current module is `test/inner`
 *     find `src/test/inner/index.js`
 *
 * @param config
 */
module.exports = (config) => {

    return config.buildPaths.src.dir + '/' + config.module + '/index.js';
};