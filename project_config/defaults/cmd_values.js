var _ = require('lodash');
var vars = require('../../data/vars');

module.exports = (config) => {
    // iterate argv
    _.forEach(vars.argv, (value, key) => {
        // get real key, some key has alias
        var realKey = config.cmdAlias[key] ? config.cmdAlias[key] : key;

        // -e test, --env prod
        if (realKey == 'env' && config.envAlias && typeof config.envAlias[value] != 'undefined')
            config[realKey] = config.envAlias[value];
        // `--module all` means `--module *`
        else if (realKey === 'module' && value === 'all')
            config[realKey] = '*';
        else
        // normal occasion
            config[realKey] = value;
    })
};