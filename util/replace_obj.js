
var _ = require('lodash');

/**
 * replace obj with newObj
 *
 * @param obj
 * @param newObj
 */
module.exports = (obj, newObj) => {

    _.forEach(obj, (value, key) => {
        typeof newObj[key] == 'undefined' && (delete obj[key]);
    });

    _.forEach(newObj, (value, key) => {
        obj[key] = newObj[key];
    });
};