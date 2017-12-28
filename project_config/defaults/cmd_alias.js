
// cmdAlias defaults
var defaults = {
    e: "env" // environment
};

var _ = require('lodash');

module.exports = (config) => {
    config.cmdAlias = !config.cmdAlias ? _.cloneDeep(defaults) : _.defaults(config.cmdAlias, _.cloneDeep(defaults));
};