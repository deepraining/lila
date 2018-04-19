
const _ = require('lodash');

/**
 * handle outResolveAlias
 *
 * @param config
 */
module.exports = config => {
    if (config.outResolveAlias && config.out) {
        !config.resolveAlias && (config.resolveAlias = {});

        _.forEach(config.outResolveAlias, (value, key) => {
            config.resolveAlias[key] = value;
        });
    }
};