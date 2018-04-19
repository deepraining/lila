
const _ = require('lodash');

let resolve;

module.exports = (config) => {
    if (resolve) return resolve;

    resolve = {
        modules: _.cloneDeep(config.resolveModules)
    };

    config.resolveAlias && (resolve.alias = _.cloneDeep(config.resolveAlias));

    return resolve;
};
