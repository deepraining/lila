
var _ = require('lodash');

var vars = require('../../../data/vars');

var resolve;

module.exports = (config) => {
    if (resolve) return resolve;

    resolve = {
        modules: [config.buildPaths.src.dir, vars.projectRoot + '/node_modules', "node_modules"]
    };

    config.resolveAlias && (resolve.alias = _.cloneDeep(config.resolveAlias));

    return resolve;
};
