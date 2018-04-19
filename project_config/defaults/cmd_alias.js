
// cmdAlias defaults
var defaults = {
    e: 'env', // environment
    l: 'local', // local value
    o: 'out' // whether use out resolve alias
};

var _ = require('lodash');

module.exports = (config) => {
    config.cmdAlias = !config.cmdAlias ? _.cloneDeep(defaults) : _.defaults(config.cmdAlias, _.cloneDeep(defaults));
};