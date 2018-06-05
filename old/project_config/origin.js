
var fs = require('fs');

var vars = require('../data/vars');
var configPath = vars.projectRoot + '/' + vars.configFile;
var config = fs.existsSync(configPath) ? require(configPath) : {};

module.exports = config;
