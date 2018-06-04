
// env alias defaults
var defaults = {
    test: 0,
    production: 1,
    prod: 1
};

var _ = require('lodash');

module.exports = (config) => {
    config.envAlias = !config.envAlias ? _.cloneDeep(defaults) : _.defaults(config.envAlias, _.cloneDeep(defaults));
};