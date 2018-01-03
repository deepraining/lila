/**
 * @author senntyou <jiangjinbelief@163.com>
 */

var fs = require('fs');

/**
 * get js entry path
 *
 * if current module is `test/inner`
 * 1. find `src/js/test/inner.js`
 * 2. find `src/js/test/inner/index.js`
 *
 * @param config
 */
module.exports = (config) => {
    var jsEntryPath = config.buildPaths.src.js + '/' + config.module + '.js';
    var extraJsEntryPath = config.buildPaths.src.js + '/' + config.module + '/index.js';

    if (fs.existsSync(jsEntryPath)) return jsEntryPath;
    else if (fs.existsSync(extraJsEntryPath)) return extraJsEntryPath;
    else return jsEntryPath;
};