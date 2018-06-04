
var _ = require('lodash');
var handle = require('./handle');
var originConfig = require('./origin');
var mainConfig = require('./');
var vars = require('../data/vars');

var configs = [];

// has multi modules
if (mainConfig.multiModules) {
    for (var i = 0, il = mainConfig.modules.length; i < il; i++) {
        // switch next module
        vars.argv.module = mainConfig.modules[i];
        configs.push(handle(_.cloneDeep(originConfig)));
    }
}
// one module
else {
    configs.push(mainConfig);
}

module.exports = configs;

