
"use strict";

/**
 * get concatenate file name
 *
 * example: (index, lib) -> index_lib
 *
 * @param moduleName
 * @param key
 * @returns {string}
 */
module.exports = (moduleName, key) => {
    /**
     * key: '_', means concat all files into the same file name of moduleName
     */
    return key == '_' ? moduleName : moduleName + '_' + key;
};
