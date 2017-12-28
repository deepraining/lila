
'use strict';

var _ = require('lodash');

var fileHashMap = require('../../util/file_hash_map');
var findKey = require('../../util/find_key');

module.exports = (config) => {

    // get file-hash map
    var hashMap = fileHashMap(config.buildPaths.extractJs.js, void 0, config.revisionHashLength);

    // get requireJs config
    var requireJsConfig = _.cloneDeep(config.requireJsConfig);

    // require-js config paths attribute
    var requireJsConfigPaths = requireJsConfig.paths;
    var pathsValues = _.values(requireJsConfigPaths);

    // regenerate baseUrl
    requireJsConfig.baseUrl = (config.currentNetworkOption.staticDomain || '') + requireJsConfig.baseUrl.replace(/\/dev\/js/g, '/dist/js' );

    _.forEach(hashMap, (value, key) => {
        // jquery: lib/jquery/jquery (value = lib/jquery/jquery)
        if (_.indexOf(pathsValues, key) >= 0) {
            requireJsConfigPaths[findKey(requireJsConfigPaths, key)] += ('.' + value);
        }
        else {
            requireJsConfigPaths[key] = key + '.' + value;
        }
    });

    return requireJsConfig;
};
