
"use strict";

var _ = require('lodash');

module.exports = (obj, value) => {
    var returnKey;
    _.forEach(obj, (value2, key) => {
        if (value2 == value)
            returnKey = key;
    });
    return returnKey;
};
