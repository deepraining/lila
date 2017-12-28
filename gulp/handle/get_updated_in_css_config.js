
'use strict';

var _ = require('lodash');

var fileHashMap = require('../../util/file_hash_map');
var findKey = require('../../util/find_key');

module.exports = (config) => {

    // get file-hash map
    var hashMap = fileHashMap(config.buildPaths.extractCss.css, void 0, config.revisionHashLength);

    // get InCss config
    var inCssConfig = _.cloneDeep(config.inCssConfig);

    // InCss config paths attribute
    var inCssConfigPaths = inCssConfig.paths;
    var pathsValues = _.values(inCssConfigPaths);

    // regenerate baseUrl
    inCssConfig.baseUrl = (config.currentNetworkOption.staticDomain || '') + inCssConfig.baseUrl.replace(/\/dev\/css/g, '/dist/css' );

    _.forEach(hashMap, (value, key) => {
        // bootstrap: lib/bootstrap/bootstrap (value = lib/bootstrap/bootstrap)
        if (_.indexOf(pathsValues, key) >= 0) {
            inCssConfigPaths[findKey(inCssConfigPaths, key)] += ('.' + value);
        }
        else {
            inCssConfigPaths[key] = key + '.' + value;
        }
    });

    return inCssConfig;
};
